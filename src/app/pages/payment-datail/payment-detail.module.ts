import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDatailPageRoutingModule } from './payment-detail-routing.module';

import { PaymentDetailPage } from './payment-detail.page';
import { PaymentCardComponent } from 'src/app/components/payment-card/payment-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDatailPageRoutingModule
  ],
  declarations: [PaymentDetailPage, PaymentCardComponent]
})
export class PaymentDetailPageModule {}
