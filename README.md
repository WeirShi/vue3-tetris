# Vue3 + Vite 做的俄罗斯方块游戏

----
本项目来源于[俄罗斯方块](https://github.com/Binaryify/vue-tetris), 原作者用的是Vue2，目前Vue3已经正式发布，因此在原作者的项目基础上重构为`Vue3` + `Vite` + `Vuex4.0`构建的项目

戳：[https://static.weirshi.com/vue3-tetris/dist/](https://static.weirshi.com/vue3-tetris/dist/) 玩一玩！

----


内部结构与内容基本与原先一致，除了改写了`Vue3`的语法外，`Vuex`的语法也是使用了`Composition API`，以及去掉了音乐的`Web Audio API`使用

### Vue3中用到的API
基础API：`setup`, `onMounted`, `onBeforeMount`, `watch`, `computed`, `ref`, `reactive`, `toRefs`


### 核心原理

1. 游戏面板：10 * 20 二维数组的数据结构，每个空格填满时值为1，反之为0

2. 每种形状的定义及数据结构
```js
export const blockShape = {
  I: [[1, 1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]]
}
```

3. 形状左右移动的操作以及碰壁的判定
  - 移动操作源代码： 详见[/src/control/todo](https://github.com/WeirShi/vue3-tetris/tree/main/src/control/todo)中的`left.js`、`right.js`、`down.js`
  - 碰壁的判定源代码：详见[/src/utils/index.js](https://github.com/WeirShi/vue3-tetris/blob/main/src/utils/index.js)中的`want`函数方法

4. 下落速度的处理：通过使用setTimeout的定时器的时间来控制下落的快慢

5. 对按钮同时绑定`touch`和`mouse`事件，并对事件进行保存，当触发`touch`事件时不会触发`mouse`事件，`mouse`事件当中监听了`mouseout`事件来模拟`mousedown`    
源代码：[/src/components/keyboard/index.vue](https://github.com/WeirShi/vue3-tetris/blob/main/src/components/keyboard/index.vue)

### 开发中遇到的问题
- matrix组件中修改为`template`渲染，原作者项目在`vue`中使用了`jsx`语法，相较于`jsx`语法，`template`模板渲染时，需要手动判断`render`的时机。   
- 在做一些动画的时候，将嵌套的回调函数重构为了`async/await`语法机制调用，简单了代码维护的力度 

