$(function () {
    var tabsContent = $('.tabs__content div');
    var tabsLink = $('.tabs__menu a');
    tabsContent.hide().filter(':first').show();

    function chooseTab () {
        tabsContent.hide();
        tabsContent.filter(this.hash).show();
        tabsLink.removeClass('active');
        $(this).addClass('active');
    }

    tabsLink.on ('click', chooseTab);
});