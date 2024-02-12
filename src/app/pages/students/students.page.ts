import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, of, tap } from 'rxjs';
import { fildsSearch } from 'src/app/components/search-student/fildsSearch';
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

  activeButton: string = "Todos";

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
          if(this.activeButton === "Todos") {
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
  
  searchStudent(data: {fild: fildsSearch, value: string}): void {
    if(data.fild == fildsSearch.NAME) {
      this.students$.pipe(
        map((students) => {
          return students.filter(student => {
            if(this.activeButton === "Todos") {
              return student.name.toLowerCase().includes(data.value)
            }
            if(student.name.toLowerCase().includes(data.value) && student.shift == this.activeButton as unknown as shift) {
              return student
            }
            return null
          });
        }),
        tap(filteredStudents => {
          this.renderingStudents$ = of(filteredStudents);
        })
      ).subscribe()
    }
    if(data.fild == fildsSearch.SCHOOL) {
      this.students$.pipe(
        map((students) => {
          return students.filter(student => {
            if(this.activeButton === "Todos") {
              return student.school.toLowerCase().includes(data.value)
            }
            if(student.school.toLowerCase().includes(data.value) && student.shift == this.activeButton as unknown as shift) {
              return student
            }
            return null
          });
        }),
        tap(filteredStudents => {
          this.renderingStudents$ = of(filteredStudents);
        })
      ).subscribe()
    }
    if(data.fild == fildsSearch.TRANSPORTATION_TYPE) {
      this.students$.pipe(
        map((students) => {
          return students.filter(student => {
            if(this.activeButton === "Todos") {
              return student.transportationType.toLowerCase().includes(data.value)
            }
            if(student.transportationType.toLowerCase().includes(data.value) && student.shift == this.activeButton as unknown as shift) {
              return student
            }
            return null
          });
        }),
        tap(filteredStudents => {
          this.renderingStudents$ = of(filteredStudents);
        })
      ).subscribe()
    }
  }
}
