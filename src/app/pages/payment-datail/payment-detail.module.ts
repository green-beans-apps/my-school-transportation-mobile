import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDatailPageRoutingModule } from './payment-detail-routing.module';

import { PaymentDetailPage } from './payment-detail.page';
import { PaymentCardComponent } from 'src/app/components/payment-card/payment-card.component';
import { GenericModalDialogComponent } from 'src/app/components/generic-modal-dialog/generic-modal-dialog.component';
import { GenericModalDialogModule } from 'src/app/components/generic-modal-dialog/generic-modal-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDatailPageRoutingModule,
    GenericModalDialogModule
  ],
  declarations: [PaymentDetailPage, PaymentCardComponent]
})
export class PaymentDetailPageModule {}
