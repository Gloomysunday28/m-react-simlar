/**
 * @params {vnode, dom}
 * @description {比对现有的虚拟Dom和现有的真实Dom, 好处是不需要保存上一次的虚拟Dom, 并且可以随时更新真实Dom}
 */

const diff = function(vnode, dom) {
  const childNodes = Array.from(dom.childNodes) // 转化类数组为数组
  console.log(childNodes)
  console.log(vnode)
  console.log(dom.tagName.toLocaleLowerCase())
  if (dom && dom.nodeType === 3) { // 文本节点
    if (dom.textContent === vnode.children[0]) return
    else {
      return dom.innerHTML = vnode.children[0]
    }
  }
  const tagName = dom.tagName.toLocaleLowerCase()
  if (vnode.tag === tagName) {
    diffAttribute(vnode.attrs, dom)
    if (vnode.children) {
      // vnode.children.forEach(v => diff(v, childNodes[]))
    }
  } else {
    const tag = document.createElement(vnode.tag)
    const fragement = document.createDocumentFragment()
    fragement.appendChild(...childNodes)
    tag.appendChild(fragement)
    if (dom.parentNode) {
      dom.parentNode.replaceChild(tag, dom)
    }
  }
}

const diffAttribute = function(attrs = {}, dom) { // attrs是修改后的, Dom是修改前的
  const attributes = Array.from(dom.attributes)
  attributes.forEach(attr => {
    if (!attrs[attr.name]) { // 删除没有设置的属性
      dom.setAttribute(attr.name, '')
    }
  })
  Object.keys(attrs).forEach(key => {  // 现在有属性, 则对比之前的DOM
    const value = attrs[key]
    if (key === 'className') key = 'class'
    if (key === 'htmlFor') key = 'for'
    const domAttr = dom.getAttribute(key)
    if ((domAttr && domAttr !== value) || !domAttr) { // 如果有该属性, 但是值却不一样, 或者没有该属性, 则设置该属性
      dom.setAttribute(key, value)
    }
  })
}

 export default diff