import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answerStatus',
  standalone: true
})
export class AnswerStatusPipe implements PipeTransform {

  transform(value: string,) {
    return value === 'C';
  }

}
