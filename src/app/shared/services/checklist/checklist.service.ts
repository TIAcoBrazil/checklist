import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  uploadPhoto(file: File) {
    const formData: FormData = new FormData()
    formData.append('file', file)

    return this.http.post(this.url + '/upload', formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    })
  }

  validateCargos(cargos, driverId, carPlate) {
    const data = {
      cargos: cargos,
      driverId: driverId,
      carPlate: carPlate
    }
    return this.http.post(this.url + '/validate', data)
  }

  getNoCompliantAnswers(checklistId) {
    return this.http.get(this.url + '/answers/' + checklistId)
  }

}
