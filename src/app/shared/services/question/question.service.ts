import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private url = '/api/questions'

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(this.url)
  }
}
