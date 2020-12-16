import API from '../../services/api'
import { showMessage } from '../../components'

export class Environment {
  constructor() {
    this.api = new API()
    this.showMessage = showMessage
  }

  setup = token => {
    this.api.setup(token)
  }
}
