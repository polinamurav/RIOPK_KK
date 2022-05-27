export interface TabState<T, U> {
  isVisible: boolean;
  isReadonly: boolean;
  tabDataNamesList?: T[];
  tabDirectoriesNamesList?: U[];
}

export interface TabsStatesList<T, U> {
  [tabName: string]: TabState<T, U>;
}

export interface TabsStatesListForStage<T, U> {
  [tabStage: string]: { [tabName: string]: TabState<T, U> };
}
