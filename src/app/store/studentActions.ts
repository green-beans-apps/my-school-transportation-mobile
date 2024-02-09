import { createAction, props } from "@ngrx/store"
import { student } from "../entities/student"
import { payment } from "../entities/payment"

const loadStudentsAction = createAction("[App] [student] load students")
const setStudentsAction = createAction("[App] [student] set students", props<{students: student[]}>())
const successSetStudentAction = createAction("[App] [Student] success set students")
const registerStudentAction = createAction("[App] [Student] register student", props<{student: student}>())
const registerPaymentAction = createAction("[App] [Student] [Payment] register Payment", props<{payment: payment, studentId: string}>())

export const studentActions = {
  loadStudentsAction,
  setStudentsAction,
  successSetStudentAction,
  registerStudentAction,
  registerPaymentAction
}
