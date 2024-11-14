import { RiskEnum } from "@shared/enums";

export const sortByRisk = (questions:any) => {
  const riskPriority: { [key in RiskEnum]: number } = {
    [RiskEnum.L]: 1, // Risco Leve
    [RiskEnum.M]: 2, // Risco Moderado
    [RiskEnum.C]: 3, // Risco Crítico
    [RiskEnum.B]: 4, // Comportamental
    [RiskEnum.P]: 5  // Fotografia
  };

  return questions.sort((a,b) => riskPriority[a.risk] - riskPriority[b.risk])
}

