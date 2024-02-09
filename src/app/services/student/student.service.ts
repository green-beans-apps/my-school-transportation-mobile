import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from 'src/app/entities/student';
import { IRegisterStudentRequest } from './registerStudentRequest';
import { payment } from 'src/app/entities/payment';

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

  registerStudent(student: student): Observable<student> {
    const requestData: IRegisterStudentRequest = {
      student: {
        studentName: student.name,
        school: student.school,
        grade: student.grade,
        monthlyPayment: student.monthlyPayment,
        monthlyPaymentExpiration: student.monthlyPaymentExpiration,
        conductorId: window.localStorage.getItem('conductorId'),
        shift: student.shift,
        transportationType: student.transportationType,
      },
      responsible: {
        responsibleName: student.responsible.name,
        email: student.responsible.email,
        phone: student.responsible.phone,
      },
      address: {
        city: student.address.city,
        district: student.address.district,
        street: student.address.street,
        referencePoint: student.address.referencePoint,
        houseNumber: student.address.houseNumber
      }
    }

    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('token') ?? ''
    })

    const urlCreateStudent = `${this.baseUrl}student`
    return this.http.post<student>(urlCreateStudent, requestData, {headers: headers})
  }

  registerPayment(payment: payment, studentId: string) {
    const requestData = {
      studentId: studentId,
      month: payment.paymentMonth,
      paymentId: payment.id
    }

    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('token') ?? ''
    })

    const urlRegisterPayment = `${this.baseUrl}payment`
    return this.http.post<student>(urlRegisterPayment, requestData, {headers: headers})
  }
}
