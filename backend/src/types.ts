import { DeepseekClient } from "./clients/deepseek"
import { GTTSClient } from "./clients/gTTS"

export interface Clients {
  deepseek: DeepseekClient
  gTTS: GTTSClient
}

export enum ScenarioStates {
  START = 'START_CONVERSATION',
  CONTINUE = 'CONTINUE_CONVERSATION'
}