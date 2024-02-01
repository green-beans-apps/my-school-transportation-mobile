import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { address } from 'src/app/entities/address';
import { transportationType } from 'src/app/entities/enums/transportationType';
import { responsible } from 'src/app/entities/responsible';
import { student } from 'src/app/entities/student';
import { StudentService } from 'src/app/services/student/student.service';
import { IAppState, loadNotesAction } from 'src/app/store/app.state';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {


  students$: Observable<student[]> = this.store.select('app').pipe(
    map(e => e.students)
  )

  constructor(private store: Store<{app: IAppState}>, private studentService: StudentService) { }

  ngOnInit() {
  }
  
  activeButton: string | null = "todos";
  
  setActiveButton(button: string): void {
    this.activeButton = button === this.activeButton ? null : button;
  }
  
}
