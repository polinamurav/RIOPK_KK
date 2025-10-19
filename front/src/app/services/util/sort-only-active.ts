import { BaseDir } from '@app/_models';

export function getOnlyActiveItems<T extends Partial<BaseDir>>(data: T[]) {
  return data && data.length ? data.filter(el => el.active) : [];
}
