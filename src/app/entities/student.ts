import { address } from "./address";
import { shift } from "./enums/shift";
import { transportationType } from "./enums/transportationType";
import { responsible } from "./responsible";

export interface student {
  id: string;
  name: string;
  school: string;
  shift: string;
  grade: string;
  transportationType: string;
  monthlyPayment: string;
  monthlyPaymentExpiration: string;
  responsible: responsible;
  address: address;
}