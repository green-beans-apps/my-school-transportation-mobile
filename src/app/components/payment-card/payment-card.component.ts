import { Component, Input, OnInit } from '@angular/core';
import { months } from 'src/app/entities/enums/months';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent  implements OnInit {

  @Input()
  month = months.JANEIRO

  @Input()
  valuePayment = 0

  statusPayment = 'Pendente'

  @Input()
  paymentDate: string | undefined;

  @Input()
  id: string | undefined;

  @Input()
  paymentExpiration: string = "02"

  constructor() { }

  ngOnInit() {
    this.setPaymentStatus()
  }

  setPaymentStatus() {
    if(this.paymentDate) {
      this.statusPayment = 'Pago'
      return
    }
  }
}
