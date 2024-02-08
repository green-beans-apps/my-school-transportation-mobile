import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conductor } from 'src/app/entities/conductor';
import { loginResponse } from './response/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private urlLogin: string = 'http://localhost:8080/auth/login'

  private urlRegister: string = 'http://localhost:8080/conductor'

  private urlGetConductorById: string = 'http://localhost:8080/conductor/'

  
  constructor(private http: HttpClient) { }

  login(data: {login: string, password: string}): Observable<loginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<loginResponse>(this.urlLogin, data, httpOptions)
  }

  register(data: {name: string, email: string,cpf: string, password: string}): Observable<conductor> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<conductor>(this.urlRegister, data, httpOptions)
  }

  getConductorById(id: string) : Observable<conductor>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token') ?? ''
      })
    }
    const url = `${this.urlGetConductorById}${id}`;
    return this.http.get<conductor>(url, httpOptions);
  }
}
