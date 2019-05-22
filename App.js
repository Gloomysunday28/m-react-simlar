import React, {Component} from './React'
import AppChild from './AppChild'

const Header = ({name}) => {
  console.log(name)
  return (
  <header>{name}</header>
  )
}

class App extends Component {
  componentWillMount() {
    // console.log('componentWillMount')
    this.state = {
      a: 1,
      text: '文字3',
      array: [{text: 1}]
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
        a: ++state.a,
        text: '文字2',
        array: [...state.array, {text: 1}]
      }
    })
  }
  render() {
    return <div className="c-hearder" id="11" style="color: red;" htmlFor="123">
      {/* <Header name={this.state.a}/> */}
      {/* {this.state.a > 2 ? <Header name={this.state.a}/> : <AppChild />} */}
      <AppChild name={this.state.a}/>
      {/* {this.state.a > 2 && this.state.text} */}
      <button onClick={this.handleOnClick.bind(this)}>{this.state.a}</button>
      {/* {this.state.a > 2 ? <div>1</div> : <div>123</div>} */}
      {/* {this.state.array.map(_ => <div>{_.text}</div>)} */}
      {/* <div key="child">{this.state.a}</div> */}
    </div>
  }
}

export default App