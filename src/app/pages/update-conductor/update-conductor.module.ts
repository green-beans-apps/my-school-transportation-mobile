import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateConductorPageRoutingModule } from './update-conductor-routing.module';

import { UpdateConductorPage } from './update-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateConductorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateConductorPage]
})
export class UpdateConductorPageModule {}
