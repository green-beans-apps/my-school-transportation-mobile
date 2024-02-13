import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { months } from 'src/app/entities/enums/months';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent  implements OnInit {

  popUpIsOpen = false

  titlePopUp = ""

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


  @Output() registerPaymentEmmiter = new EventEmitter<{month: months}>();

  constructor() { }

  ngOnInit() {
    this.setPaymentStatus()
    this.titlePopUp = `Confirmar o pagamento de ${this.month}?`
  }

  registerPayment() {
    this.closeConfirmPopUp()
    this.registerPaymentEmmiter.emit({month: this.month})
  }

  setPaymentStatus() {
    if(this.paymentDate) {
      this.statusPayment = 'Pago'
      return
    }
  }

  openConfirmPopUp() {
    this.popUpIsOpen = true
  }

  closeConfirmPopUp() {
    this.popUpIsOpen = false
  }
}
