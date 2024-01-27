import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor } from 'src/app/entities/Conductor';

type loginResponse = {
  authToken: string,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private urlLogin: string = 'http://localhost:8080/auth/login'

  private urlRegister: string = 'http://localhost:8080/conductor'

  
  constructor(private http: HttpClient) { }

  login(data: {cpf: string, password: string}): Observable<loginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<loginResponse>(this.urlLogin, data, httpOptions)
  }

  register(data: {name: string, email: string,cpf: string, password: string}): Observable<Conductor> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<Conductor>(this.urlRegister, data, httpOptions)
  }
}
