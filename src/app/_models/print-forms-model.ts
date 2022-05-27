import { PrintingFormSignerDto } from './api-models/printing-form-signers';

export interface IPrintForm {
  id: string;
  name: string;
}

export interface PrintFormModalEmit {
  form: IPrintForm;
  signer: PrintingFormSignerDto;
}
