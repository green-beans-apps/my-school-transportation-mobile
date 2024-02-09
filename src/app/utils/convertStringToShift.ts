import { shift } from "../entities/enums/shift"

export function convertStringToShift(value: string | shift): shift {
  if(value === "TARDE") {
    return shift.TARDE
  }
  return shift.MANHA
}