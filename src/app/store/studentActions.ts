import { createAction, props } from "@ngrx/store"
import { student } from "../entities/student"
import { payment } from "../entities/payment"
import { address } from "../entities/address"
import { transportationType } from "../entities/enums/transportationType"
import { shift } from "../entities/enums/shift"

const loadStudentsAction = createAction("[App] [student] load students")
const setStudentsAction = createAction("[App] [student] set students", props<{students: student[]}>())
const successSetStudentAction = createAction("[App] [Student] success set students")
const registerStudentAction = createAction("[App] [Student] register student", props<{student: student}>())
const registerPaymentAction = createAction("[App] [Student] [Payment] register Payment", props<{payment: payment, studentId: string}>())
const updateResponsibleAction = createAction("[App] [Student] [Responsible] update Responsible", props<{name: string, email: string, phone: string, studentId: string}>())
const updateAddressAction = createAction("[App] [Student] [Address] update Address", props<{city: string, district: string, street: string, houseNumber: number, referencePoint: string, studentId: string}>())
const updateStudentAction = createAction("[App] [Student] update student", props<{name: string, school: string, grade: string, transportationType: transportationType, shift: shift, monthlyPayment: number, monthlyPaymentExpiration: number, id: string}>())


export const studentActions = {
  loadStudentsAction,
  setStudentsAction,
  successSetStudentAction,
  registerStudentAction,
  registerPaymentAction,
  updateResponsibleAction,
  updateAddressAction,
  updateStudentAction
}
