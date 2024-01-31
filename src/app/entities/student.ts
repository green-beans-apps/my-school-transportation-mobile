import { address } from "./address";
import { transportationType } from "./enums/transportationType";
import { responsible } from "./responsible";

export interface student {
  id: string;
  name: string;
  school: string;
  grade: string;
  transportationType: transportationType;
  monthlyPayment: string;
  monthlyPaymentExpiration: string;
  responsible: responsible;
  address: address;
}