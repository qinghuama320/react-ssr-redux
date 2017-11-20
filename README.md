### Description

It is a simple demo with React-router, Redux and React server side rendering.

本示例展示了redux传递数据给路由的用法。dispatch同步和异步action两种情形下，服务端和客户端的状态同步。

同步示例使用redux-syn，异步示例使用redux-asyn。激活不同模式需改文件名为asyn，并重新build。

编程技巧
1、只能在render之前的生命周期函数中执行服务端操作，因为服务端的生命周期没有didMount等；反之可以在didMount及以后的生命周期函数中执行仅希望对客户端有效的操作
2、willMount中写的异步请求，若不处理，前后端都会执行，会造成2倍的服务器压力。一般用webpack  DefinePlugin分别处理。
3、有异步操作的状态同步，需要等异步操作结束后，再renderString返回。并且服务端fetch数据必须是静态方法，因为React组件尚未实例化。
4、fetch在服务端，必须全url，不能用相对路径
5、redux 操作比较复杂，action、reducer、connect、mapStateToProps、mapDispatchToProps都必须写全，否则组件取不到Provider的store
6、渲染完成后，此后在前端操作中引起的路由变化，不会再调用服务器渲染。页面所需的数据也由客户端自己获取。
7、服务端必须为每个链接分别分配stroe状态管理器，否则会造成数据串扰！！

### Usage
```
npm install
npm start
```
Open http://localhost:3001. 

