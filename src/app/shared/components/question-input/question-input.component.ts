import { Component, input, InputSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnswerEnum, RiskEnum } from '@shared/enums';
import { RiskPipe } from '@shared/pipes';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-question-input',
  standalone: true,
  imports: [CheckboxModule, FormsModule, CardModule, TagModule, RiskPipe],
  templateUrl: './question-input.component.html',
  styleUrl: './question-input.component.scss'
})
export class QuestionInputComponent {
  compliant: boolean = false;
  noCompliant: boolean = false;
  notApplicable: boolean = false;

  id = input()
  question = input()
  risk = input<RiskEnum>()

  invalid: boolean = false;

  constructor() {
  }

  onComplianceChange(isCompliant: boolean) {
    if (isCompliant) {
      if (this.compliant) {
        this.noCompliant = false;
      }
    } else {
      if (this.noCompliant) {
        this.compliant = false;
      }
    }
  }
  onNotApplicableChange() {
    if (this.notApplicable) {
      this.compliant = false;
      this.noCompliant = false;
    }
  }

  getAnswer() {
    return {
      questionId: this.id(),
      answer: this.compliant ? AnswerEnum.COMPLIANT :
              this.noCompliant ? AnswerEnum.NO_COMPLIANT :
              this.notApplicable ? AnswerEnum.NOT_APPLICABLE :
              null
    };
  }

  onReset() {
    this.compliant = false;
    this.noCompliant = false;
    this.notApplicable = false;

    this.invalid = false;
  }

  getLowRisk() {
    return RiskEnum.L
  }

  getModerateRisk() {
    return RiskEnum.M
  }

  getCriticalRisk() {
    return RiskEnum.C
  }

  isAsked() {
    return this.compliant || this.noCompliant || this.notApplicable
  }

}
