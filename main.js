
var Main = function(){
  var dotsArr = [],
      dotsNum = 0,
      overNum = 0,
      maxDotsNum = 0,
      dotsDistance = 260,

      bg = document.getElementById('bg'),
      canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),

      width = parseInt(document.documentElement.clientWidth),
      height = parseInt(document.documentElement.clientHeight),
      area = width*height,
      cssText = 'width:'+width+'px; height:'+height+'px;';


    // bg.setAttribute('style','cssText');
    // canvas.setAttribute('style','cssText');
    canvas.width = (width * 2).toString();
    canvas.height = (height * 2).toString();

    dotsNum = parseInt(area/6000);
    maxDotsNum = dotsNum * 2;

    // var dot = new Dots();
    // console.log(dot);
    // console.log(dot.init());

    //生成点
    for(var i = 0; i<dotsNum; i++){
      var dot = new Dots();
      // console.log(dot);
      // console.log(dot.init());
      dotsArr.push(dot);
      dot.init(canvas);

    }
    //鼠标点击事件
    document.addEventListener('click',createDot);
    function createDot(e){
      var tx = e.pageX,
          ty = e.pageY;
        if((tx>0&&tx<width)&&(ty>0&&ty<height)){
          for(var i =0;i<5;i++){
            var dot = new Dots();
            dotsArr.push(dot);
            dotsNum += 1;
            dot.init(canvas, tx, ty);
          }
        }
    };
    //鼠标move事件
    document.addEventListener('mousemove',moveDot);
    function moveDot(e){
      var tx = e.pageX,
            ty = e.pageY;
        if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
            dot.mouseDot(tx, ty);
        }

    }

    //事件监听器
    var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
    requestAnimFrame(animateUpdate);

    function animateUpdate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(dotsNum > maxDotsNum){
        overNum = dotsNum - maxDotsNum;
      }
      for(var i = overNum;i<dotsNum;i++){
        dotsArr[i].update();
      }
      for(var i = overNum ; i<dotsNum;i++){
        for(var j = i+1;j<dotsNum;j++){
          var tx = dotsArr[i].x - dotsArr[j].x,
              ty = dotsArr[i].y - dotsArr[j].y,
              s = Math.sqrt(Math.pow(tx,2)+Math.pow(ty,2));
          if(s<dotsDistance){
            ctx.beginPath();
            ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
            ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
            ctx.strokeStyle = 'rgba(255,255,255,'+(dotsDistance-s)/dotsDistance+')';
            ctx.strokeWidth = 1;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
      requestAnimFrame(animateUpdate);
    }
}();
