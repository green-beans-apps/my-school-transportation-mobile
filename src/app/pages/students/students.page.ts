import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { shift } from 'src/app/entities/enums/shift';
import { student } from 'src/app/entities/student';
import { StudentService } from 'src/app/services/student/student.service';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  activeButton: string = "TODOS";

  students$: Observable<student[]> = this.store.select('app').pipe(
    map(e => e.students)
  )

  renderingStudents$ = this.students$

  constructor(private store: Store<{app: IAppState}>, private studentService: StudentService, private router: Router) { }

  ngOnInit() {
  }
  
  setActiveButton(button: string): void {
    this.activeButton = button === this.activeButton ? button : button;
    this.renderingStudents$ = this.students$.pipe(
      map(originalArray => {
        return originalArray.filter(item => {
          if(this.activeButton === "TODOS") {
            return item
          }
          return item.shift == this.activeButton as unknown as shift;
        });
      })
    );
  }

  selectStudent(studentId: string): void {
    this.router.navigate(['/student-detail', studentId]);
  }

  redirectRegisterStudent(): void {
    this.router.navigate(['/register-student']);
  }
  
}
