import { Pipe, PipeTransform } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';

@Pipe({
  name: 'answerStatus',
  standalone: true
})
export class AnswerStatusPipe implements PipeTransform {

  transform(value: number) {
    return value === 1;
  }

}
