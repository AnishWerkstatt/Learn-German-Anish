import { GeminiClient } from './clients/gemini'
import { GTTSClient } from './clients/gTTS'

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface Clients {
  gemini: GeminiClient
  gTTS: GTTSClient
}

export enum ScenarioStates {
  START = 'START_CONVERSATION',
  CONTINUE = 'CONTINUE_CONVERSATION'
}