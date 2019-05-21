import render from './render'

const ReactDOM = {
  render(virtual, container) {
    container.innerHTML = ''
    return render(virtual, container)
  }
}

export default ReactDOM