import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    MaskitoDirective,
    ReactiveFormsModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
