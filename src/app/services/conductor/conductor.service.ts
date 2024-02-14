import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conductor } from 'src/app/entities/conductor';
import { loginResponse } from './response/loginResponse';
import { environments } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  
  private baseUrl = environments.baseUrlApi
  
  constructor(private http: HttpClient) { }

  login(data: {login: string, password: string}): Observable<loginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    const urlLogin = `${this.baseUrl}/auth/login`
    return this.http.post<loginResponse>(urlLogin, data, httpOptions)
  }

  register(data: {name: string, email: string,cpf: string, password: string}): Observable<conductor> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    const urlRegister = `${this.baseUrl}/conductor`
    return this.http.post<conductor>(urlRegister, data, httpOptions)
  }

  getConductorById(id: string) : Observable<conductor>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token') ?? ''
      })
    }
    const urlGetConductorById = `${this.baseUrl}/conductor/${id}`
    return this.http.get<conductor>(urlGetConductorById, httpOptions);
  }

  updateConductor(data: {name: string, email: string, id: string}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token') ?? ''
      })
    }

    const requestBody = {
      name: data.name,
      email: data.email,
      conductorId: data.id
    }

    const updateUrl = `${this.baseUrl}/conductor`;
    return this.http.put<conductor>(updateUrl, requestBody, httpOptions);
  }
}
