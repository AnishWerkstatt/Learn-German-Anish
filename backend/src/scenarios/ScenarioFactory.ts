import { SupermarketScenario } from './Supermarket'
import { RestaurantScenario } from './Restaurant'
import { TrainStationScenario } from './TrainStation'
import { Scenario } from './Scenario'

export class ScenarioFactory {
  static createScenario(scenario: string): Scenario {
    switch (scenario) {
      case 'supermarket':
        return new SupermarketScenario()
      case 'restaurant':
        return new RestaurantScenario()
      case 'train station':
        return new TrainStationScenario()
      default:
        throw new Error(`Scenario "${scenario}" not found.`)
    }
  }
}