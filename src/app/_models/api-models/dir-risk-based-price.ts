import { Dir } from './directory';

export class DirRiskBasedPrice {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  id: number;
  maxScore: number;
  minScore: number;
  riskRate: number;
  tariff: Dir;
  updated: string | Date;
}
