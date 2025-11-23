import { months } from "../entities/enums/months";

export const monthOrder = [
  months.JANEIRO,
  months.FEVEREIRO,
  months.MARCO,
  months.ABRIL,
  months.MAIO,
  months.JUNHO,
  months.JULHO,
  months.AGOSTO,
  months.SETEMBRO,
  months.OUTUBRO,
  months.NOVEMBRO,
  months.DEZEMBRO,
];

/**
 * Retorna os meses iguais ou posteriores ao mês de registro.
 * @param registrationMonth Número de 1 a 12
 */
export function getMonthsFrom(registrationMonth: number): months[] {
  return monthOrder.slice(registrationMonth - 1);
}
