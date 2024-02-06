import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
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
    map(students => students.find(student => student.id === this.studentId))
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

  
  redirectPaymentDetails() {
    this.router.navigate(['/payment-detail', this.studentId]);
  }

  private getShiftLabel(student: student | undefined): student | undefined {
    if (student !== undefined) {
      switch (student.shift) {
        case "MANHA":
          student.shift = "Manhã";
          break
        case "TARDE":
          student.shift = "Tarde";
          break
      }
      return student

    }
    return student
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
}
