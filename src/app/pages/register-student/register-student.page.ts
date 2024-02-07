import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.page.html',
  styleUrls: ['./register-student.page.scss'],
})
export class RegisterStudentPage implements OnInit {

  private formBuilderService = inject(NonNullableFormBuilder)

  protected studentForm = this.formBuilderService.group({
    name: ['', [Validators.required]],
    school: ['', [Validators.required]],
    grade: ['', [Validators.required]],
    transportType: ['', [Validators.required]],
    monthlyPayment: ['', [Validators.required]],
    monthlyPaymentExpiration: ['', [Validators.required]],
    responsibleName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    city: ['', [Validators.required]],
    district: ['', [Validators.required]],
    street: ['', [Validators.required]],
    houseNumber: [0, [Validators.required]],
    referencePoint: ['', [Validators.required]],
  })

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submitForm(): void {
    const requestData = {
      student: {
        studentName: this.studentForm.value.name,
        school: this.studentForm.value.school,
        grade: this.studentForm.value.grade,
        monthlyPayment: this.studentForm.value.monthlyPayment,
        monthlyPaymentExpiration: this.studentForm.value.monthlyPaymentExpiration,
        conductorId: window.localStorage.getItem('conductorId'),
      },
      responsible: {
        responsibleName: this.studentForm.value.responsibleName,
        email: this.studentForm.value.email,
        phoneNumber: this.studentForm.value.phone,
      },
      address: {
        city: this.studentForm.value.city,
        district: this.studentForm.value.district,
        street: this.studentForm.value.street,
        referencePoint: this.studentForm.value.referencePoint,
        houseNumber: this.studentForm.value.houseNumber
      }
    }
  }

  returnHome() {
    this.router.navigate(['/home']);
  }

}
