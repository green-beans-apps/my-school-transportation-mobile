import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from 'src/app/entities/student';
import { IRegisterStudentRequest } from './registerStudentRequest';
import { payment } from 'src/app/entities/payment';
import { updateResponsibleRequest } from './updateResponsibleRequest';
import { updateAddressRequest } from './updateAddressRequest';
import { updateStudentRequest } from './updateStudentRequest';
import { transportationType } from 'src/app/entities/enums/transportationType';

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
        id: student.id,
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
        id: student.responsible.id,
        responsibleName: student.responsible.name,
        email: student.responsible.email,
        phone: student.responsible.phone,
      },
      address: {
        id: student.address.id,
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

  updateResponsible(name: string, email: string, phone: string, studentId: string) {
    const requestData: updateResponsibleRequest = {
      name: name,
      email: email,
      phone: phone,
      studentId: studentId
    }

    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('token') ?? ''
    })

    const urlUpdateResponsible = `${this.baseUrl}student/responsible`
    return this.http.put<student>(urlUpdateResponsible, requestData, {headers: headers})

  }

  updateAddress(city: string, district: string, street: string, houseNumber: number, referencePoint: string, studentId: string) {
    const requestData: updateAddressRequest = {
      city: city,
      district: district,
      street: street,
      referencePoint: referencePoint,
      houseNumber: houseNumber,
      studentId: studentId
    }

    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('token') ?? ''
    })

    const urlUpdateResponsible = `${this.baseUrl}student/address`
    return this.http.put<student>(urlUpdateResponsible, requestData, {headers: headers})

  }

  updateStudent(name: string, school: string, grade: string, transportationType: transportationType, shift: string, monthlyPayment: number, monthlyPaymentExpiration: number, studentId: string) {
    const requestData: updateStudentRequest = {
      name: name,
      school: school,
      grade: grade,
      shift: shift,
      transportationType: transportationType,
      monthlyPayment: monthlyPayment,
      monthlyPaymentExpiration: monthlyPaymentExpiration,
      studentId: studentId
    }

    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('token') ?? ''
    })

    const urlUpdateStudent = `${this.baseUrl}student`
    return this.http.put<student>(urlUpdateStudent, requestData, {headers: headers})

  }
}
