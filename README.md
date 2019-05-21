# React基本功能模拟

- [React对象](https://github.com/Gloomysunday28/m-react-simlar/blob/master/React/index.js)
- [Component的实现](https://github.com/Gloomysunday28/m-react-simlar/blob/master/React/Component.js)

- [ReactDOM](https://github.com/Gloomysunday28/m-react-simlar/blob/master/ReactDOM/index.js)
- [render](https://github.com/Gloomysunday28/m-react-simlar/blob/master/ReactDOM/render.js)



## 任务列表
- [x] JSX和虚拟DOM :wink:
- [x] 生命周期和render :wink:
- [ ] diff算法 :cry:
- [ ] 异步的setState :cry:

## JSX loader解析
类型 | 解析
:---:| :---:
文本 | 文本
JSX  | {tag: tagName, attrs: {}, children:[]}
组件(无状态) | function() {return {tag: tagName, attrs: {}, children:[]}}
组件 | function() {return {render() {return {tag: tagName, attrs: {}, children:[]}}}}

## JS API
Api | 说明
:---: | :---:
attributes | 获取DOM所有的属性
replaceChild | 参数(newNode, oldNode), 用newNode替换oldNode,oldNode子节点会全部消失
toLowerCase | 转化成小写
textContent | 获取文本节点的值 和 修改文本节点的值