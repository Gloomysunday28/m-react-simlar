import {createComponent, setComponentProps} from '../ReactDOM/render'

const diffComponent = function(vnode, dom) {
  let c = dom && dom._component
  let out = dom

  if (c && c.constructor === vnode.tag) { //如果原来的Component是存在的, 但是修改后的虚拟DOM不是指向
    setComponentProps(c, vnode.attrs) // 重新初始化组件
    dom = c.base
  } else { // 如果两个组件不相同, 先注销之前的组件, 再渲染现在的组件
    if (c) {
      unmountComponent(c)
    }

    c = createComponent(vnode.tag, vnode.attrs)
    setComponentProps(c, vnode.attrs)
    
    out = c.base
  }
  return out 
}

const unmountComponent = comp => {
  if (component.componentWillUnmount) component.componentWillUnmount()
  comp.base.parentNode.removeChild(comp.base)
}

export {diffComponent}