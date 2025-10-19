export function getId<T>(obj: any): T {
  return obj && obj.id ? obj.id : null;
}
