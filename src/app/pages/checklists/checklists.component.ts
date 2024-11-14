import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { checklistsMocks } from '@shared/mocks';
import { ChecklistService } from '@shared/services';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-checklists',
  standalone: true,
  imports: [TableModule, ButtonModule, RouterLink],
  templateUrl: './checklists.component.html',
  styleUrl: './checklists.component.scss'
})
export class ChecklistsComponent implements OnInit{

  checklists = null
  driverId = '';

  constructor(
    private checklistService: ChecklistService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.driverId = params.get('id')
      this.getCheckLists()
    })
  }

  getCheckLists() {
    this.checklistService.getLists(this.driverId).subscribe(
      {
        next: r => this.checklists = r,
        error: e => console.log(e)
      }
    )
  }

  newChecklist() {
    console.log(this.driverId)
    this.router.navigate(['/onboard/' + this.driverId])
  }

  finishChecklist(checklistId) {
    this.router.navigate(['/finish/' + checklistId])
  }

  viewPendingChecklist(checklistId, carPlate) {
    const data = {
      checklistId: checklistId,
      carPlate: carPlate
    }
    this.router.navigate(['/pending'], {state: {data}})
  }
}
