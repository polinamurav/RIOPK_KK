import { BaseDir } from './directory';

export class Segment extends BaseDir {
  id: string;
  isAsanEmployment: boolean;
  isCreditHistory: boolean;
  limitNonCollateral: number;
  limitSegment: number;
  maxAge: number;
  minAge: number;
  minIncome: number;
  minScore: number;
  minWorkTerm: number;
  priority: number;
}
