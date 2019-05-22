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
cssText | 添加字符串style到行内样式
attributes | 获取DOM所有的属性
replaceChild | 参数(newNode, oldNode), 用newNode替换oldNode,oldNode子节点会全部消失
toLowerCase | 转化成小写
textContent | 获取文本节点的值 和 修改文本节点的值
removeChild | 参数(node), 删除节点
insertBefore | 参数(newNode, oldNode), 将newNode插在oldNode前面

## Diff算法
> Diff算法的两种比较
>> - 保存上次的虚拟DOM, 然后对比修改后的虚拟DOM, 对比后生成真实DOM
>> - 将修改后的DOM直接与真实DOM对比, 实时更改真实DOM

> 两种方法谁更好?
>> 目前第二种方法效率是更高的

> 逻辑
>> - 总共分为三种对比节点: 文本节点, 标签节点, 组件
>>> - 文本节点:
```
  1. 如果新的节点是文本节点, 而旧的节点不是文本节点, 那么创建一个文本节点填充内容后替换掉真实原来的DOM
  2. 如果新的节点和旧的节点同时为文本节点, 内容不同, 那么更新旧节点的内容
```
>>> - 标签节点
```
  1. 如果新的标签名和旧的标签名是不同的, 那么创建新的标签, 并且取出旧节点的所有子节点添加到自己下面, 同时替换掉原来的旧节点
  2. 如果新的标签名和旧的标签名是一样, 那么对比两者属性:
    1.新标签的属性存在, 旧标签属性不存在, 添加新标签属性
    2.新标签的属性不存在, 旧标签属性存在, 删除旧标签属性
    3.如果新标签属性和旧标签属性相同, 内容不同, 修改旧标签属性的属性值
  3. 对比子节点
    1. 子节点分为有key值和没有key值的, 区分两者
    2. 具备key属性的进行对比
      1. 新节点有key, 旧节点没有key, 则添加新节点
      2. 新节点没有key, 旧节点有key, 则删除旧节点
    3. 不具备key属性的进行对比
      优先取相同的TagName的节点进行对比, 进行Diff算法后生成真实DOM
    4. 重新生成的DOM与原子节点的集合相对应下标的值进行对比
      1. 如果新DOM不等于原子节点对应下标的DOM相同, 并且原有对应下标的DOM不存在, 那么说明新DOM是新添加的, 则appendChild
      2. 如果新DOM与原子节点对应下标的相邻的下一个节点相同的话, 那么说明该DOM已被删除, 则删除原有的DOM
      3. 
```
