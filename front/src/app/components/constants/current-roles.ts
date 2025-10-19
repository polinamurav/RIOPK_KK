import { CredentialsService } from '@app/services/authentication';

export const CURRENT_ROLES: Record<string, boolean> = {
  isAdmin: false,
  isAdminIT: false,
  isCreditManager: false,
  isCallCenter: false,
  isVerifier: false,
  isAuditor: false,
  isCreditManagerBoss: false,
  isCallCenterBoss: false,
  isDecisionMaker: false,
  isRiskManager: false,
  isRiskManagerBoss: false,
  isBusinessOwner: false,
  isURPA: false,
  isSalesDep: false,
  isDSA: false,
  isDSABoss: false,
  isVideoBank: false,
  isVideoBankBoss: false,
  isDecisionMakerBoss: false,
  isVerifierBoss: false,
  isArchivist: false,
  isRegManagerPos: false,
  isSupportPos: false,
  isHeadPos: false
};

export function setRoles(listOfRoles: Record<string, boolean>, service: CredentialsService): void {
  Object.keys(listOfRoles).forEach((key: string) => {
    listOfRoles[key] = service[key];
  });
}
