import React, {Component} from './React'
import AppChild from './AppChild'

const Header = ({name}) => (
  <header>{name}</header>
)

class App extends Component {
  componentWillMount() {
    // console.log('componentWillMount')
    this.state = {
      a: 1
    }
  }
  // componentDidMount() {
  //   console.log('componentDidMount')
  // }
  // componentWillUpdate() {
  //   console.log('componentWillUpdate')
  // }
  // componentDidUpdate() {
  //   console.log('componentDidUpdate')
  // }
  handleOnClick() {
    this.setState(state => {
      return {
        a: ++state.a
      }
    })
  }
  render() {
    return <div className="c-hearder" id="11" style="color: red" htmlFor="123">
      {/* <Header name={this.state.a}/>
      <AppChild /> */}
      文字
      <button onClick={this.handleOnClick.bind(this)}>{this.state.a}</button>
      {this.state.a > 2 ? <div>1</div> : <div>123</div>}
    </div>
  }
}

export default App