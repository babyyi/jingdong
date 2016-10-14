//封装一个公用的事件或者公用的方法
/*定义一个命名空间*/
window.itcast={};
//封装一个过渡结束事件
itcast.transitionEnd=function(dom,callback){
    /*1.给谁加事件
    * 2.事件触发后处理什么业务*/
    if(!dom||typeof dom!='object'){
        /*没dom的时候或者不是一个对象的时候程序停止*/
        return false;
    }
    dom.addEventListener('transitionEnd',function(){
        callback&&callback();/*短路与*/
    })
    dom.addEventListener('webkitTransitionEnd',function(){
        callback&&callback();
        //if(callback){
        //    callback();
        //}
    })
}