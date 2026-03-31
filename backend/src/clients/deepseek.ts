import dotenv from 'dotenv'
import OpenAI from "openai"
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources'

dotenv.config()

export class DeepseekClient {
	private client: OpenAI

	constructor() {
		this.client = new OpenAI({
			baseURL: 'https://openrouter.ai/api/v1',
			apiKey: process.env.DEEPSEEK_KEY
		})
	}

	public async completion(messages: ChatCompletionMessageParam[]): Promise<ChatCompletion & { _request_id?: string | null | undefined } | undefined> {
		try {
			const response = await this.client.chat.completions.create({
				messages,
				model: "deepseek/deepseek-chat",
				temperature: 0.7,
				max_tokens: 100
			})
			console.log('Connected to deepseek!')
			return response
		} catch (error) {
			console.error('Error connecting to deepseek:', error)
		}
	}
}
