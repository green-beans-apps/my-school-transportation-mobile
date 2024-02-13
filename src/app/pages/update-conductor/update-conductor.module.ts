import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateConductorPageRoutingModule } from './update-conductor-routing.module';
import { UpdateConductorPage } from './update-conductor.page';
import { GenericModalDialogModule } from 'src/app/components/generic-modal-dialog/generic-modal-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateConductorPageRoutingModule,
    ReactiveFormsModule,
    GenericModalDialogModule
  ],
  declarations: [UpdateConductorPage]
})
export class UpdateConductorPageModule {}
