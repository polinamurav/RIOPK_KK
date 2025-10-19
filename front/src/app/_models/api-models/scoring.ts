export class ScoringResponseDto {
  applicationId: number;
  code: string;
  created: string;
  id: number;
  params: string;
  reasonCode: string;
  updated: string;
}

// export class ScoringResponse {
//   applicationId: number;
//   created: string;
//   id: number;
//   scorcard1Score: number;
//   scorcard2Score: number;
//   updated: string;
// }

export class ScoringResponse {
  applicationId: number;
  brms2ResponseId: number;
  brms3ResponseId: number;
  brms4ResponseId: number;
  brms5ResponseId: number;
  created: Date | string;
  id: number;
  probabilityOfDefault: number;
  score: number;
  scoringType: number;
  updated: Date | string;
  scoringFactors: ScoringFactor[];
  scoringAttributes: ScoringAttribute[];
}

export class ScoringFactor {
  id: number;
  factorName: string;
  factorNumber: number;
  categoryName: number;
  categoryNumber: number;
  scoreFactor: number;
}

export class ScoringAttribute {
  id: number;
  attributeName: string;
  attributeValue: number;
}

export interface BrmsScoringDto {
  pd: number;
  nameAm: string;
  nameEn: string;
  nameRu: string;
  score: number;
  riskGrade: string;
  scoreCharacteristics: BrmsScoreCharacteristicDto[];
}

export interface BrmsScoreCharacteristicDto {
  index?: number;
  binAm: string;
  binEn: string;
  binRu: string;
  characteristicAm: string;
  characteristicEn: string;
  characteristicRu: string;
  partialScore: number;
}
