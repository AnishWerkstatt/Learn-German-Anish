import { existsSync, mkdirSync } from 'fs'
// @ts-ignore
import gTTS from 'gtts'
import { join } from 'path'

export class GTTSClient {
  private language: string

  constructor(language: string = 'de') {
    this.language = language
  }

  public async convertTextToAudio(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const gtts = new gTTS(text, this.language)
      const audioDir = join(__dirname, 'audio') // Use a valid directory path
      const audioFilePath = join(audioDir, `${Date.now()}.mp3`) // Unique file name

      // Create the audio directory if it doesn't exist
      if (!existsSync(audioDir)) {
        mkdirSync(audioDir, { recursive: true })
      }

      gtts.save(audioFilePath, (err: any) => {
        if (err) {
          console.error('Error converting text to audio:', err)
          reject(err)
        } else {
          console.log('Audio file saved:', audioFilePath)
          resolve(audioFilePath)
        }
      })
    })
  }
}