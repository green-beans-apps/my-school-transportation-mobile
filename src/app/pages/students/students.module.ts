import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsPageRoutingModule } from './students-routing.module';

import { StudentsPage } from './students.page';
import { StudentCardComponent } from 'src/app/components/student-card/student-card.component';
import { SearchStudentComponent } from 'src/app/components/search-student/search-student.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StudentsPage, StudentCardComponent, SearchStudentComponent]
})
export class StudentsPageModule {}
