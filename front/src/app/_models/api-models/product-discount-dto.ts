//  Скидки по продукту
export class ProductDiscountDto {
  active: boolean; // Запись активна
  bwDiscount: number; // Льгота по годовой ставке по проекту B@W
  changedByUsername: string; // Кем изменено
  corp_tariff_id: string; // Сегмент корпоративной компании (А, В или С, если компания в списке справочника корп канала, XXX - если компания не содержится в списке)
  created: string; // Создано
  id: number; // Идентификатор
  isAgentInsuranceChosen: boolean; // Признак того, выбрано ли агентское страхование
  peopleOfActionDiscount: number; // Скидка по годовой ставке для людей дела (по справочнику кор канала)
  product: string; // Id продукта
  rateAddServiceDiscountAgentInsurance: number; // Скидка по годовой ставке в случае агентского страхования
  rateAddServiceDiscountInsuranceAccident: number; // Скидка по годовой ставке в случае страховки
  rateBossDiscount: number; // Скидка по годовой ставке для руководителя корп канала
  rateDsaMaxDiscount: number; // Скидка по годовой ставке DSA
  rateSalaryDiscount: number; // Скидка по годовой ставке для зарплатника
  rateTariffDiscount: number; // Скидка по годовой ставке для корп канала
  specialOfferDiscount: number; // Скидка по спецпредложению для врачей/педагогов
  updated: string; // Обновлено
}
