import { FULL_FORM_TITLES, FullFormGroupKeys } from '../tabs/data-form/constants/data-form-config';

import { SidebarLink } from '@app/_models';

export const SIDE_BAR_LINKS: SidebarLink[] = [
  { name: FULL_FORM_TITLES[FullFormGroupKeys.CreditInfo], link: FullFormGroupKeys.CreditInfo },
  { name: FULL_FORM_TITLES[FullFormGroupKeys.ApplicantInfo], link: FullFormGroupKeys.ApplicantInfo },
  { name: FULL_FORM_TITLES[FullFormGroupKeys.BirthdayPlace], link: FullFormGroupKeys.BirthdayPlace },
  { name: FULL_FORM_TITLES[FullFormGroupKeys.RegistrationAddress], link: FullFormGroupKeys.RegistrationAddress },
  { name: FULL_FORM_TITLES[FullFormGroupKeys.FactAddress], link: FullFormGroupKeys.FactAddress }
];

export const MASS_SIDE_BAR_LINKS: SidebarLink[] = [
  { name: 'FullForm.CreditInfo', link: 'credit-info' },
  { name: 'FullForm.ApplicantInfo', link: 'applicant-info' },
  { name: 'FullForm.Document', link: 'document' },
  { name: 'FullForm.ContactInfo', link: 'contact-info' },
  { name: 'FullForm.ActivityInfo', link: 'activity-info' },
  { name: 'FullForm.CreditDetails', link: 'credit-details' },
  { name: 'FullForm.Guarantee', link: 'guarantee' }
];
