import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteEnum } from '@shared/enums/route.enum';
@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  private url = '/api/checklists'

  constructor(private http: HttpClient) {}

  createChecklist(carPlate: string, driverId: string) {
    const body = {
      carPlate: carPlate,
      driverId: driverId,
      route: RouteEnum.START
    }

    return this.http.post(this.url, body)
  }

  submitAnswers(answers: any[], checklistId: string) {
    const body = {
      answers: answers,
      checklistId: checklistId
    }
    return this.http.post(this.url + "/answers", body)
  }

  submitFinalAnswers(answers: any[], checklistId: string) {
    const body = {
      answers: answers,
      checklistId: checklistId
    }
    return this.http.post(this.url + "/answers/finish", body)
  }

  getLists(driverId: string) {
    return this.http.get(this.url + `/${driverId}`)
  }
}
