import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { months } from 'src/app/entities/enums/months';
import { payment } from 'src/app/entities/payment';
import { student } from 'src/app/entities/student';
import { IAppState } from 'src/app/store/app.state';
import { studentActions } from 'src/app/store/studentActions';

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
    switchMap(students => this.getStudentById(students, this.studentId))
  )
  
  constructor(
    private store: Store<{ app: IAppState }>,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(studentActions.loadStudentsAction())
    this.studentId = this.activatedRouter.snapshot.paramMap.get('id') ?? '';

    this.student$.subscribe(student => {
      if (student) {
        console.log(student.payments)
        this.paymentsRender = this.generatePaymentsRender(student.payments, student.monthlyPayment);
      }
    });
  }

  returnPage() {
    this.router.navigate(['/student-detail', this.studentId]);
  }

  private getStudentById(students: student[], studentId: string): Observable<student | undefined> {
    return this.store.select('app').pipe(
      map(e => e.students),
      map(students => students.find(student => student.id === studentId))
    );
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
}
