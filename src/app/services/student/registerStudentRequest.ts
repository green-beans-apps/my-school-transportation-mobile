export interface StudentData {
  studentName: string;
  school: string;
  grade: string;
  monthlyPayment: number;
  monthlyPaymentExpiration: string;
  conductorId: string | null;
  shift: string;
  transportationType: string;
}

export interface ResponsibleData {
  responsibleName: string;
  email: string;
  phone: string;
}

export interface AddressData {
  city: string;
  district: string;
  street: string;
  referencePoint: string;
  houseNumber: number;
}

export interface IRegisterStudentRequest {
  student: StudentData;
  responsible: ResponsibleData;
  address: AddressData;
}