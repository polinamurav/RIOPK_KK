import { SystemDirectory } from './system-directory';

export class HistoryStatus extends SystemDirectory {
  chatbotStatus: ChatbotStatus;
}

export class ChatbotStatus extends SystemDirectory {
  nameGe: string;
  nameEn: string;
}
