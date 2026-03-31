import { DeepseekClient } from "./clients/deepseek"
import { GTTSClient } from "./clients/gTTS"
import { PollyClient } from "./clients/pollyClient"

export interface Clients {
  deepseek: DeepseekClient
  polly?: PollyClient
  gTTS: GTTSClient
}

export enum ScenarioStates {
  START = 'START_CONVERSATION',
  CONTINUE = 'CONTINUE_CONVERSATION'
}