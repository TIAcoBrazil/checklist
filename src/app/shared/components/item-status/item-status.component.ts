import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { StatusFlagComponent } from '../status-flag';

@Component({
  selector: 'app-item-status',
  standalone: true,
  imports: [
    CardModule,
    StatusFlagComponent
  ],
  templateUrl: './item-status.component.html',
  styleUrl: './item-status.component.scss'
})
export class ItemStatusComponent {

  question = input()
  status = input()
}
