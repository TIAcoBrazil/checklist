import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  apiUrl = '/api/photos/'
  constructor(private http: HttpClient) { }

  getPhotoByName(checklistId, questionId) {
    return this.http.get(this.apiUrl + `${checklistId}/${questionId}`, { responseType: 'blob'})
  }

}
