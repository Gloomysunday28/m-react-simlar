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

const diffTextNode = function (vnode, dom) { // 比对文本节点
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

const diffElementNode = function (vnode, dom) { // 比对Element
  let out = dom
  const childNodes = [...Array.from(dom.childNodes)] // 转化类数组为数组
  const tagName = dom.tagName.toLowerCase()
  if (typeof vnode.tag === 'function') {
    return
  }
  if (vnode.tag === tagName) {
    diffAttribute(vnode.attrs, dom)
  } else if (!dom || vnode.tag.toLowerCase() !== tagName) {
    const tag = document.createElement(vnode.tag)
    const fragement = document.createDocumentFragment()

    childNodes.map(fragement.appendChild) // 将原来所有的子节点移入文档碎片
    tag.appendChild(fragement)

    if (dom.parentNode) {
      dom.parentNode.replaceChild(tag, dom)
    }
    out = tag
  }

  if (vnode.children) {
    diffChildren(dom, vnode.children)
  }

  return out
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
  Object.keys(attrs || {}).forEach(key => { // 现在有属性, 则对比之前的DOM
    const value = attrs[key]
    if (key === 'className') key = 'class'
    if (key === 'htmlFor') key = 'for'
    const domAttr = dom.getAttribute(key)
    if (!/^on\w+/.test(key) && ((domAttr && domAttr !== value) || !domAttr)) { // 如果有该属性, 但是值却不一样, 或者没有该属性, 则设置该属性
      dom.setAttribute(key, value)
    }
  })
}

const diffChildren = function (dom, vChildren) { // 比对子节点
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
          if (c && isSameNodeType(vChild, c)) { // 因为是同级比较
            child = c
            nokeysArray[j] = null

            if (j === childrenLen - 1) childrenLen--
            if (j === min) min++
            break
          }
        }
      }
      child = diff(vChild, child)

      const originDOM = domChildren[i]
      if (child && child !== dom && child !== originDOM) {
        if (!originDOM) { // 如果没有originDOM, child却是存在的, 说明修改后的DOM长度是大于修改前的, 转化后的DOM child不等于dom, 也不等于相同位置的子节点, child是新增的
          dom.appendChild(child)
        } else if (child === originDOM.nextSibling) { // 如果转化后的Child 和 之前的相同位置的DOM的下一个节点相同, 说明之前的那个节点被删除了
          dom.removeChild(originDOM)
        } else { // 如果没有以上两种情况, child又不等于相同位置的DOM, 那么将节点插入相同位置的前面
          dom.insertBefore(child, originDOM)
        }
      }
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
  if (Array.isArray(vnode)) {
    vnode.forEach(vn => {
      const type = typeof vn
      console.log(dom)
      diffMap[type](vn, dom)
    })
  } else {
    return diffMap[type](vnode, dom) // 使用策略模式分发不同情况下的diff算法
  }
}

export default diff