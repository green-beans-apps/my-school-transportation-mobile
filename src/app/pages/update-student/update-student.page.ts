import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { shift } from 'src/app/entities/enums/shift';
import { transportationType } from 'src/app/entities/enums/transportationType';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {

  protected transportationTypes = transportationType

  protected shiftTypes = shift

  student$ = this.store.select('app').pipe(
    map(e => e.students),
    map(students => students.find(student => student.id === this.studentId))
  );

  private studentId = ""

  private formBuilderService = inject(NonNullableFormBuilder)

  protected updateStudentForm = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    school: ['', [Validators.required]],
    grade: ['', [Validators.required]],
    transportType: [transportationType.IDA_E_VOLTA, [Validators.required]],
    shift: [shift.MANHA, [Validators.required]],
    monthlyPayment: [0, [Validators.required]],
    monthlyPaymentExpiration: [0, [Validators.required]],
  })

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private store: Store<{ app: IAppState }>,) { }

  ngOnInit() {
    this.studentId = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.student$.subscribe((student) => {
      if (student) {
        this.updateStudentForm.patchValue({
          name: student.name,
          school: student.school,
          grade: student.grade,
          transportType: this.convertStringToTransportationType(student.transportationType),
          shift: this.convertStringToShift(student.shift),
          monthlyPayment: student.monthlyPayment,
          monthlyPaymentExpiration: student.monthlyPaymentExpiration,
        });
      }
    })
  }


  return(): void {
    this.router.navigate(['/student-detail', this.studentId]);
  }

  submitForm() {

  }

  convertStringToShift(value: string | shift): shift {
    if(value === "TARDE") {
      return shift.TARDE
    }
    return shift.MANHA
  }

  convertStringToTransportationType(value: string | transportationType): transportationType {
    if(value === "IDA_E_VOLTA") {
      return transportationType.IDA_E_VOLTA
    }
    if(value === "IDA") {
      return transportationType.IDA
    }
    if(value === "VOLTA") {
      return transportationType.VOLTA
    }
    return transportationType.IDA_E_VOLTA
  }

}
