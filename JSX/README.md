# React--Jsx

### JSX定义
```
  1. JSX经过babel编译后会变成React.createElement()
  2. JSX里可以书写表达式
  3. JSX在输出Null undefined false true的时候默认为空, 但是会显示0
  4. JSX已经经过加密不会造成Xss攻击
  5. JSX开头是大写的
  6. JSX经过react-dom渲染后会变成真实DOM
```

### 所需的环境

插件|作用 | 用法
--- | --- | ---
transform-react-jsx | 转化JSX | ["transform-react-jsx", {"pragma": "React.createElement"}], 会将JSX返回成React.createElement

### transform-react-jsx转换
```
  将JSX转换成React.createElement(tag, attrs, child1, child2, ...)
```