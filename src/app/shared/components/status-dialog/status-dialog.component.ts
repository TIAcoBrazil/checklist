import { Component, effect, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-status-dialog',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './status-dialog.component.html',
  styleUrl: './status-dialog.component.scss'
})
export class StatusDialogComponent{

  imageFile = input<any>()
  imageUrl = ''
  description = input()

  constructor() {
    effect(() => {
      if (this.imageFile()) {
        this.imageUrl = URL.createObjectURL(this.imageFile())
      }
    })
  }

}
