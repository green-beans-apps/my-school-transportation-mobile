import { address } from "./address";
import { shift } from "./enums/shift";
import { transportationType } from "./enums/transportationType";
import { payment } from "./payment";
import { responsible } from "./responsible";

export interface student {
  id: string;
  name: string;
  school: string;
  shift: shift;
  grade: string;
  transportationType: transportationType;
  monthlyPayment: number;
  monthlyPaymentExpiration: number;
  responsible: responsible;
  address: address;
  payments: payment[];
}