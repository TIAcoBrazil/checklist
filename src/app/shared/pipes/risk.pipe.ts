import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'risk',
  standalone: true
})
export class RiskPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'L':
        return 'Risco Leve';
      case 'M':
        return 'Risco Moderado';
      case 'C':
        return 'Risco Crítico';
      default:
        return 'Risco Desconhecido';
    }
  }

}
