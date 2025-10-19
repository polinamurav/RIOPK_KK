export interface YesOrNoType {
  id: number;
  value: boolean;
  nameAm: string;
  nameRu: string;
}

export const YES_NO_TYPES: YesOrNoType[] = [
  // {
  //   id: null,
  //   value: null,
  //   nameAm: 'Не выбрано',
  //   nameRu: 'Не выбрано'
  // },
  {
    id: 1,
    value: true,
    nameAm: 'Այո՛',
    nameRu: 'Да'
  },
  {
    id: 2,
    value: false,
    nameAm: 'Ոչ',
    nameRu: 'Нет'
  }
];
