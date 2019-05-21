/**
 * @description {比对现有的虚拟Dom和现有的真实Dom, 好处是不需要保存上一次的虚拟Dom, 并且可以随时更新真实Dom}
 * @param {vnode} 修改的虚拟DOM
 * @param {HTMLELement} 上一次转化后的真实DOM
 * @return {HTMLELement} 修改后的真实DOM
 */

const isSameNodeType = function (vnode, dom) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return dom.nodeType === 3;
  }

  if (typeof vnode.tag === 'string') {
    return dom.nodeName.toLowerCase() === vnode.tag.toLowerCase();
  }
}

const diffTextNode = function (vnode, dom) {
  if (dom && dom.nodeType === 3) { // 如果原来文本节点
    if (dom.textContent !== vnode) {
      dom.textContent = vnode
    }
  } else { // 如果原来不是文本节点
    const text = document.createTextNode(vnode)
    dom.parentNode.replaceChild(text, dom) // 替换掉原来的DOM
    return text
  }

  return dom
}

const diffElementNode = function (vnode, dom) {
  const childNodes = [...Array.from(dom.childNodes)] // 转化类数组为数组
  const tagName = dom.tagName.toLowerCase()

  if (vnode.tag === tagName) {
    diffAttribute(vnode.attrs, dom)
    if (vnode.children) {
      diffChildren(dom, vnode.children)
    }
  } else if (!dom || vnode.tag.toLowerCase() !== tagName) {
    const tag = document.createElement(vnode.tag)
    const fragement = document.createDocumentFragment()

    childNodes.map(fragement.appendChild) // 将原来所有的子节点移入文档碎片
    tag.appendChild(fragement)

    if (dom.parentNode) {
      dom.parentNode.replaceChild(tag, dom)
    }
    return tag
  }

  return dom
}

const diffAttribute = function (attrs = {}, dom) { // attrs是修改后的, Dom是修改前的
  const attributes = Array.from(dom.attributes)
  attributes.forEach(attr => {
    let key = attr.name
    if (key === 'class') key = 'className'
    if (key === 'for') key = 'htmlFor'
    if (!attrs[key]) { // 删除没有设置的属性
      dom.setAttribute(attr.name, '')
    }
  })
  Object.keys(attrs).forEach(key => { // 现在有属性, 则对比之前的DOM
    const value = attrs[key]
    if (key === 'className') key = 'class'
    if (key === 'htmlFor') key = 'for'
    const domAttr = dom.getAttribute(key)
    console.log(value)
    console.log(key)
    console.log(dom)
    if (!/^on\w+/.test(key) && ((domAttr && domAttr !== value) || !domAttr)) { // 如果有该属性, 但是值却不一样, 或者没有该属性, 则设置该属性
      dom.setAttribute(key, value)
    }
  })
}

const diffChildren = function (dom, vChildren) {
  const domChildren = dom.childNodes
  let keys = {} // 区分有key和没有key的DOM
  let nokeysArray = []

  domChildren.forEach(domC => {
    if (typeof domC === 'object' && domC.nodeType === 1 && domC.getAttribute('key')) {
      keys[domC.getAttribute('key')] = domC
    } else {
      nokeysArray.push(domC)
    }
  })

  if (vChildren && vChildren.length) {
    let min = 0
    let childrenLen = vChildren.length
    for (let i = 0; i < childrenLen; i++) {
      let child = null
      let vChild = vChildren[i]
      const key = (vChild.attrs || {}).key
      if (keys[key]) { // 拿到key所对应的的虚拟DOM
        child = keys[key]
        keys[key] = null
      } else {
        for (let j = min; j < nokeysArray.length; j++) { // 没有key的情况下 优先寻找相同TagName的DOM类型
          let c = nokeysArray[j]
          if (c && isSameNodeType(vChild, c)) {
            child = c
            nokeysArray[j] = null

            if (j === childrenLen - 1) childrenLen--
            if (j === min) min++
            break
          }
        }
      }
      child = diff(vChild, child)
    }
  }
}


const diffMap = { // 策略模式
  string: diffTextNode,
  number: diffTextNode,
  object: diffElementNode
}

const diff = function (vnode, dom) {
  const type = typeof vnode
  return diffMap[type](vnode, dom) // 使用策略模式分发不同情况下的diff算法
}

export default diff