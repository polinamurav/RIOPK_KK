import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeValTransform'
})
export class CodeValTransformPipe<T> implements PipeTransform {
  transform(code: string, obj: T): string {
    return obj[code];
  }
}
