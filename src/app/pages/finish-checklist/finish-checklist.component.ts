import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionInputComponent } from '@shared/components';
import { RiskEnum } from '@shared/enums';
import { ChecklistService, QuestionService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { sortByRisk} from '@shared/utils'

@Component({
  selector: 'app-finish-checklist',
  standalone: true,
  imports: [QuestionInputComponent, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './finish-checklist.component.html',
  styleUrl: './finish-checklist.component.scss'
})
export class FinishChecklistComponent implements OnInit{

  questions = []
  checklistId

  photos: File[] = []

  @ViewChildren(QuestionInputComponent) questionInputs: QueryList<QuestionInputComponent>

  constructor(private questionService: QuestionService,
    private checklistService: ChecklistService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.checklistId = params.get('id');
      }
    )

    this.questionService.getQuestions().subscribe(
      {
        next: r => {this.questions = r.filter(
          q => q.risk !== RiskEnum.L && q.risk !== RiskEnum.B
        )
        this.questions = sortByRisk(this.questions)
      },
        error: e => console.log(e)
      }
    )
  }

  savePhotoInMemory(event: FileUploadEvent, questionId) {

    const file = event.files[0]

    const renamedFile = new File([file], `chk${this.checklistId}qst${questionId}`, { type: file.type})

    this.photos.push(renamedFile);

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
      this.checklistService.submitFinalAnswers(answers, this.checklistId).subscribe(
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
