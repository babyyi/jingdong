/**
 * Created by Administrator on 2016/10/14 0014.
 */
window.onload=function(){
    /*����*/
    search();
    /*�ֲ�ͼ*/
    banner();
    //����ʱ
    dowmTime()
}

/*����*/
function search(){
    /*1.ҳ���ʼ����ʱ��Ҫ����͸���ı���
    * 2.ҳ�滬����ʱ��Ҫ��ҳ���𽥵ļ����һ����Χ�� �ֲ�ͼ�ĸ߶ȣ�onscroll
    * 3.ҳ�滬����һ���ľ��벻��Ҫ���ı�*/
    /*��ȡDOMԪ��*/
    /*������*/
    var search=document.querySelector('.jd_header_box');
    /*�ֲ�ͼ*/
    var banner=document.querySelector('.jd_banner');
    /*��ȡ�߶�*/
    var height=banner.offsetHeight;
    /*����ҳ������¼�*/
    window.onscroll=function(){
        /*ҳ�������ʱ������ĵ������ľ���*/
        var top=document.body.scrollTop;
        /*�õ�����Ŀ���� �����ֲ�ͼ�ĸ߶����Ƚ�*/
        /*��ͣ�ĸı�͸����*/
        var opcity=0;
        if(height>top){
            /*����͸����*/
            opcity=0.85*(top/height);
        }else{
            opcity=0.85;
        }
        /*����DOMԪ��*/
        search.style.background='rgba(201,21,35,'+opcity+')'
    }
}
/*�ֲ�ͼ*/
function banner(){
    /*
    * 1.�Զ��ֲ� ��ʱ�� �޷��ν� ��������˲�䶨λ
    * 2.����Ҫ�����ֲ�ͼ�ĸı��Ӧ�ĵ� �ı䵱ǰ��ʽ ��ǰͼƬ������
    * 3.��ָ������ʱ�����ֲ�ͼ���� touch�¼� ��¼������ĸı� �ı��ֲ�ͼ�Ķ�λ��λ��css3��
    * 4.���������벻����һ������ʱ ��Ҫ������ȥ ���ɵ���ʽȥ��
    * 5.����������һ���ľ��� ��Ҫ������һ�Ż�����һ�ţ������ķ��򣩻����ľ��루��Ļ������֮һ��*/
    /*��ȡDOMԪ��*/
    /*�ֲ�ͼ�����*/
    var banner=document.querySelector('.jd_banner');
    /*ͼƬ�Ŀ��*/
    var width=banner.offsetWidth;
//    ͼƬ����
    var imageBox=document.querySelector('ul:first-child');
    /*�����*/
    var pointBox=document.querySelector('ul:last-child');
    /*���еĵ�*/
    var points=pointBox.querySelectorAll('li');
    /*���÷����ӹ���*/
    var addTransition=function(){
        imageBox.style.transition='all 0.3s';
        imageBox.style.webkitTransition='all 0.3s';/*������*/
    }
    /*�������*/
    var removeTransirion=function(){
        imageBox.style.transition="none";
        imageBox.style.webkitTransition="none";
    }
//    ��λ
    var setTranslateX=function(translateX){
        imageBox.style.transform="translateX("+translateX+"px)";
        imageBox.style.webkitTransform="translateX("+translateX+"px)";
    }
    /*����ʵ��*/
    /*�Զ��ֲ� ��ʱ�� �޷��ν� ��������˲�䶨λ*/
    var index=1;/*�ᴩ��������*/
    var timer=setInterval(function(){
        /*�Զ��ֲ�����һ��*/
        index++;
        /*�ı䶨λ ��������ʽȥ�ı� transition transform translate*/
        /*�ӹ���*/
        addTransition();
    //    ��λ
        setTranslateX(-index*width);
    },1000)
    /*���ɽ���֮�����޷��ν�*/
    itcast.transitionEnd(imageBox,function(){
        /*�����¼��������ҵ���߼�*/
        if(index>=9){
            index=1;
            /*�������*/
            removeTransirion();
            /*��λ��ȥ*/
            setTranslateX(-index*width);
        }else if(index<=0){
            index=8;
            /*�������*/
            removeTransirion();
            /*��λ��ȥ*/
            setTranslateX(-index*width);
        }
        /*����Ҫ�����ֲ�ͼ�Ĺ����ı��Ӧ�ĵ�*/
        setPoint();
    })
       //�ı䵱ǰ��ʽ ��ǰͼƬ������
     var setPoint=function(){
     //    �����һ�ε�now
         for(var i=0;i<points.length;i++){
             points[i].className="";
         }
         /*��ͼƬ��Ӧ�ĵ������ʽ*/
         points[index-1].className="now";
     }
//    touch�¼�
    var startX=0;/*��¼��ʼλ�� �ոմ������λ�� x������*/
    var moveX=0;/*����ʱ��x���λ��*/
    var distancX=0;/*�����ľ���*/
    var isMove=false;/*�Ƿ񻮹�*/
    imageBox.addEventListener('touchstart',function(e){
        /*�����ʱ��*/
        clearInterval(timer);
        /*��¼��ʼX*/
         startX= e.touches[0].clientX;
    })
    imageBox.addEventListener('touchmove',function(e){
        /*������ʱ��X*/
        moveX= e.touches[0].clientX;
        /*�����ƶ��ľ���*/
        distancX=moveX-startX;
        /*�����������*/
        removeTransirion();
        setTranslateX(-index*width+distancX);
        /*֤��������*/
        isMove=true;
    })
    imageBox.addEventListener('touchend',function(e){
    //    ��������1/3
        /*2.������*/
        if(isMove&&Math.abs(distancX)>width/3){
            /*����������һ������ʱ��Ҫ������һ�Ż�����һ��*/
            if(distancX>0){
                index--;
            }else{
                index++;
            }
            /*�ӹ���*/
            addTransition();
            /*��λ*/
            setTranslateX(-index*width);
        }else{
            /*�������ľ��벻����һ�������ʱ����Ҫ������ȥ*/
            addTransition();
            setTranslateX(-index*width);
        }
        /*��������*/
        startX=0;/*��¼��ʼλ�� �ոմ������λ�� x������*/
        moveX=0;/*����ʱ��x���λ��*/
        distancX=0;/*�����ľ���*/
        isMove=false;/*�Ƿ񻮹�*/
        /*�Ӷ�ʱ��*/
    //   �Ͻ������һ�ζ�ʱ��
        clearInterval(timer);
        timer=setInterval(function(){
            /*�Զ��ֲ�����һ��*/
            index++;
            addTransition();
            setTranslateX(-index*width);
        },1000)
    })
};
/*����ʱ*/
function dowmTime(){
//��Ҫ����ʱ��ʱ�� ÿһ������ˢ���¼�dom������
    var time=40;
    var timer=null;
    /*��ȡdomԪ��*/
    var skTime=document.querySelector('.sk_time');
    /*���е�span*/
    var spans=skTime.querySelectorAll('span');
    timer=setInterval(function(){
        time--;
        if(time<0){
            clearInterval(timer);
            return false;
        }
    //    ʱ���ʽ��ת��
    //    h m s
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=time%60;
    //    �ı�dom������
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000)
}