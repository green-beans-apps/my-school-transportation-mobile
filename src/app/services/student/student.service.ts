import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from 'src/app/entities/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = "http://localhost:8080/"


  constructor(private http: HttpClient) { }

  getAll(): Observable<student[]> {
    const conductorId = window.localStorage.getItem("conductorId")

    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('token') ?? ''
    })

    const urlGetAll = `${this.baseUrl}student/conductor/${conductorId}`
    return this.http.get<student[]>(urlGetAll, {headers: headers})
  }
}
