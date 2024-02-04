import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { shift } from 'src/app/entities/enums/shift';
import { transportationType } from 'src/app/entities/enums/transportationType';
import { student } from 'src/app/entities/student';
import { IAppState } from 'src/app/store/app.state';
import { studentActions } from 'src/app/store/studentActions';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {

  studentId: string = '';

  student$ = this.store.select('app').pipe(
    map(e => e.students),
    switchMap(students => this.getStudentById(students, this.studentId))
  );

  constructor(
    private store: Store<{ app: IAppState }>,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.studentId = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(studentActions.loadStudentsAction())
  }

  returnHome() {
    this.router.navigate(['/home']);
  }

  private getStudentById(students: student[], studentId: string): Observable<student | undefined> {
    return this.store.select('app').pipe(
      map(e => e.students),
      map(students => students.find(student => student.id === studentId)),
      map((foundStudent: student | undefined) => {
        // Modificar o valor, se o estudante for encontrado
        if (foundStudent) {
          const transportationTypeLabel = this.getTransportationTypeLabel(foundStudent.transportationType);
          const shiftLabel = this.getShiftLabel(foundStudent.shift);

          // Retornar o valor modificado
          return {
            ...foundStudent,
            transportationType: transportationTypeLabel,
            shift: shiftLabel
          };
        }
  
        return foundStudent; // Retornar o valor sem modificar se não for encontrado
      })
    );
  }

  private getTransportationTypeLabel(transportationType: string): string {
    switch (transportationType) {
      case "IDA_E_VOLTA":
        return "Ida & Volta";
      case "IDA":
        return "Ida";
      case "VOLTA":
        return "Volta";
      default:
        return '';
    }
  }

  private getShiftLabel(shift: string): string {
    switch (shift) {
      case "MANHA":
        return "Manhã";
      case "TARDE":
        return "Tarde";
      default:
        return '';
    }
  }
}
