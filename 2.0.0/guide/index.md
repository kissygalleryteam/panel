## 综述

Panel是。

* 版本：2.0.0
* 作者：筱谷
* demo：[http://kg.kissyui.com/panel/2.0.0/demo/index.html](http://kg.kissyui.com/panel/2.0.0/demo/index.html)

## 初始化组件
		
    S.use('kg/panel/2.0.0/index', function (S, Panel) {
         var panel = new Panel(panelEl, {
            scrollMode: 'disappear', //'follow |'disappear' | 'fixed' Panel滑动方式，follow表示跟随页面滑动，disappear表示页面滑动时panel消失
            animate: true, //Panel出现时是否有动画
            display: 'reveal', //overlay' | 'reveal' | 'push' Panel出现模式，overlay表示浮层reveal表示在content下边展示，push表示panel将content推出
            position: 'right', //在右边或左边，注意初始样式一律只对齐左上角
            dismissible: true, //是否在内容区域点击后，panel消失
            swipeClose: true //在panel上滑动，panel是否关闭
        });
    })
	
