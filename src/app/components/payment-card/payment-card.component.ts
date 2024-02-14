import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { months } from 'src/app/entities/enums/months';
import { paymentStatus } from './paymentStatus';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent  implements OnInit {

  paymentStatusEnum = paymentStatus

  popUpCancelPaymentIsOpen = false

  popUpConfirmPaymentIsOpen = false

  titlePopUp = ""

  titlePopUpCancelPayment = ""

  @Input()
  month = months.JANEIRO

  @Input()
  valuePayment = 0

  statusPayment = paymentStatus.PENDENTE

  @Input()
  paymentDate: string | undefined;

  @Input()
  id: string | undefined;

  @Input()
  paymentExpiration: string = "02"


  @Output() registerPaymentEmmiter = new EventEmitter<{month: months}>();

  @Output() cancelPaymentEmmiter = new EventEmitter<{id: string}>();

  constructor() { }

  ngOnInit() {
    this.setPaymentStatus()
    this.titlePopUp = `Confirmar o pagamento de ${this.month}?`
    this.titlePopUpCancelPayment = `Deseja CANCELAR o pagamento de ${this.month}?`
  }

  registerPayment() {
    this.toggleConfirmPaymentPopUp()
    this.registerPaymentEmmiter.emit({month: this.month})
  }

  cancelPayment() {
    this.toggleCancelPaymentPopUp()
    this.cancelPaymentEmmiter.emit({id: this.id ?? ""})
  }

  setPaymentStatus() {
    if(this.paymentDate) {
      this.statusPayment = paymentStatus.PAGO
      return
    }
  }

  toggleConfirmPaymentPopUp() {
    this.popUpConfirmPaymentIsOpen = !this.popUpConfirmPaymentIsOpen
  }

  toggleCancelPaymentPopUp() {
    this.popUpCancelPaymentIsOpen = !this.popUpCancelPaymentIsOpen
  }
}
