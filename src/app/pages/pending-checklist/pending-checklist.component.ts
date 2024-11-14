import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { ItemStatusComponent, StatusDialogComponent } from '@shared/components';
import { AnswerEnum, MandatoryEnum, RiskEnum } from '@shared/enums';
import { tabsMocks } from '@shared/mocks';
import { IQuestion } from '@shared/models';
import { IQuestionStatus } from '@shared/models/question-status.model';
import { ITab } from '@shared/models/tab.model';
import { AnswerStatusPipe } from '@shared/pipes/answer-status.pipe';
import { ChecklistService, QuestionService } from '@shared/services';
import { PhotosService } from '@shared/services/photos/photos.service';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-pending-checklist',
  standalone: true,
  imports: [
    CardModule,
    AccordionModule,
    CommonModule,
    ItemStatusComponent,
    AnswerStatusPipe,
    DialogModule,
    StatusDialogComponent
  ],
  templateUrl: './pending-checklist.component.html',
  styleUrl: './pending-checklist.component.scss'
})
export class PendingChecklistComponent implements OnInit{

  checklistId = ''
  carPlate = ''

  tabs = tabsMocks

  questions: IQuestionStatus[] = []

  showDialog = false

  image: any = null

  constructor(private checklistService: ChecklistService, private questionService: QuestionService, private photosServices: PhotosService) {}

  ngOnInit() {
    const data = history.state.data;

    this.checklistId = data.checklistId
    this.carPlate = data.carPlate

    this.checklistService.getNoCompliantAnswers(data.checklistId).subscribe(
      {next: (r:any) => {
        r.forEach(
          (a:any) => {
            this.questionService.getQuestion(a.questionId).subscribe(
              {
                next: (q:IQuestion) => this.questions.push(
                  {
                    questionId: q.questionId,
                    question: q.question,
                    status: a.resolved,
                    isMandatory: q.isMandatory
                  }
                ),
                error: e => console.log(e)
              }
            )
          }
        )
      },
        error: e => console.log(e)
      }
    )
    console.log(this.questions)
  }

  getInfo(question) {
    if(question.isMandatory === MandatoryEnum.YES){
      this.photosServices.getPhotoByName(this.checklistId, question.questionId).subscribe(
        {
          next: r => {this.image = r
            this.openDialog()
          },
          error: e => console.log(e)
        }
      )
    }
  }

  openDialog() {
    this.showDialog =true
  }
}
