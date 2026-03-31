import { ScenarioStates } from "../types"

export abstract class Scenario {
  protected role: string
  protected tone: string

  constructor(role: string, tone: string) {
    this.role = role
    this.tone = tone
  }

  abstract getSystemPrompt(state: ScenarioStates): string
}