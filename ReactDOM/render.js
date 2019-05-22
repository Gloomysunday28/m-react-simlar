import { Component } from "../React";
import diff from '../Diff/Diff'

const render = function (virtual, container) { // 只做appendChild操作
  let renderDOM = _render(virtual)
  if (renderDOM) {
    if (Array.isArray(renderDOM)) {
    } else {
      container.appendChild(renderDOM)
    }
  }
  return container
}

const _render = function(virtual) { // 用来处理各种转化真实DOM
  if (!virtual) virtual = ''
  if (typeof virtual === 'number') virtual = String(virtual)
  if (typeof virtual === 'string') {
    const virtualStr = document.createTextNode(virtual)
    return virtualStr
  }
  if (typeof virtual.tag === 'function') {
    let component = createComponent(virtual.tag, virtual.attrs)
    setComponentProps(component, virtual.attrs) // props是在state之前赋值的
    return component.base // base为挂载的DOM
  } else {
    virtual = (typeof virtual.tag === 'object' ?  virtual.tag : virtual) // 判断组件还是原生DOM
  }
  if (Array.isArray(virtual)) {
    return virtual.map(vn => {
      return renderElement(vn)
    })
  } else {
    return renderElement(virtual)
  }
}

function renderElement(virtual) {
  const dom = document.createElement(virtual.tag)
  const fragement = document.createDocumentFragment() // 优化性能
  if (virtual.attrs) {
    const attrs = virtual.attrs
    Object.keys(attrs).forEach(key => {
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }

  if (virtual.children) {
    virtual.children.forEach(child => dom.appendChild(render(child, fragement)))
  }

  return dom
}

const setAttribute = function(dom, key, value) { // 设置属性
  if (key === 'className') key = 'class'
  if (key === 'htmlFor') key = 'for'
  if (/^on\w+/ig.test(key)) {
    const event = key.toLowerCase()
    dom[event] = value
  } else if (key === 'style') {
    if (typeof value === 'string') {
      dom.style.cssText = value
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      const styleObject = value
      Object.keys(styleObject).forEach(val => {
        let style = styleObject[val]
        if (typeof style === 'number') style = style + 'px'
        dom.style[val] = style
      })
    }
  } else {
    dom.setAttribute(key, value)
  }
}

function createComponent(component, props) { // 创建非JSX的class 或者 无状态组件
  let inst
  if (component.prototype && component.prototype.render) {
    inst = new component(props)
  } else {
    inst = new Component(props)
    inst.constructor = component
    inst.render = function() {
      return this.constructor(props)
    }
  }
  return inst // 为什么不返回render出来的JSX呢, 因为每次修改后都需要重新渲染, 也就是重新执行render函数
}

function setComponentProps(component, props) { // 设置props
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props)
  }
 
  component.props = props

  renderComponent(component)
}

function renderComponent(component) {
  let base = null // 是否进行过第一次的渲染
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }
  if (component.base) {
    base = diff(component.render(), component.base) // 进行同级DOM对比, 因为很少出现跨级DOM更改
  } else {
    base = _render(component.render()) // 转化后的真实DOM, 子组件的props也会跟着state的值更改掉, 因为里面又重新执行了子组件的setComponentProps
  }
  if (!component.base) component.componentDidMount && component.componentDidMount()
  else component.componentDidUpdate && component.componentDidUpdate()

  // if ( component.base && component.base.parentNode ) {
  //   component.base.parentNode.replaceChild( base, component.base ) // setState或者更改props的时候触发
  // }
  component.base = base
  base._component = component
}

export {renderComponent}

export default render
