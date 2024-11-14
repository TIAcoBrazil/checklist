import { JsonPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionInputComponent } from '@shared/components';
import { RiskEnum } from '@shared/enums';
import { IQuestion } from '@shared/models';
import { ChecklistService, QuestionService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { sortByRisk} from '@shared/utils'

@Component({
  selector: 'app-checklist-form',
  standalone: true,
  imports: [
    QuestionInputComponent,
    ButtonModule,
    ButtonGroupModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './checklist-form.component.html',
  styleUrl: './checklist-form.component.scss'
})
export class ChecklistFormComponent implements OnInit {

  questions: IQuestion[] = [];
  checklistId: string;
  photos: File[] = []

  @ViewChildren(QuestionInputComponent) questionInputs: QueryList<QuestionInputComponent>

  constructor(
    private questionService: QuestionService,
    private checklistService: ChecklistService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.checklistId = params.get('id');
      }
    )

    this.questionService.getQuestions().subscribe(
      {
        next: q => {
          this.questions = sortByRisk(q)
        },
        error: e => console.log(e)
      }
    )
  }

  savePhotoInMemory(event: FileUploadEvent, questionId) {

    const file = event.files[0]

    const renamedFile = new File([file], `chk${this.checklistId}qst${questionId}`, { type: file.type})

    this.photos.push(renamedFile);
    console.log(renamedFile, this.photos)
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Foto carregada com sucesso!'
    })
  }

  uploadPhoto() {
    this.photos.forEach(p => {
      this.checklistService.uploadPhoto(p).subscribe({
        next: () => this.messageService.add({
          severity: 'success',
          summary: "Sucesso",
          detail:"Formulário carregado com sucesso!"
        })
      })
    })
  }

  onReset() {
    this.questionInputs.forEach(q => q.onReset())
  }

  onSubmit() {
    if(this.checkIsValid()) {
      let answers = this.questionInputs.map(q => q.getAnswer())
      this.checklistService.submitAnswers(answers, this.checklistId).subscribe(
        {next: (r:any) => {
          this.uploadPhoto()
          this.router.navigate(['/' + r.driverId])
        },
          error: e => console.log(e)
        }
      )
    }
  }

  private checkIsValid(): boolean {
    this.questionInputs.forEach(
      q => {
        if(!q.isAsked() || !q.isPhotoUploaded()) {
          q.invalid = true;
        } else {
          q.invalid = false
        }
      }
    )

    if (this.questionInputs.some(q => q.invalid)) {
      this.messageService.add(
      {
        severity: 'error',
        summary: 'Checklists não respondidas!',
        detail: 'Preencha todas as checklists.'
      })
      return false;
    }
    return true;
  }

}
