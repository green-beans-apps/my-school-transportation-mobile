import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateResponsiblePageRoutingModule } from './update-responsible-routing.module';
import { UpdateResponsiblePage } from './update-responsible.page';
import { MaskitoDirective } from '@maskito/angular';
import { GenericModalDialogModule } from 'src/app/components/generic-modal-dialog/generic-modal-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateResponsiblePageRoutingModule,
    ReactiveFormsModule,
    MaskitoDirective,
    GenericModalDialogModule
  ],
  declarations: [UpdateResponsiblePage]
})
export class UpdateResponsiblePageModule {}
