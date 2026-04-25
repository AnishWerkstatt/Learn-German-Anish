import { GeminiClient } from '../clients/gemini'
import { GTTSClient } from '../clients/gTTS'
import { Clients } from '../types'

export async function createResources(): Promise<Clients> {

  const geminiClient = new GeminiClient()
  const gttsClient = new GTTSClient()

  return {
    gemini: geminiClient,
    gTTS: gttsClient
  }
}