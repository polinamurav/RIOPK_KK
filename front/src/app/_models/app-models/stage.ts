export enum StageType {
  FULL_FORM = 'FULL_FORM',
  MILITARY_CHECK = 'MILITARY_CHECK',
  MANUAL_CHECKS = 'MANUAL_CHECKS',
  MANUAL_CHECKS_RETURN = 'MANUAL_CHECKS_RETURN',
  FULL_FORM_RETURN = 'FULL_FORM_RETURN',
  ENTER_PERS_DATA = 'ENTER_PERS_DATA',
  VERIFICATION = 'VERIFICATION',
  RM = 'RM',
  RM_RETURN = 'RM_RETURN',
  VERIFICATION_RETURN = 'VERIFICATION_RETURN',
  DECISION_MAKING = 'DECISION_MAKING',
  DECISION_FINAL = 'DECISION_FINAL',
  DECISION_FINAL_RETURN = 'DECISION_FINAL_RETURN',
  PAPERWORK = 'PAPERWORK',
  PAPERWORK_RETURN = 'PAPERWORK_RETURN',
  ACCEPTANCE = 'ACCEPTANCE',
  BUSINESS_INSPECTION = 'BUSINESS_INSPECTION',
  OTP = 'ENTER_OTP',
  COMPLETED = 'COMPLETED'
}

export enum STAGE_STATUSES {
  ERROR = 'ERROR',
  DECLINE = 'DECLINE'
}

export enum PathForStage {
  SHORT_FORM = 'full-form',
  FULL_FORM = 'full-form',
  FULL_FORM_RETURN = 'full-form',
  VERIFICATION = 'verification',
  VERIFICATION_RETURN = 'verification',
  DECISION_MAKING = 'decision-making',
  DECISION_FINAL = 'decision-final',
  DECISION_FINAL_RETURN = 'decision-final',
  PAPERWORK = 'paperwork',
  PAPERWORK_RETURN = 'paperwork',
  ACCEPTANCE = 'acceptance',
  RM = 'rm',
  COMPLETED = 'COMPLETED',
  COMPLETED_DECLINE = 'COMPLETED_DECLINE',
  INTEGR_ACRA_EXTERNAL_CH = 'INTEGR_ACRA_EXTERNAL_CH',
  VIEW = 'view',
  INSPECTION = 'inspection',
  BUSINESS_INSPECTION = 'inspection',
  MANUAL_CHECKS = 'manual-checks' // todo: change to borrower
}

export enum ProcessStageTabs {
  SHORT_FORM = 'fullForm',
  FULL_FORM = 'fullForm',
  FULL_FORM_RETURN = 'fullForm',
  VERIFICATION = 'verification',
  VERIFICATION_RETURN = 'verification',
  RM = 'decisionMaking',
  DECISION_FINAL = 'finalDecision',
  DECISION_FINAL_RETURN = 'finalDecision-final',
  PAPERWORK = 'paperwork',
  PAPERWORK_RETURN = 'paperwork',
  ACCEPTANCE = 'acceptance',
  COMPLETED = 'COMPLETED',
  COMPLETED_DECLINE = 'COMPLETED_DECLINE',
  INTEGR_ACRA_EXTERNAL_CH = 'INTEGR_ACRA_EXTERNAL_CH',
  VIEW = 'view',
  INSPECTION = 'inspection',
  BUSINESS_INSPECTION = 'inspection',
  MANUAL_CHECKS = 'borrower' // todo: change to borrower
}

export const STAGES_PATH: { [key: string]: PathForStage } = {
  [StageType.MANUAL_CHECKS]: PathForStage.MANUAL_CHECKS,
  [StageType.FULL_FORM]: PathForStage.FULL_FORM,
  [StageType.COMPLETED]: PathForStage.FULL_FORM, // временно

  [StageType.RM]: PathForStage.DECISION_MAKING, // todo: change when exist

  [StageType.FULL_FORM_RETURN]: PathForStage.FULL_FORM,
  [StageType.VERIFICATION]: PathForStage.VERIFICATION,
  [StageType.VERIFICATION_RETURN]: PathForStage.VERIFICATION,
  [StageType.DECISION_MAKING]: PathForStage.DECISION_MAKING,
  [StageType.DECISION_FINAL]: PathForStage.DECISION_FINAL,
  [StageType.DECISION_FINAL_RETURN]: PathForStage.DECISION_FINAL,
  [StageType.PAPERWORK]: PathForStage.PAPERWORK,
  [StageType.PAPERWORK_RETURN]: PathForStage.PAPERWORK,
  [StageType.ACCEPTANCE]: PathForStage.ACCEPTANCE,
  [StageType.BUSINESS_INSPECTION]: PathForStage.INSPECTION
};
