import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionInputComponent } from '@shared/components';
import { IQuestion } from '@shared/models';
import { ChecklistService, QuestionService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
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
        next: q => this.questions = q,
        error: e => console.log(e)
      }
    )
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

}
