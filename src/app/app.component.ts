import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionInputComponent } from "./shared/components/question-input/question-input.component";
import { PendingChecklistComponent } from "./pages/pending-checklist/pending-checklist.component";
import { StatusFlagComponent } from "./shared/components/status-flag/status-flag.component";
import { ItemStatusComponent } from "./shared/components/item-status/item-status.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionInputComponent, PendingChecklistComponent, StatusFlagComponent, ItemStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frota';
}
