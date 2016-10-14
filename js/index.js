/**
 * Created by Administrator on 2016/10/14 0014.
 */
window.onload=function(){
    /*搜索*/
    search();
    /*轮播图*/
    banner();
    //倒计时
    dowmTime()
}

/*搜索*/
function search(){
    /*1.页面初始化的时候要求是透明的背景
    * 2.页面滑动的时候要求页面逐渐的加深（在一定范围内 轮播图的高度）onscroll
    * 3.页面滑动到一定的距离不需要做改变*/
    /*获取DOM元素*/
    /*搜索栏*/
    var search=document.querySelector('.jd_header_box');
    /*轮播图*/
    var banner=document.querySelector('.jd_banner');
    /*获取高度*/
    var height=banner.offsetHeight;
    /*监听页面滚动事件*/
    window.onscroll=function(){
        /*页面滚动的时候距离文档顶部的距离*/
        var top=document.body.scrollTop;
        /*拿到它的目的是 和伦轮播图的高度做比较*/
        /*不停的改变透明度*/
        var opcity=0;
        if(height>top){
            /*计算透明度*/
            opcity=0.85*(top/height);
        }else{
            opcity=0.85;
        }
        /*操作DOM元素*/
        search.style.background='rgba(201,21,35,'+opcity+')'
    }
}
/*轮播图*/
function banner(){
    /*
    * 1.自动轮播 定时器 无缝衔接 动画结束瞬间定位
    * 2.点需要随着轮播图的改变对应的点 改变当前样式 当前图片的索引
    * 3.手指滑动的时候让轮播图滑动 touch事件 记录坐标轴的改变 改变轮播图的定位（位移css3）
    * 4.当滑动距离不超过一定距离时 需要吸附回去 过渡的形式去做
    * 5.当滑动超过一定的距离 需要跳到下一张或者上一张（滑动的方向）滑动的距离（屏幕的三分之一）*/
    /*获取DOM元素*/
    /*轮播图大盒子*/
    var banner=document.querySelector('.jd_banner');
    /*图片的宽度*/
    var width=banner.offsetWidth;
//    图片盒子
    var imageBox=document.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox=document.querySelector('ul:last-child');
    /*所有的点*/
    var points=pointBox.querySelectorAll('li');
    /*公用方法加过渡*/
    var addTransition=function(){
        imageBox.style.transition='all 0.3s';
        imageBox.style.webkitTransition='all 0.3s';/*做兼容*/
    }
    /*清除过渡*/
    var removeTransirion=function(){
        imageBox.style.transition="none";
        imageBox.style.webkitTransition="none";
    }
//    定位
    var setTranslateX=function(translateX){
        imageBox.style.transform="translateX("+translateX+"px)";
        imageBox.style.webkitTransform="translateX("+translateX+"px)";
    }
    /*功能实现*/
    /*自动轮播 定时器 无缝衔接 动画结束瞬间定位*/
    var index=1;/*贯穿整个程序*/
    var timer=setInterval(function(){
        /*自动轮播到下一张*/
        index++;
        /*改变定位 动画的形式去改变 transition transform translate*/
        /*加过渡*/
        addTransition();
    //    定位
        setTranslateX(-index*width);
    },1000)
    /*过渡结束之后做无缝衔接*/
    itcast.transitionEnd(imageBox,function(){
        /*处理事件结束后的业务逻辑*/
        if(index>=9){
            index=1;
            /*清除过渡*/
            removeTransirion();
            /*定位过去*/
            setTranslateX(-index*width);
        }else if(index<=0){
            index=8;
            /*清除过渡*/
            removeTransirion();
            /*定位过去*/
            setTranslateX(-index*width);
        }
        /*点需要随着轮播图的滚动改变对应的点*/
        setPoint();
    })
       //改变当前样式 当前图片的索引
     var setPoint=function(){
     //    清除上一次的now
         for(var i=0;i<points.length;i++){
             points[i].className="";
         }
         /*给图片对应的点加上样式*/
         points[index-1].className="now";
     }
//    touch事件
    var startX=0;/*记录起始位置 刚刚触摸点的位置 x的坐标*/
    var moveX=0;/*滑动时候x轴的位置*/
    var distancX=0;/*滑动的距离*/
    var isMove=false;/*是否划过*/
    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);
        /*记录起始X*/
         startX= e.touches[0].clientX;
    })
    imageBox.addEventListener('touchmove',function(e){
        /*滑动的时候X*/
        moveX= e.touches[0].clientX;
        /*计算移动的距离*/
        distancX=moveX-startX;
        /*滑动清除过渡*/
        removeTransirion();
        setTranslateX(-index*width+distancX);
        /*证明滑动过*/
        isMove=true;
    })
    imageBox.addEventListener('touchend',function(e){
    //    滑动超过1/3
        /*2.滑动过*/
        if(isMove&&Math.abs(distancX)>width/3){
            /*当滑动超过一定距离时需要跳到下一张或者上一张*/
            if(distancX>0){
                index--;
            }else{
                index++;
            }
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width);
        }else{
            /*当滑动的距离不超过一定距离的时候需要吸附回去*/
            addTransition();
            setTranslateX(-index*width);
        }
        /*重置属性*/
        startX=0;/*记录起始位置 刚刚触摸点的位置 x的坐标*/
        moveX=0;/*滑动时候x轴的位置*/
        distancX=0;/*滑动的距离*/
        isMove=false;/*是否划过*/
        /*加定时器*/
    //   严禁在清除一次定时器
        clearInterval(timer);
        timer=setInterval(function(){
            /*自动轮播到下一张*/
            index++;
            addTransition();
            setTranslateX(-index*width);
        },1000)
    })
};
/*倒计时*/
function dowmTime(){
//需要倒计时的时间 每一秒钟来刷新事件dom的内容
    var time=40;
    var timer=null;
    /*获取dom元素*/
    var skTime=document.querySelector('.sk_time');
    /*所有的span*/
    var spans=skTime.querySelectorAll('span');
    timer=setInterval(function(){
        time--;
        if(time<0){
            clearInterval(timer);
            return false;
        }
    //    时间格式的转换
    //    h m s
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=time%60;
    //    改变dom的内容
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000)
}