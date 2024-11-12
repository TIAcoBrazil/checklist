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
      case 'B':
        return 'Comportamento no trânsito';
      case 'P':
        return 'Fotografia do veículo'
      default:
        return 'Risco Desconhecido';
    }
  }

}
