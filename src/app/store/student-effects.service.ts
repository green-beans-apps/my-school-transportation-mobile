import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from './app.state';
import { studentActions } from './studentActions';
import { StudentService } from '../services/student/student.service';
import { exhaustMap, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentEffectsService {

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private store: Store<{ app: IAppState }>
  ) { }

  public loadStudentsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(studentActions.loadStudentsAction),
    switchMap(() =>
      this.studentService.getAll()
    ),
    tap((students) =>
      this.store.dispatch(studentActions.setStudentsAction({ students: students }))
    ),
    map(() => studentActions.successSetStudentAction())
  ))

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
}
