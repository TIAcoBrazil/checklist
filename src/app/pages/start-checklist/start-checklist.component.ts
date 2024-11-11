import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChecklistService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-start-checklist',
  standalone: true,
  imports: [
    CardModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    ButtonModule,
    ProgressSpinnerModule,
    FormsModule,
    MessagesModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './start-checklist.component.html',
  styleUrl: './start-checklist.component.scss'
})
export class StartChecklistComponent{

  loading: boolean = false;

  carPlate = ''
  driverId = '269'

  invalidForm: boolean = false;

  constructor(private checklistService: ChecklistService, private router: Router, private messageService: MessageService) {}

  onSubmit() {

    if(!this.carPlate || !this.driverId) {
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Campos Faltantes!',
          detail: 'Preencha todos os campos.'
        }
      )
      return;
    }

    this.switchLoading()

    this.checklistService.createChecklist(this.carPlate, this.driverId).subscribe(
      {
        next: (checklist:any) => {
          console.log(checklist)
          this.router.navigate(['/checklist', checklist.checklistId])},
        error: e => {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Erro ao iniciar checklist!',
              detail: e.error.message
            }
          )
          this.switchLoading()
        }
      }
    )
  }

  private switchLoading() {
    this.loading = !this.loading;
  }
}
