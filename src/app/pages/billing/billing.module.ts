import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BillingPageRoutingModule } from './billing-routing.module';
import { BillingPage } from './billing.page';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingPageRoutingModule,
    ReactiveFormsModule,
    MaskitoDirective
  ],
  declarations: [BillingPage]
})
export class BillingPageModule {}
