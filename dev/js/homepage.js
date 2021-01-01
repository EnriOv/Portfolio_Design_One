$(document).ready(function(){
    $("#arrow-down").click(function() {
        $('html,body').animate({
            scrollTop: $(".about_me").offset().top},
            'slow');
    });

    (function($) {

        /**
         * Copyright 2012, Digital Fusion
         * Licensed under the MIT license.
         * http://teamdf.com/jquery-plugins/license/
         *
         * @author Sam Sehnert
         * @desc A small plugin that checks whether elements are within
         *     the user visible viewport of a web browser.
         *     only accounts for vertical position, not horizontal.
         */
        
        $.fn.visible = function(partial) {
            
            var $t            = $(this),
                $w            = $(window),
                viewTop       = $w.scrollTop(),
                viewBottom    = viewTop + $w.height(),
                _top          = $t.offset().top,
                _bottom       = _top + $t.height(),
                compareTop    = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;
            
            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        
        };
    })(jQuery);
    
    var win = $(window);
    var allMods = $(".project_container");
    
    allMods.each(function(i, el) {
        var el = $(el);

        if (el.visible(true)) {
            el.addClass("already-visible"); 
        } 
    });
    
    win.scroll(function(event) {

        allMods.each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("come-in"); 
            }
        });
    });

    $(".linked-in").click(function() {
        window.open("https://www.linkedin.com/in/enrique-orrantia-87a60118b/");
    });

    $(".git-hub").click(function() {
        window.open("https://github.com/EnriOv");
    });

    $(".resume").click(function() {
        window.open("https://drive.google.com/file/d/12jTfel6Lj9h6g1y3WC2eJ7-4vQB15H_g/view?usp=sharing");
    });
});