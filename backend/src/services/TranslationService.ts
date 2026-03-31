// src/services/TranslationService.ts
import { ChatCompletionMessageParam } from 'openai/resources'
import { Clients } from '../types'

export class TranslationService {
  private clients: Clients

  constructor(clients: Clients) {
    this.clients = clients
  }

  public async translateToEnglish(germanText: string): Promise<string> {
    const systemPrompt = "You are a German to English translator. Translate the following German text to English. Only respond with the English translation, nothing else."
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: germanText }
    ]

    try {
      const response = await this.clients.deepseek.completion(messages)
      return response?.choices[0]?.message?.content || ''
    } catch (error) {
      console.error('Error translating text:', error)
      throw new Error('Failed to translate text')
    }
  }
}