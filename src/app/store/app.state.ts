import { createAction, createReducer, on, props } from '@ngrx/store';
import { note } from '../entities/note';
import { conductor } from '../entities/conductor';
import { student } from '../entities/student';
import { studentActions } from './studentActions';
import { conductortActions } from './conductorActions';
import { resetActions } from './resetActions';

export interface IAppState {
  notes: note[];
  conductor: conductor;
  students: student[];
}

export const appInitialState: IAppState = {
  notes: [],
  conductor: {
    name: '',
    email: '',
    cpf: '',
    id: ''
  },
  students: []
};

export const appReducer = createReducer(
  appInitialState,
  on(studentActions.setStudentsAction, (state, { students }) => ({ ...state, students: students })),
  on(conductortActions.setConductorAction, (state, { conductor }) => ({ ...state, conductor: conductor })),
  on(resetActions.reset, () => appInitialState),
  on(studentActions.registerStudentAction, (state, { student }) => ({
    ...state,
    students: [...state.students, student]
  })),
  on(studentActions.registerPaymentAction, (state, { payment, studentId }) => ({
    ...state,
    students: [...state.students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          payments: [...student.payments, payment]
        }
      } else {
        return student
      }
    })]
  })),
  on(studentActions.updateResponsibleAction, (state, { name, email, phone, studentId }) => ({
    ...state,
    students: [...state.students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          responsible: {
            ...student.responsible,
            name: name,
            email: email,
            phone: phone,
          }
        }
      } else {
        return student
      }
    })]
  })),
  on(studentActions.updateAddressAction, (state, { city, district, street, houseNumber, referencePoint, studentId }) => ({
    ...state,
    students: [...state.students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
           address: {
            ...student.address,
             city: city,
             district: district,
             street: street,
             houseNumber: houseNumber,
             referencePoint: referencePoint
           }
        }
      } else {
        return student
      }
    })]
  })),
  on(studentActions.updateStudentAction, (state, { name, school, shift, transportationType, grade, monthlyPayment, monthlyPaymentExpiration, id }) => ({
    ...state,
    students: [...state.students.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          name: name,
          school: school,
          shift: shift,
          transportationType: transportationType,
          grade: grade,
          monthlyPayment: monthlyPayment,
          monthlyPaymentExpiration: monthlyPaymentExpiration
        }
      } else {
        return student
      }
    })]
  })),
  on(conductortActions.updateConductorAction, (state, { name, email }) => ({
    ...state,
    conductor: {
      ...state.conductor,
       name: name,
       email: email
    }
  }))
);
