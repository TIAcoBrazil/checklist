import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnswerEnum, RiskEnum } from '@shared/enums';
import { IQuestion } from '@shared/models';
import { RiskPipe } from '@shared/pipes';
import { ChecklistService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUpload, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-question-input',
  standalone: true,
  imports: [CheckboxModule, FormsModule, CardModule, TagModule, RiskPipe, FileUploadModule],
  providers: [MessageService],
  templateUrl: './question-input.component.html',
  styleUrl: './question-input.component.scss'
})
export class QuestionInputComponent {
  compliant: boolean = false;
  noCompliant: boolean = false;
  notApplicable: boolean = false;

  id = input()
  question = input()
  isMandatory = input()
  risk = input<RiskEnum>()
  uploadedPhoto= output<FileUploadEvent>()

  invalid: boolean = false;
  photoUploaded: boolean = false;

  onUpload(event: FileUploadEvent) {
    this.photoUploaded = true;
    this.uploadedPhoto.emit(event)
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

  getBehavioralRisk() {
    return RiskEnum.B
  }

  getPhotographableRisk() {
    return RiskEnum.P
  }

  isPhotoUploaded() {
    if(this.isMandatory()) {
      return this.photoUploaded
    }
    return true
  }

  isAsked() {
    return this.compliant || this.noCompliant || this.notApplicable
  }

}
