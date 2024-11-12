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
          this.questions = q
          this.sortByRisk()
        },
        error: e => console.log(e)
      }
    )
  }

  uploadPhoto(event: FileUploadEvent, questionId) {

    const file = event.files[0]

    const name = `chk_${this.checklistId}_qst_${questionId}`

    this.checklistService.uploadPhoto(new File([file], name, {type: file.type})).subscribe({
      next: r => console.log(r),
      error: e => console.log(e)
    })
  }

  onReset() {
    this.questionInputs.forEach(q => q.onReset())
  }

  onSubmit() {
    this.questionInputs.forEach(
      q => {
        if(!q.isAsked()) {
          q.invalid = true;
        }
      }
    )

    if (this.questionInputs.some(q => !q.isAsked())) {
      this.messageService.add(
      {
        severity: 'error',
        summary: 'Checklists não respondidas!',
        detail: 'Preencha todas as checklists.'
      })
      return;
    }

    let answers = this.questionInputs.map(q => q.getAnswer())
    this.checklistService.submitAnswers(answers, this.checklistId).subscribe(
      {next: (r:any) => this.router.navigate(['/' + r.driverId]),
        error: e => console.log(e)
      }
    )
  }

  private sortByRisk() {
    const riskPriority: { [key in RiskEnum]: number } = {
      [RiskEnum.L]: 1, // Risco Leve
      [RiskEnum.M]: 2, // Risco Moderado
      [RiskEnum.C]: 3, // Risco Crítico
      [RiskEnum.B]: 4, // Comportamental
      [RiskEnum.P]: 5  // Fotografia
    };

    this.questions.sort((a,b) => riskPriority[a.risk] - riskPriority[b.risk])
  }

}
