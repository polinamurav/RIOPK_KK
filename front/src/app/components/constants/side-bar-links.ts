import { FULL_FORM_TITLES, FullFormGroupKeys } from '../tabs/data-form/constants/data-form-config';

import { SidebarLink } from '@app/_models';

export const SIDE_BAR_LINKS: SidebarLink[] = [
  { name: FULL_FORM_TITLES[FullFormGroupKeys.CreditInfo], link: FullFormGroupKeys.CreditInfo },
  { name: FULL_FORM_TITLES[FullFormGroupKeys.AdditionalConditions], link: FullFormGroupKeys.AdditionalConditions },
  { name: FULL_FORM_TITLES[FullFormGroupKeys.ApplicantInfo], link: FullFormGroupKeys.ApplicantInfo },
  { name: FULL_FORM_TITLES[FullFormGroupKeys.RegAddress], link: FullFormGroupKeys.RegAddress },
  { name: FULL_FORM_TITLES[FullFormGroupKeys.FactAddress], link: FullFormGroupKeys.FactAddress }
];
