import { Routes } from '@angular/router';
import { ChecklistFormComponent, ChecklistsComponent, FinishChecklistComponent, HomeComponent, PendingChecklistComponent, StartChecklistComponent } from './pages';
import { HeaderComponent } from './core';

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'onboard/:id', component: StartChecklistComponent},
      {path: 'checklist/:id', component: ChecklistFormComponent},
      {path: 'finish/:id', component: FinishChecklistComponent},
      {path: 'pending', component: PendingChecklistComponent},
      {path: ':id', component: ChecklistsComponent},
      {path: '**', redirectTo: 'home'},
    ]
  }
];
