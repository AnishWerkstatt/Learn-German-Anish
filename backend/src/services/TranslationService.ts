import { Clients, Message } from '../types'

export class TranslationService {
  private clients: Clients

  constructor(clients: Clients) {
    this.clients = clients
  }

  public async translateToEnglish(germanText: string): Promise<string> {
    const messages: Message[] = [
      { role: 'system', content: 'You are a German to English translator. Translate the following German text to English. Only respond with the English translation, nothing else.' },
      { role: 'user', content: germanText }
    ]

    try {
      const translation = await this.clients.gemini.completion(messages)
      return translation || ''
    } catch (error) {
      console.error('Error translating text:', error)
      throw new Error('Failed to translate text')
    }
  }
}