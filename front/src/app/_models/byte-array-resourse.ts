import { File } from './file';
import { InputStream } from './input-stream';
import { URI } from './api-models/printing-form';
import { URLDto } from './url-dto';

export class ByteArrayResource {
  byteArray: string;
  description: string;
  file: File;
  filename: string;
  inputStream: InputStream;
  open: boolean;
  readable: boolean;
  uri: URI;
  url: URLDto;
}
