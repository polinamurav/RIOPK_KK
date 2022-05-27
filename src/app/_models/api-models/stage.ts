import { ChatbotStatus } from '..';

export class HistoryStage {
  chatbotStatus: ChatbotStatus;
  id: string;
  isProgbarVisible: boolean;
  isUserTask: boolean;
  name: string;
  orderNum: number;
}
