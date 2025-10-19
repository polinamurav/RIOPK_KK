import { DirSignerDto } from './printing-form-signers';

export class PrintingFormDto {
  id: string;
  code: string;
  nameRu: string;
  nameAm: string;
  nameEn: string;
  printingFormSignersListDto: DirSignerDto[];
}
