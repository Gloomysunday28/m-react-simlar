import { Component } from "../React";

const render = function (virtual, container) { // 只做appendChild操作
  return container.appendChild(_render(virtual))
}

const _render = function(virtual) { // 用来处理各种转化真实DOM
  if (typeof virtual === 'number') virtual = String(virtual)
  if (typeof virtual === 'string') {
    const virtualStr = document.createTextNode(virtual)
    return virtualStr
  }
  if (typeof virtual.tag === 'function') {
    let component = createComponent(virtual.tag, virtual.attrs)
    setComponentProps(component, virtual.attrs)
    return component.base
  } else {
    virtual = (typeof virtual.tag === 'object' ?  virtual.tag : virtual) // 判断组件还是原生DOM
  }
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
  return inst
}

function setComponentProps(component, props) { // 设置props
  if (!component.base) {
    if (component.comopnentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps( props )
  }
 
  component.props = props

  renderComponent(component)
}

function renderComponent(component) {
  let base = null // 是否进行过第一次的渲染
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }
  base = _render(component.render()) // 转化后的真实DOM

  if (!component.base) component.componentDidMount && component.componentDidMount()
  else component.componentDidUpdate && component.componentDidUpdate()

  if ( component.base && component.base.parentNode ) {
    component.base.parentNode.replaceChild( base, component.base ) // setState或者更改props的时候触发
  }

  component.base = base
}

export {renderComponent}

export default render