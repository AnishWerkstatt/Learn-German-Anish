import { ScenarioFactory } from '../scenarios/ScenarioFactory'
import { Clients, Message, ScenarioStates } from '../types'
import { TranslationService } from './TranslationService'

export class ConversationService {
  private clients: Clients
  private translationService: TranslationService

  constructor(clients: Clients) {
    this.clients = clients
    this.translationService = new TranslationService(clients)
  }

  public async converse(scenario: string, messages: Message[]) {
    const { text } = await this.conversationText(scenario, messages)
    const audioFilePath = await this.clients.gTTS.convertTextToAudio(text)
    const translation = await this.translationService.translateToEnglish(text)
    return { text, translation, audioFilePath }
  }

  private conversationText = async (scenario: string, messages: Message[]) => {
    const scenarioInstance = ScenarioFactory.createScenario(scenario)
    const isConversationNew = messages.length === 0
    const state = isConversationNew ? ScenarioStates.START : ScenarioStates.CONTINUE

    const systemPrompt = scenarioInstance.getSystemPrompt(state)
    const systemMessage: Message = { role: 'system', content: systemPrompt }

    const defaultUserMessage: Message = { role: 'user', content: 'Hallo!' }
    const conversationMessages = isConversationNew
      ? [systemMessage, defaultUserMessage]
      : [systemMessage, ...messages]

    try {
      const generatedText = await this.clients.gemini.completion(conversationMessages)
      return { text: generatedText }
    } catch (error) {
      throw new Error('Failed to generate response')
    }
  }
}