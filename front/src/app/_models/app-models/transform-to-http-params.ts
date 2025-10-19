export class TransformToHttpParams {
  [key: string]: string;

  constructor(params: {}) {
    if (params) {
      Object.keys(params).forEach(key => {
        const element = params[key];
        if (element !== null && element !== undefined) {
          if (Array.isArray(element)) {
            this[key] = element.join(',');
          } else {
            this[key] = element.toString();
          }
        }
      });
    }
  }
}
