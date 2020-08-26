# 可视化

## 图形基础

### 实现可视化的四种方式

   1. HTML+CSS
   2. SVG 和1差别不大，但是可以绘制矢量图形
   3. Canvas2D
   4. WebGL 是OpenGL ES规范在Web端的实现，利用了GPU的并行处理的特性，性能最强，在数据量大、视觉效果要求高的场景下是首选

#### HTML+CSS

1. 优点:
   1. 可以做一些简单的图标，简单而且不用引入库
   2. 可以帮助理解可视化
2. 缺点：
   1. 并不简洁，维护复杂
   2. 性能开销大
3. [代码示例](./html_css.html)

#### SVG

1. Scalable Vector Graphics 可缩放矢量图。
2. 是一种基于XMl语法的图像格式，可以内嵌svg标签，用DOM API操作svg元素，css也可以影响内嵌的svg元素。
3. [MDN-SVG教程](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)
4. 优点：
   1. 可以绘制不规则图形
   2. 图形和数据的对应更明显
5. 缺点：
   1. 需要解析、计算、渲染dom树
   2. 只能表示一种基本图形
   3. 大量svg会卡顿

#### Canvas2D

1. html+css和svg都属于声明式绘图系统，而Canvas2D是指令式绘制系统
2. canvas可以直接操作绘图上下文，所以绘图速度要比前两种快得多，但是无法方便的操作绘图局部
3. canvas可以和svg结合使用，先试用svg生成图形，然后用canvas来渲染

#### WebGL

1. 绘图功能更强大，但使用更复杂
2. 使用场景：
   1. 绘制的图形数量非常多
   2. 需要对较大图像的细节做像素处理（比如光影、流体效果
   3. 绘制3D图形
   4. ![可视化技术选型流程图](./可视化选型.jpg)

### 如何用Canvas绘制层次关系图

1. 先插入一个canvas标签，画布宽高为512

```html
<body>
 <canvas width="512" height="512"></canvas>
</body>
```

2. 通过css指定的宽高为样式宽高
3. 坐标系：原点是左上角，向右是x轴，向下是y轴（左手系坐标轴
4. 绘制几何图形
   1. 获取canvas元素

    ``` javascript
    const canvas = document.querySelector('canvas');
    ```

   2. getContext获取上下文对象
   ```const context = canvas.getContext('2d')```
   3. 大致分为两类api，一类是设置状态，一类是绘制指令
   4. 在画布中心绘制一个红色的正方形
      1. context.rect(左上角x，左上角y，宽，高)
      2. context.fillStyle = 'red' 来改变画笔颜色
      3. beginPath来开始绘制
      4. fill来结束绘制

      ```javascript
        const rectSize = [100, 100];
        context.fillStyle = 'red';
        context.beginPath();
        context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
        context.fill();
      ```

   5. 矩形不在中心，是英文rect方法的坐标是左上角，所以要么重新计算，要么translate
       1. 重新计算：
          ```context.rect(0.5 *(canvas.width - rectSize[0]), 0.5 * (canvas.height - rectSize[1]), ...rectSize);```
       2. translate
          ```context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);```
   6. translate之后要恢复，可以translate回来，也可以使用context.save和context.restore来恢复
   7. [Canvas MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
   8. [代码示例](./canvas00.html)
  5. 绘制层次关系图
     1. 先获得数据源
     2. 然后将数据源转化为图形信息（通过d3-hierarchy库
     3. 使用arc来画圆，五个参数：（圆心x坐标，圆心y坐标，半径r，起始角度，结束角度）
     4. 递归遍历
  6. Canvas缺点：
     1. 很难抽取canvas中的图形对象进行操作
  7. [代码示例](./canvas01.html)

### 如何用SVG绘制可视化图表

### 如何用WebGL 绘制最简单的几何图形
