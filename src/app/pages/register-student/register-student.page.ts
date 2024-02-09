import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    name: ['', [Validators.required, Validators.minLength(4)]],
    school: ['', [Validators.required]],
    grade: ['', [Validators.required]],
    transportType: [transportationType.IDA_E_VOLTA, [Validators.required]],
    shift: [shift.MANHA, [Validators.required]],
    monthlyPayment: [0, [Validators.required]],
    monthlyPaymentExpiration: ['', [Validators.required]],
    responsibleName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    city: ['', [Validators.required]],
    district: ['', [Validators.required]],
    street: ['', [Validators.required]],
    houseNumber: [0, [Validators.required]],
    referencePoint: ['', [Validators.required]],
  })

  constructor(private router: Router, private store: Store<{app: IAppState}>) { }

  ngOnInit() {
  }

  submitForm(): void {
    if(this.studentForm.invalid) return

    const student: student = {
      id: uuidv4(),
      name: this.studentForm.value.name ?? "",
      school: this.studentForm.value.school ?? "",
      shift: this.studentForm.value.shift as shift ?? shift.MANHA,
      grade: this.studentForm.value.grade ?? "",
      transportationType: this.studentForm.value.transportType as transportationType ?? transportationType.IDA_E_VOLTA,
      monthlyPayment: this.studentForm.value.monthlyPayment ?? 0,
      monthlyPaymentExpiration: this.studentForm.value.monthlyPaymentExpiration ?? "",
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
        houseNumber: this.studentForm.value.houseNumber?? 0,
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
    this.router.navigate(['/home']);
  }

}
