import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateAddressPageRoutingModule } from './update-address-routing.module';
import { UpdateAddressPage } from './update-address.page';
import { GenericModalDialogModule } from 'src/app/components/generic-modal-dialog/generic-modal-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAddressPageRoutingModule,
    ReactiveFormsModule,
    GenericModalDialogModule
  ],
  declarations: [UpdateAddressPage]
})
export class UpdateAddressPageModule {}
