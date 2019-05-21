const createElement = function(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

export { createElement }
