import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionInputComponent } from '@shared/components';
import { RiskEnum } from '@shared/enums';
import { ChecklistService, QuestionService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-finish-checklist',
  standalone: true,
  imports: [QuestionInputComponent, ButtonModule],
  providers: [MessageService],
  templateUrl: './finish-checklist.component.html',
  styleUrl: './finish-checklist.component.scss'
})
export class FinishChecklistComponent implements OnInit{

  questions = []
  checklistId

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
        next: r => this.questions = r.filter(
          q => q.risk !== RiskEnum.L
        ),
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
    this.checklistService.submitFinalAnswers(answers, this.checklistId).subscribe(
      {next: (r:any) => this.router.navigate(['/' + r.driverId]),
        error: e => console.log(e)
      }
    )
  }

}
