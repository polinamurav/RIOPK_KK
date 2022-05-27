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
  nameGe: string;
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
  signerNameGe: string;
  signerNameRu: string;
  signerPositionGe: string;
  signerPositionRu: string;
  principal: boolean;
  principalStr: string;

  constructor(signer: SignerDto) {
    this.id = signer.id || null;
    this.signerNameGe = signer.nameGe || null;
    this.signerNameRu = signer.nameRu || null;
    this.signerPositionGe = signer.positionGe || null;
    this.signerPositionRu = signer.positionRu || null;
    this.principal = signer.principal || null;
    this.principalStr = signer.principal ? '*' : '' || null;
  }
}
