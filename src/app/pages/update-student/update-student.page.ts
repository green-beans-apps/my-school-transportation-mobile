import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { shift } from 'src/app/entities/enums/shift';
import { transportationType } from 'src/app/entities/enums/transportationType';
import { IAppState } from 'src/app/store/app.state';
import { studentActions } from 'src/app/store/studentActions';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {

  protected popUpIsOpen = false;

  protected titlePopUp = "Deseja confirmar as alterações?"

  protected transportationTypes = transportationType

  protected shiftTypes = shift


  student$ = this.store.select('app').pipe(
    map(e => e.students),
    map(students => students.find(student => student.id === this.studentId))
  );

  private studentId = ""

  private formBuilderService = inject(NonNullableFormBuilder)

  protected updateStudentForm = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/u)]],
    school: ['', [Validators.required]],
    grade: ['', [Validators.required]],
    transportType: [transportationType.IDA_E_VOLTA, [Validators.required]],
    shift: [shift.MANHA, [Validators.required]],
    monthlyPayment: [0, [Validators.required, Validators.min(1)]],
    monthlyPaymentExpiration: [0, [Validators.required, Validators.min(1), Validators.max(28)]],
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
          transportType: student.transportationType,
          shift: student.shift,
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
    if (this.updateStudentForm.invalid) return

    this.store.dispatch(studentActions.updateStudentAction({
      id: this.studentId,
      name: this.updateStudentForm.value.name ?? "",
      school: this.updateStudentForm.value.school ?? "",
      grade: this.updateStudentForm.value.grade ?? "",
      transportationType: this.updateStudentForm.value.transportType ?? transportationType.IDA_E_VOLTA,
      shift: this.updateStudentForm.value.shift ?? shift.MANHA,
      monthlyPayment: this.convertMonthlyPaymentToNumber(this.updateStudentForm.value.monthlyPayment),
      monthlyPaymentExpiration: this.updateStudentForm.value.monthlyPaymentExpiration ?? 0,
    }))

    this.closeConfirmPopUp()
    this.return()
  }

  openConfirmPopUp() {
    this.popUpIsOpen = true
  }

  closeConfirmPopUp() {
    this.popUpIsOpen = false
  }

  convertMonthlyPaymentToNumber(monthlyPayment: any): number {
    if (monthlyPayment) {
      monthlyPayment = monthlyPayment.replace(',', '');
      monthlyPayment = monthlyPayment.slice(0, monthlyPayment.length - 2) + "." + monthlyPayment.slice(monthlyPayment.length - 2);
    }
    return Number(monthlyPayment);
  }
}
