import { transportationType } from "../entities/enums/transportationType"

export function convertStringToTransportationType(value: string | transportationType): transportationType {
  if(value === "IDA_E_VOLTA") {
    return transportationType.IDA_E_VOLTA
  }
  if(value === "IDA") {
    return transportationType.IDA
  }
  if(value === "VOLTA") {
    return transportationType.VOLTA
  }
  return transportationType.IDA_E_VOLTA
}