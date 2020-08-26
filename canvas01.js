
const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';
// 使用d3-hierarchy库来将数据转化成图形信息
(async function () {
  const data = await (await fetch(dataSource)).json();

  const regions = d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value);

  const pack = d3.pack()
    .size([1600, 1600])
    .padding(3);

  const root = pack(regions);
  // 绘制
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const TAU = 2 * Math.PI;
  const res = [];

  function draw(ctx, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
    const children = node.children;
    const {x, y, r} = node;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    if(children) {
      for(let i = 0; i < children.length; i++) {
        draw(ctx, children[i]);
      }
    } else {
      const name = node.data.name;
      ctx.fillStyle = textColor;
      ctx.font = '1.5rem Arial';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, y);
    }
  }

  draw(context, root);

  //-----作业 01 绘制三角形 五角形 椭圆形
  const canvas2 = document.querySelector('#hw1');
  const context2 = canvas2.getContext('2d');
  context2.beginPath();
  context2.moveTo(100,100);
  context2.lineTo(150,200);
  context2.lineTo(50,200);
  context2.fill();
  EllipseTwo(context2, 400,400,150,100);
  context2.beginPath();
  context2.moveTo(800,200);
  context2.lineTo(1000,200);
  context2.lineTo(810,350);
  context2.lineTo(900,100);
  context2.lineTo(990,350);
  context2.fill();
  function EllipseTwo(context, x, y, a, b) {
    context.save();
    var r = (a > b) ? a : b;
    var ratioX = a / r;
    var ratioY = b / r;
    context.scale(ratioX, ratioY);
    context.beginPath();
    context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
    context.closePath();
    context.restore();
    context.fill();
  }
  // 移动鼠标改变圆形颜色
  document.addEventListener ('mousemove', showMousePosition, false); 
  function showMousePosition(e) {
    const mx = e.clientX * 2; // 乘以2是应为画布尺寸和css尺寸的比例
    const my = e.clientY * 2;
    reDrawCircle(context, mx, my, root)
  }
  function clearCircle(context, x, y,r) {
    context.save();
    context.fillStyle = "rgba(255,255,255,255)";
    context.beginPath();
    context.arc(x, y, r, 0, TAU);
    context.fill();
    context.restore();
  };
  function inCircle(mx, my, node) {
    const { x, y, r } = node;
    return (my - y) * (my - y) + (mx - x) * (mx - x) < r * r;
  }
  function reDrawCircle(ctx, mx, my, node) {
    const children = node.children;
    if (!children || children.length === 0) {
      const { x, y, r } = node;
      if (inCircle(mx,my,node)) {
          clearCircle(ctx, x, y, r);
          ctx.fillStyle = "rgba(255,0,0,0.2)";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, TAU);
          ctx.fill();
          const name = node.data.name;
          ctx.fillStyle = "white";
          ctx.font = "1.5rem Arial";
          ctx.textAlign = "center";
          ctx.fillText(name, x, y);
      }
    } else {
      for (let i = 0; i < children.length; i++) {
        if (inCircle(mx,my,children[i])) {
          reDrawCircle(ctx, mx, my, children[i]);
          break;
        }
      }
    }
  }

}());

