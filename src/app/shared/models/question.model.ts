import { RiskEnum } from "../enums";

export interface IQuestion {
  questionId: number,
  question: string,
  risk: RiskEnum
  isMandatory: Boolean
  carType: string
}
