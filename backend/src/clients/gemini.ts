import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Message } from '../types'

dotenv.config()

export class GeminiClient {
  private genAI: GoogleGenerativeAI

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  }

  public async completion(messages: Message[]): Promise<string> {
    try {
      const systemMessage = messages.find(m => m.role === 'system')
      const conversationMessages = messages.filter(m => m.role !== 'system')

      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: systemMessage?.content || '',
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.7,
        }
      })

      // All messages except the last one form the history
      const history = conversationMessages.slice(0, -1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))

      const chat = model.startChat({ history })

      const lastMessage = conversationMessages[conversationMessages.length - 1]
      const result = await chat.sendMessage(lastMessage?.content || 'Hallo!')

      console.log('Connected to Gemini!')
      return result.response.text()
    } catch (error) {
      console.error('Error connecting to Gemini:', error)
      return ''
    }
  }
}
