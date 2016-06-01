(function($){

    $.jjSlideNav = function(element, options){

        var options = $.extend({}, $.jjSlideNav.defaults, options);
        // 첫번째 인자값이 {} 빈 객체이므로 defaults 객체의 멤버와 opts(사용자정의 옵션값)이 merge되어 options에 담겨진다.

        var self = this;
        var $el = $(element);
        var elementId = '#'+$el.attr("id");
        var bodyH = $(document).height();

        init();

        // event
        $('body').on('click', 'a[href="'+ elementId +'"]', function(e){

            var direction = $el.attr("data-slide-positon") || 'left';

            switch(direction){
                case 'left' :
                    if($el.hasClass(options.activeLeftClass)){
                        self.close();
                    } else {
                        self.openLeft();
                    }
                    break;
                case 'right' :
                    if($el.hasClass(options.activeRightClass)){
                        self.close();
                    } else {
                        self.openRight();
                    }
                    break;
            }

            e.preventDefault();
        });


        $('body').on('click', '.'+options.screenBg, function(e){
            self.close();
            e.preventDefault();
        });

        self.close = function(){

            $('.'+options.screenBg).hide();
            $el.removeClass(options.activeLeftClass);
            $el.removeClass(options.activeRightClass);
            console.log("close");
        };

        self.openLeft = function(){

            $el.addClass(options.activeLeftClass);
            $('.'+options.screenBg).show();
            console.log("openLeft");
        };

        self.openRight = function(){
            $el.show();
            $el.addClass(options.activeRightClass);
            $('.'+options.screenBg).show();
            console.log("openRight");
        };

        function init(){
            $el.css("height", bodyH);
            $el.after($("<div/>",{
                    'class':options.screenBg,
                })
            );
            $('.'+options.screenBg).css("height", bodyH);
        };


    };

    /* defaults optipon */
    $.jjSlideNav.defaults = {
        activeLeftClass: 'left-open',
        activeRightClass: 'right-open',
        screenBg: 'back-screen'
    };

    /* plugin */
    $.fn.jjSlideNav = function(options){
        return this.each(function(){
            var element = $(this);
            var jjSlideNav = new $.jjSlideNav(this, options);
            element.data('jjSlideNav', jjSlideNav);
            /*
            if (!$.data(this, 'jjSlideNav')) {
                $.data(this, 'jjSlideNav', new $.jjSlideNav(element, options));
            }
            */

        });
    };

})(jQuery);




$(function(){
    // 플러그인의 defaults 값을 외부에서 변경할 수 있다.
    //$.fn.jjSlideNav.defaults.active = '';

    // 사용자 정의의 옵션값을 정의하여 플러그인 메소드를 호출한다.
    var slidenav = new $("#menu").jjSlideNav({});
    var slidenav2 = new $("#menu2").jjSlideNav({});
});
