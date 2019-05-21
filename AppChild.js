import React, {Component} from './React'

class AppChild extends Component {
  componentWillMount() {
    // console.log('componentWillMount, child')
    this.state = {
      b: 100
    }
  }
  // componentDidMount() {
  //   console.log('componentDidMount, child')
  // }
  // componentWillUpdate() {
  //   console.log('componentWillUpdate, child')
  // }
  // componentDidUpdate() {
  //   console.log('componentDidUpdate, child')
  // }
  handleOnClick() {
    this.setState(state => {
      return {
        b: ++state.b
      }
    })
  }
  render() {
    return <div>
      <button onClick={this.handleOnClick.bind(this)}>{this.state.b}</button>
    </div>
  }
}

export default AppChild