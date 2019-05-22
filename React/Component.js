import stateQueue from '../SetState'

class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }
  setState(stateChange) {
    // renderComponent(this)
    stateQueue(stateChange, this)
  }
}

export default Component