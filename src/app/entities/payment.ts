import { months } from "./enums/months";

export interface payment {
  id: string;
  paymentDate: string;
  paymentMonth: months
}