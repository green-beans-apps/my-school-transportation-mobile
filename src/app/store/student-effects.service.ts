import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from './app.state';
import { studentActions } from './studentActions';
import { StudentService } from '../services/student/student.service';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { convertStringToShift } from '../utils/convertStringToShift';
import { convertStringToTransportationType } from '../utils/convertStringToTransportationType';

@Injectable({
  providedIn: 'root'
})
export class StudentEffectsService {

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private store: Store<{ app: IAppState }>
  ) { }

  loadStudentsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(studentActions.loadStudentsAction),
    switchMap(() =>
      this.studentService.getAll().pipe(
        map((students) => students.map(student => ({
          ...student,
          shift: convertStringToShift(student.shift),
          transportationType: convertStringToTransportationType(student.transportationType)
        }))),
        catchError(error => of([]))
      )
    ),
    tap((students) =>
      this.store.dispatch(studentActions.setStudentsAction({ students }))
    ),
    map(() => studentActions.successSetStudentAction())
  ));

  public registerStudentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(studentActions.registerStudentAction),
    switchMap((action) =>
      this.studentService.registerStudent(action.student)
    ),
    map(() => studentActions.successSetStudentAction())
  ))

  public registerPaymentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(studentActions.registerPaymentAction),
    switchMap((action) =>
      this.studentService.registerPayment(action.payment, action.studentId)
    ),
    map(()=> studentActions.successSetStudentAction())
  ))

  public updateResponsibleEffect$ = createEffect(() => this.actions$.pipe(
    ofType(studentActions.updateResponsibleAction),
    switchMap((action) =>
      this.studentService.updateResponsible(action.name, action.email, action.phone, action.studentId)
    ),
    map(() => studentActions.successSetStudentAction())
  ))

  public updateAddressEffect$ = createEffect(() => this.actions$.pipe(
    ofType(studentActions.updateAddressAction),
    switchMap((action) =>
      this.studentService.updateAddress(action.city, action.district, action.street, action.houseNumber, action.referencePoint, action.studentId)
    ),
    map(() => studentActions.successSetStudentAction())
  ))

  public updateStudentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(studentActions.updateStudentAction),
    switchMap((action) =>
      this.studentService.updateStudent(action.name, action.school, action.grade, action.transportationType, action.shift, action.monthlyPayment, action.monthlyPaymentExpiration, action.id)
    ),
    map(() => studentActions.successSetStudentAction())
  ))
}
