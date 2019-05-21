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
组件 | function() {return {tag: tagName, attrs: {}, children:[]}}