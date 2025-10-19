export class UploadOptions {
  file: File;
  id?: string | number;
  userId?: number;
}

export class TransformedUploadOptions {
  file: FormData;
  userId: number;
}

export function transformOptions<T>(opt: T): FormData {
  const formData = new FormData();

  Object.keys(opt).forEach(key => {
    formData.append(key, opt[key]);
  });

  return formData;
}
