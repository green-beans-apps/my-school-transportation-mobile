import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateStudentPageRoutingModule } from './update-student-routing.module';
import { UpdateStudentPage } from './update-student.page';
import { GenericModalDialogComponent } from 'src/app/components/generic-modal-dialog/generic-modal-dialog.component';
import { AppModule } from 'src/app/app.module';
import { GenericModalDialogModule } from 'src/app/components/generic-modal-dialog/generic-modal-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateStudentPageRoutingModule,
    ReactiveFormsModule,
    GenericModalDialogModule
  ],
  declarations: [UpdateStudentPage]
})
export class UpdateStudentPageModule {}
