import { createAction, props } from "@ngrx/store"
import { student } from "../entities/student"

const loadStudentsAction = createAction("[App] [student] load students")
const setStudentsAction = createAction("[App] [student] set students", props<{students: student[]}>())

export const studentActions = {
  loadStudentsAction,
  setStudentsAction
}
