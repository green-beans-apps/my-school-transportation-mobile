import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const cpf = control.value ? control.value.replace(/\D/g, '') : '';

  if (cpf.length !== 11) {
    return { cpfInvalidLength: true };
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return { cpfRepeatedDigits: true };
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
    return { cpfInvalid: true };
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11), 10)) {
    return { cpfInvalid: true };
  }

  return null;
}
