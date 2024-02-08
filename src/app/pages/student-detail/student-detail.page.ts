import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { shift } from 'src/app/entities/enums/shift';
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

}
