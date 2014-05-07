KISSY.add(function(S, Node, UA){

// scrollMode: {String} 'follow |'disappear' | 'fixed' Panel滑动方式，follow表示跟随页面滑动，disappear表示页面滑动时panel消失
// animate: {Boolean} True | false Panel出现时是否有动画
// display: {String} overlay' | 'reveal' | 'push' Panel出现模式，overlay表示浮层reveal表示在content下边展示，push表示panel将content推出
// position: {String} 'left' | 'right' 在右边或左边
// dismissible: {Boolean} True | false 是否在内容区域点击后，panel消失
//// swipeClose: {Boolean} True | false  在panel上滑动，panel是否关闭
//// offset: {Object} 相对于contentWrap的offset   

    var $ = Node.all,
        CSS_PREFIX = UA.webkit ? "-webkit-" : UA.moz ? "-moz-" : UA.ie ? "-ms-" : "",
        DEFAULT_CONFIG = {
            scrollMode: 'disappear',
            animate: true,
            display: 'reveal',
            position: 'right',
            dismissible: true,
            swipeClose: true
        },
        MODULE_CLASS = "ksm-g-panel",
        MODULE_PARENT_CLASS = "ksm-g-panel-parent"
        MODULE_ACTIVE_CLASS = "ksm-g-panel-active"

    function Panel(el, config) {
        var self = this;
        self.config = S.merge(DEFAULT_CONFIG, config);
        self.el = $(el);
        self.parentNode = self.el.parent();
        self.init();
    }

    Panel.prototype = {
        init: function() {
            var self = this;
            self.initStyle();
            self.setScroll();
            self.setDismissible();
            self.addClasses();
        },
        setScroll: function() {
            var self = this;
            switch(self.config.scrollMode) {
                case 'follow':
                    self._scrollFollow();
                    break;
                case 'disappear':
                    self._scrollDisapper();
                    break;
                case 'fixed':
                    self._scrollFixed();
            }
        },
        _scrollFollow: function() {
            var self = this;
            // 什么也不做

        },
        _scrollFixed: function() {
            var self = this;
            if(self.parentNode[0].nodeName == "BODY") {        
                self.el.css({
                    position: "fixed",
                    top: 0,
                    left: 0
                });  
            }
            else {

            }
        },
        _scrollDisapper: function() {
            var self = this,
                _el = self.parentNode[0].nodeName == "BODY" ? $(window) : self.parentNode;
                handler = function() {
                    self.hide();
                };
            self.el.on("show", function() {
                _el.on('scroll mousewheel', handler);
            });
            self.el.on("close", function() {
                _el.detach('scroll mousewheel', handler);
            });
            
        },
        show: function() {
            this.parentNode.addClass(MODULE_ACTIVE_CLASS);
            this.el.fire("show");
        },
        hide: function() {
            this.parentNode.removeClass(MODULE_ACTIVE_CLASS);
            this.el.fire("close");
        },
        close: function() {
            this.hide();
        },
        initStyle: function() {
            var self = this,
                isLeft = self.config.position == "left",
                isAnim = self.config.animate,
                sideWidth = self.el.width(),
                contentWidth = self.parentNode.width(),
                _posValue = ";",
                _css = ";",
                _parentCSS = ";",
                _activePosValue = ";",
                _activeParentPosValue = ";",
                _styleStr = ";",
                _activeCSS = ";",
                _activeParentCSS = ";",
                _absoluteStr = ";";
            // 为了达到 reveal 效果，需要将 side 移动到 content 的后面，1. z-index 2. dom
            
            _absoluteStr = "position:absolute;top:0;left:0;";

            _posValue = "translateX(" + (isLeft ? (-sideWidth) : (contentWidth)) + "px);";
            _activePosValue = "translateX(" + (isLeft ? (-sideWidth) : (contentWidth)) + "px);";

            switch(self.config.display) {
                case "overlay" :
                    _activePosValue = "translateX(" + (isLeft ? (0) : (contentWidth - sideWidth)) + "px);";
                    break;
                case "reveal" :
                    _posValue = "translateX(" + (isLeft ? (0) : (contentWidth - sideWidth)) + "px);";
                    _activeParentPosValue = "translateX(" + (isLeft ? (sideWidth) : (-sideWidth)) + "px);";
                    break;
                case "push" : 
                    _activeParentPosValue = "translateX(" + (isLeft ? (sideWidth) : (-sideWidth)) + "px);";
                    break;
                default : 
                    break;
            }

            _activeParentCSS = "." + MODULE_ACTIVE_CLASS + "{" +
                    CSS_PREFIX + "transform:" + _activeParentPosValue +
                "}"
            _activeCSS = "." + MODULE_ACTIVE_CLASS + " ." + MODULE_CLASS + "{" + 
                    CSS_PREFIX + "transform:" + _activePosValue + 
                "}";

            _css = "." + MODULE_CLASS + "{" + 
                    CSS_PREFIX + "transform:" + _posValue + 
                    (isAnim ? (CSS_PREFIX + "transition:" + CSS_PREFIX + "transform 200ms ease 0s;") : "") +
                    _absoluteStr + 
                "}";

            _parentCSS = "." + MODULE_PARENT_CLASS + "{" + 
                    (isAnim ? (CSS_PREFIX + "transition:" + CSS_PREFIX + "transform 200ms ease 0s;") : "") +
                "}";

            _styleStr = "<style>";
            _styleStr += _css;
            _styleStr += _parentCSS;
            _styleStr += _activeCSS;
            _styleStr += _activeParentCSS;
            _styleStr += "</style>";

            // console.log(_styleStr);

            $(_styleStr).appendTo('head');
        },
        setDismissible: function() {
            var self = this;
            if(!self.config.dismissible) return;
            var body = $('body'),
                handler = function(ev) {
                var currEl = $(ev.target);
                if(currEl.hasClass(MODULE_CLASS) || currEl.parent(MODULE_CLASS)) return;
                self.hide();
            }
            self.el.on("show", function() {
                body.on('touchstart click', handler);
            });
            self.el.on("close", function() {
                body.detach('touchstart click', handler);
            });
            
        },
        addClasses: function() {
            var self = this;
            self.el.hide();
            self.el.addClass(MODULE_CLASS);
            self.parentNode.addClass(MODULE_PARENT_CLASS);
            setTimeout(function(){
                self.el.show();
            }, 0);
        }

    }

    return Panel;
 
}, {
    requires: ["node", "ua"]
});