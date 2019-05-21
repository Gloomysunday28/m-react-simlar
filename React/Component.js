import {renderComponent} from '../ReactDOM/render'

class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }
  setState(stateChange) {
    stateChange = typeof stateChange === 'function' ? stateChange(this.state) : stateChange
    if (typeof stateChange !== 'object') return new Error('setState return is not a object')
    this.state = Object.assign({}, this.state, stateChange)
    renderComponent(this)
  }
}

export default Component