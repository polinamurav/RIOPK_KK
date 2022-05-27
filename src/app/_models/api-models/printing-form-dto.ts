import { DirSignerDto } from './printing-form-signers';

export class PrintingFormDto {
  id: string;
  nameRu: string;
  nameGe: string;
  nameEn: string;
  printingFormSignersListDto: DirSignerDto[];
}
