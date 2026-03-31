import dotenv from 'dotenv'
import { PollyClient as Client, SynthesizeSpeechCommand, VoiceId } from '@aws-sdk/client-polly'
import { writeFileSync } from 'fs'

dotenv.config()

export class PollyClient {
  private client: Client

  constructor() {
    this.client = new Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })
  }

  public async convertTextToAudio(text: string, voiceId: string = 'Hans'): Promise<string> {
    const audioFilePath = `./audio/${Date.now()}.mp3`

    try {
      const command = new SynthesizeSpeechCommand({
        OutputFormat: 'mp3',
        Text: text,
        VoiceId: voiceId as VoiceId,
        Engine: 'neural',
      })

      const response = await this.client.send(command)

      if (response.AudioStream) {
        const audioStream = await response.AudioStream.transformToByteArray()
        writeFileSync(audioFilePath, Buffer.from(audioStream))
        console.log('Audio file saved:', audioFilePath)
        return audioFilePath
      } else {
        throw new Error('No audio stream returned from Polly')
      }
    } catch (error) {
      console.error('Error converting text to audio:', error)
      throw error
    }
  }
}