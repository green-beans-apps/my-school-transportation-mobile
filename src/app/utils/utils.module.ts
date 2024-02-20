import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormatMonthlyPayment } from "./FormatMonthlyPayment";


@NgModule({
  declarations: [FormatMonthlyPayment],
  imports: [CommonModule],
  exports: [FormatMonthlyPayment],
})
export class UtilsModule { }