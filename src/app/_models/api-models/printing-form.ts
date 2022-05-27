export interface IByteArrayResource {
  byteArray: string;
  description: string;
  file: IFile;
  filename: string;
  inputStream: any; // InputStream
  open: boolean;
  readable: boolean;
  uri: URI;
  url: URL;
}
// TODO исправить any
export interface IFile {
  absolute: boolean;
  absoluteFile: any;
  absolutePath: string;
  canonicalFile: any;
  canonicalPath: string;
  directory: boolean;
  file: boolean;
  freeSpace: number;
  hidden: boolean;
  name: string;
  parent: string;
  parentFile: any;
  path: string;
  totalSpace: number;
  usableSpace: number;
}

// export interface InputStream {}

export interface URI {
  absolute: boolean;
  authority: string;
  fragment: string;
  host: string;
  opaque: boolean;
  path: string;
  port: number;
  query: string;
  rawAuthority: string;
  rawFragment: string;
  rawPath: string;
  rawQuery: string;
  rawSchemeSpecificPart: string;
  rawUserInfo: string;
  scheme: string;
  schemeSpecificPart: string;
  userInfo: string;
}

export interface URL {
  authority: string;
  content: any;
  defaultPort: number;
  file: string;
  host: string;
  path: string;
  port: number;
  protocol: string;
  query: string;
  ref: string;
  userInfo: string;
}

export interface PrintingForm {
  attachment: string;
  created: string;
  id: string;
  name: string;
  updated: string;
}

export interface IResponseEntity {
  body: any;
  statusCode: any;
  statusCodeValue: number;
}
