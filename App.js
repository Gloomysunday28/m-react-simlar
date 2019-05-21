import React, {Component} from './React'

class App extends Component {
  componentWillMount() {
    console.log('componentWillMount')
    this.state = {
      a: 1
    }
    
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  handleOnClick() {
    this.setState(state => {
      return {
        a: ++state.a
      }
    })
  }
  render() {
    return <button onClick={this.handleOnClick.bind(this)}>{this.state.a}</button>
  }
}

export default App