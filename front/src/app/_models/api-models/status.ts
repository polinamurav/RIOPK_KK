import { SystemDirectory } from './system-directory';

export class HistoryStatus extends SystemDirectory {
  chatbotStatus: ChatbotStatus;
}

export class ChatbotStatus extends SystemDirectory {
  id: number;
  nameAm: string;
  nameEn: string;
  nameRu: string;
}
