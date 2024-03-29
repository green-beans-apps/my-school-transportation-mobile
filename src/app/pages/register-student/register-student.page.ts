import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { Store } from '@ngrx/store';
import { months } from 'src/app/entities/enums/months';
import { shift } from 'src/app/entities/enums/shift';
import { transportationType } from 'src/app/entities/enums/transportationType';
import { student } from 'src/app/entities/student';
import { IAppState } from 'src/app/store/app.state';
import { studentActions } from 'src/app/store/studentActions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.page.html',
  styleUrls: ['./register-student.page.scss'],
})
export class RegisterStudentPage implements OnInit {

  protected formSubmited = false;

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  readonly maskPhone: MaskitoOptions = {
    mask: ['(', /\d/,/\d/, ')' , ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };

  protected transportationTypes = {
    idaEVolta: transportationType.IDA_E_VOLTA,
    ida: transportationType.IDA,
    volta: transportationType.VOLTA
  }

  protected shiftTypes = {
    manha: shift.MANHA,
    tarde: shift.TARDE
  }

  private formBuilderService = inject(NonNullableFormBuilder)

  protected studentForm = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/u)]],
    school: ['', [Validators.required]],
    grade: ['', [Validators.required]],
    transportType: [transportationType.IDA_E_VOLTA, [Validators.required]],
    shift: [shift.MANHA, [Validators.required]],
    monthlyPayment: [0, [Validators.required, Validators.min(1)]],
    monthlyPaymentExpiration: [0, [Validators.required, Validators.min(1), Validators.max(28)]],
    responsibleName: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/u)]],
    email: [''],
    phone: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    city: ['', [Validators.required]],
    district: ['', [Validators.required]],
    street: ['', [Validators.required]],
    houseNumber: [''],
    referencePoint: [''],
  })

  constructor(private router: Router, private store: Store<{app: IAppState}>) { }

  ngOnInit() {
    this.studentForm.patchValue({
      name: "",
      school: "",
      grade: "",
      transportType: transportationType.IDA_E_VOLTA,
      shift: shift.MANHA,
      monthlyPayment: 0,
      monthlyPaymentExpiration: 0,
      responsibleName: "",
      email: "",
      phone: "",
      city: "Recife",
      district: "",
      street: "",
      houseNumber: "",
      referencePoint: "",
    })
  }

  submitForm(): void {
    this.formSubmited = true
    if(this.studentForm.invalid) return

    const student: student = {
      id: uuidv4(),
      name: this.studentForm.value.name ?? "",
      school: this.studentForm.value.school ?? "",
      shift: this.studentForm.value.shift as shift ?? shift.MANHA,
      grade: this.studentForm.value.grade ?? "",
      transportationType: this.studentForm.value.transportType as transportationType ?? transportationType.IDA_E_VOLTA,
      monthlyPayment: this.convertMonthlyPaymentToNumber(this.studentForm.value.monthlyPayment),
      monthlyPaymentExpiration: this.studentForm.value.monthlyPaymentExpiration ?? 0,
      responsible: {
        id: uuidv4(),
        name: this.studentForm.value.responsibleName?? "",
        email: this.studentForm.value.email?? "",
        phone: this.studentForm.value.phone?? ""
      },
      address: {
        id: uuidv4(),
        city: this.studentForm.value.city?? "",
        district: this.studentForm.value.district?? "",
        street: this.studentForm.value.street?? "",
        houseNumber: this.studentForm.value.houseNumber?? "",
        referencePoint: this.studentForm.value.referencePoint?? ""
      },
      payments: []
    }
    
    this.store.dispatch(studentActions.registerStudentAction({student: student}))
    this.returnHome()
  }

  returnHome() {
    this.studentForm.reset();
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.markAsUntouched();
    });
    this.formSubmited = false
    this.router.navigate(['/home']);
  }

  convertMonthlyPaymentToNumber(monthlyPayment: any): number {
    if (monthlyPayment) {
      monthlyPayment = monthlyPayment.replace(',', '');
      monthlyPayment = monthlyPayment.slice(0, monthlyPayment.length - 2) + "." + monthlyPayment.slice(monthlyPayment.length - 2);
    }
    return Number(monthlyPayment);
  }
}
