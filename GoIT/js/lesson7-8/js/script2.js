$(function () {
    $('.forms input').hover (showTip, hideTip);
    $('.forms button').click (showAll);
   
   function showTip() {
        $(this).next('em').animate({opacity: 'show', marginLeft: '20px'}, 'slow');
    }

    function hideTip() {
        $(this).next('em').animate({opacity: 'hide', marginLeft: '10px'}, 'slow');
    }

    function showAll() {
        $('em').animate({opacity: 'show', marginLeft: '20px'}, 'slow');
    }

});