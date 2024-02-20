export interface StudentData {
  id: string;
  studentName: string;
  school: string;
  grade: string;
  monthlyPayment: number;
  monthlyPaymentExpiration: number;
  conductorId: string | null;
  shift: string;
  transportationType: string;
}

export interface ResponsibleData {
  id: string;
  responsibleName: string;
  email: string;
  phone: string;
}

export interface AddressData {
  id: string;
  city: string;
  district: string;
  street: string;
  referencePoint: string;
  houseNumber: string;
}

export interface IRegisterStudentRequest {
  student: StudentData;
  responsible: ResponsibleData;
  address: AddressData;
}