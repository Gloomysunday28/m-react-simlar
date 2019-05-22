import {renderComponent} from '../ReactDOM/render'

const queue = [] // 存放setState的队列
const renderComponentQueue = []

const flush = () => { // 清除队列, 并且渲染组件
  let states
  while (states = queue.shift()) {
    const {state, component} = states
    if (!component.prevState) {
      component.prevState = Object.assign({}, component.state)
    }

    state = typeof state === 'function' ? state(component.prevState, component.props) : state
    if (typeof state !== 'object') return new Error('setState return is not a object')
    
    component.state = Object.assign({}, component.state, state)
    component.prevState = component.state
  }

  let render
  while (render = renderComponentQueue.shift()) {
    renderComponent(render)
  }
}

const defer = function(fn) { // 牵扯到宏任务和微任务的执行顺序, 详情看EventLoop
  return Promise.resolve().then(fn)
}

// flush()

const stateQueue = function(state, component) {
  if (queue.length === 0) {
    defer(flush) // 利用Promise then方法是属于miscroTask, 只有整个宏任务结束后才会执行
  }

  queue.push({
    state,
    component
  })

  if (!renderComponentQueue.find(item => item.component === component)) {
    renderComponentQueue.push(component)
  }
}

export default stateQueue
