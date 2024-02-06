import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.page.html',
  styleUrls: ['./register-student.page.scss'],
})
export class RegisterStudentPage implements OnInit {

  errosInput = {
    name: false,
    school: false,
    grade: false,
    transportType: false,
    monthlyPayment: false,
    monthlyPaymentExpiration: false,
    responsibleName: false, 
    email: false,
    phone: false,
    city: false,
    district: false,
    street: false,
    referencePoint: false,
    houseNumber: false
  }

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

  returnHome() {
    this.router.navigate(['/home']);
  }

}
