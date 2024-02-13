import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { GenericModalDialogComponent } from 'src/app/components/generic-modal-dialog/generic-modal-dialog.component';
import { months } from 'src/app/entities/enums/months';
import { payment } from 'src/app/entities/payment';
import { IAppState } from 'src/app/store/app.state';
import { studentActions } from 'src/app/store/studentActions';
import { v4 as uuidv4 } from 'uuid';

interface IPaymentRender {
  id: string | undefined;
  paymentDate: string | undefined;
  paymentMonth: months;
  price: number;
}

@Component({
  selector: 'app-payment-datail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {

  paymentsRender: IPaymentRender[] = [];

  public studentId: string = "";

  student$ = this.store.select('app').pipe(
    map(e => e.students),
    map(students => students.find(student => student.id === this.studentId))
  )
  
  constructor(
    private store: Store<{ app: IAppState }>,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.store.dispatch(studentActions.loadStudentsAction())
    this.studentId = this.activatedRouter.snapshot.paramMap.get('id') ?? '';

    this.student$.subscribe(student => {
      if (student) {
        this.paymentsRender = this.generatePaymentsRender(student.payments, student.monthlyPayment);
      }
    });
  }

  registerPayment(month: months) {
    const payment: payment = {
      id: uuidv4(),
      paymentDate: this.formatDateToDDMMYYYY(new Date()),
      paymentMonth: month
    }
    this.store.dispatch(studentActions.registerPaymentAction({studentId: this.studentId, payment: payment}))
  }

  returnPage() {
    this.router.navigate(['/student-detail', this.studentId]);
  }

  private generatePaymentsRender(payments: payment[] | undefined, monthlyPayment: number): IPaymentRender[] {
    const renderedPayments: IPaymentRender[] = [];
  
    for (const month of Object.values(months)) {
      const payment = payments?.find(p => p.paymentMonth.toUpperCase() === month.toUpperCase());
  
      renderedPayments.push({
        id: payment?.id,
        paymentDate: payment?.paymentDate,
        paymentMonth: month,
        price: monthlyPayment ?? 0,
      });
    }
  
    return renderedPayments;
  }

  formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses começam do zero
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
  }

}
