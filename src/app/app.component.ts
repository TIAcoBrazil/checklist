import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionInputComponent } from "./shared/components/question-input/question-input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frota';
}
