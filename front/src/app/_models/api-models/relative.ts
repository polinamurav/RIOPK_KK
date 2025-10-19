import { Applicant } from './applicant';
import { Directory } from './directory';

export class Relative {
  applicant: Applicant;
  contactNumber: string;
  created: string;
  dirFamilyRelationship: Directory;
  fio: string;
  id: number;
  updated: string;
}

export class RelativeDto {
  applicant_id: number;
  contactNumber: string;
  dir_family_relationship_id: number;
  fio: string;
  id: number;
}

export class RelativeListDto {
  relatives: RelativeDto[];
}
