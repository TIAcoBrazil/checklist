import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
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
    ToastModule,
    TagModule,
    ChipModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './start-checklist.component.html',
  styleUrl: './start-checklist.component.scss'
})
export class StartChecklistComponent implements OnInit{

  loading: boolean = false;

  carPlate = ''
  driverId = ''
  cargo = ''

  cargos = []

  invalidForm: boolean = false;

  constructor(
    private checklistService: ChecklistService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.driverId = params.get('id');
      }
    )
  }

  onSubmit() {

    if(!this.carPlate || this.cargos.length === 0) {
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

    this.checklistService.validateCargos(this.cargos, this.driverId, this.carPlate).subscribe(
      {next: (r:string[]) => {
        if (r.length > 0) {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Erro!',
              detail: 'Os carregamentos a seguir não existem, ou estão associadas a outro carro e/ou motorista: ' + r.join(",")
            }
          )
          this.switchLoading()
        } else {
          this.checklistService.createChecklist(this.carPlate, this.driverId).subscribe(
            {
              next: (checklist:any) => {
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
      },
        error: e => console.log(e)
      }
    )


  }

  handleType(event:any) {
    if (event.key === ' ' || event.key === ',') {
      this.cargos.push(this.cargo.slice(0,-1))
      this.cargo = ''
    } else if (event.key === 'Enter') {
      this.cargos.push(this.cargo.trim())
      this.cargo = ''
    }
  }

  deleteCargo(index) {
    this.cargos.splice(index, 1)
  }

  private validateCargos() {

  }
  private switchLoading() {
    this.loading = !this.loading;
  }
}
