//��װһ�����õ��¼����߹��õķ���
/*����һ�������ռ�*/
window.itcast={};
//��װһ�����ɽ����¼�
itcast.transitionEnd=function(dom,callback){
    /*1.��˭���¼�
    * 2.�¼���������ʲôҵ��*/
    if(!dom||typeof dom!='object'){
        /*ûdom��ʱ����߲���һ�������ʱ�����ֹͣ*/
        return false;
    }
    dom.addEventListener('transitionEnd',function(){
        callback&&callback();/*��·��*/
    })
    dom.addEventListener('webkitTransitionEnd',function(){
        callback&&callback();
        //if(callback){
        //    callback();
        //}
    })
}