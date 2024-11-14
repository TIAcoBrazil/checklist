import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-flag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-flag.component.html',
  styleUrl: './status-flag.component.scss'
})
export class StatusFlagComponent {

  status = input()
}
