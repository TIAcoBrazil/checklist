import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChecklistService } from '@shared/services';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  driverId = ''
  loading = false
  invalid = false

  constructor(private router: Router) {}

  onReset() {
    this.driverId = ''
    this.invalid = false
  }

  onSubmit() {
    if (this.driverId.trim() === '') {
      this.invalid = true
      return
    }
    this.invalid = false;

    this.router.navigate([`/${this.driverId}`])
  }

}
