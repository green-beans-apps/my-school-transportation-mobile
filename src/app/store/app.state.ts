import { createAction, createReducer, on, props } from '@ngrx/store';
import { note } from '../entities/note';
import { conductor } from '../entities/conductor';
import { student } from '../entities/student';
import { studentActions } from './studentActions';
import { conductortActions } from './conductorAdtions';
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


export const loadNotesAction = createAction("[App] load notes")
export const setNotesAction = createAction("[App] set notes", props<{notes: note[]}>())
export const successSetNotesAction = createAction("[App] [notes] success set notes")
export const deleteNoteAction = createAction("[APP] delete note", props<{noteId: string}>())
export const updateNoteAction = createAction("[APP] update note", props<{noteId: string, title: string, description: string}>())
export const saveNoteAction = createAction("[APP] save note", props<{ id: string, title: string, description: string}>())

export const appReducer = createReducer(
  appInitialState,
  on(studentActions.setStudentsAction, (state, { students }) => ({ ...state, students: students})),
  on(conductortActions.setConductorAction, (state, { conductor }) => ({ ...state, conductor: conductor})),
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
  
  on(setNotesAction, (state, { notes }) => ({ ...state, notes: notes})),
  on(deleteNoteAction, (state, { noteId }) => ({ ...state, notes: state.notes.filter(note => note.id !== noteId)})),
  on(updateNoteAction, (state, { noteId, title, description }) => ({
    ...state,
    notes: state.notes.map(note => {
      if (note.id === noteId) {
        return { ...note, title, description };
      }
      return note;
    }),
  })),
  on(saveNoteAction, (state, { title, description, id }) => ({
    ...state,
    notes: [...state.notes, { id, title, description }]
  })),
);
