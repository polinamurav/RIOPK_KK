export class Signer {
  active: boolean;
  beginDate: string;
  created: string;
  createdBy: number;
  endDate: string;
  id: number;
  updated: string;
  updatedBy: number;
}

export class DirSignerDto extends Signer {
  code: string;
  dirBranchId: number;
  nameAm: string;
  nameRu: string;
  positionGe: string;
  positionRu: string;
  principal: boolean;
  printingFormId: number;
}

// TODO think about this type
type SignerDto = DirSignerDto;

export class PrintingFormSignerDto {
  id: number;
  signerNameAm: string;
  signerNameRu: string;
  signerPositionGe: string;
  signerPositionRu: string;
  principal: boolean;
  principalStr: string;

  constructor(signer: SignerDto) {
    this.id = signer.id || null;
    this.signerNameAm = signer.nameAm || null;
    this.signerNameRu = signer.nameRu || null;
    this.signerPositionGe = signer.positionGe || null;
    this.signerPositionRu = signer.positionRu || null;
    this.principal = signer.principal || null;
    this.principalStr = signer.principal ? '*' : '' || null;
  }
}
