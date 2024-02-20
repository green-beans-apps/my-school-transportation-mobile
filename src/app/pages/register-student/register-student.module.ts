import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterStudentPageRoutingModule } from './register-student-routing.module';

import { RegisterStudentPage } from './register-student.page';
import { MaskitoDirective } from '@maskito/angular';
import { UtilsModule } from 'src/app/utils/utils.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterStudentPageRoutingModule,
    ReactiveFormsModule,
    MaskitoDirective,
    UtilsModule
  ],
  declarations: [RegisterStudentPage]
})
export class RegisterStudentPageModule {}
