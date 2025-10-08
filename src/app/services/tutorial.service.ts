import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutorial } from '../model/tutorial';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.httpClient.get<Tutorial[]>(baseUrl);
  }

  get(id:any) : Observable<Tutorial> {
    return this.httpClient.get<Tutorial>(`${baseUrl}/${id}`);
  }

  create(data: any) : Observable<any> {
    return this.httpClient.post(baseUrl, data);
  }

  update(id: any, data:any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/${id}`, data);
  }

  delete(id:any): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseUrl);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    return this.httpClient.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
}
