(function($) {
  $.fn.Carousel = function(options){

    var defaults = {
        leftArrow: '.carousel-arrow-left',
        rightArrow: '.carousel-arrow-right',
        elementsList: '.carousel-list',
        pixelsOffset: 760,
        currentLeftValue: 0,
        maximumOffset: 0
    };

    var settings = $.extend(defaults, options);

    var $leftUIEl = $(settings.leftArrow);
    var $rightUIEl = $(settings.rightArrow);
    var $list = $(settings.elementsList);
    var $elementsCount = $list.find('li').length;
    var $minimumOffset = - (($elementsCount - 1) * settings.pixelsOffset);

 
    $leftUIEl.click(function() {
         if (settings.currentLeftValue != settings.maximumOffset) {
            settings.currentLeftValue += 760;
            $list.animate({ left : settings.currentLeftValue + "px"}, 500);
        }     
    });
 
    $rightUIEl.click(function() {
        if (settings.currentLeftValue != $minimumOffset) {
            settings.currentLeftValue -= 760;
            $list.animate({ left : settings.currentLeftValue + "px"}, 500);
        }   
    });

    return this;
  };
  
})(jQuery);