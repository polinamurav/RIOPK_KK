export interface PreapproveExecutionDto {
  server: string; //  Идентификатор сервера
  state: string; //  Состояние обработчика (id)
  stateName: string; //  Состояние обработчика (name)
  baseId?: number; //  База в обработке
  baseName?: string; // Название базы в обработке
}
