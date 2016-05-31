$(function() {
    $('.jcarousel').jcarousel({
        animation: 'slow',
        wrap: 'circular'
    });

     $('.jcarousel-prev').jcarouselControl({
        target: '-=1'
    });

    $('.jcarousel-next').jcarouselControl({
        target: '+=1'
    });

    $('.jcarousel-pagination')
    .on('jcarouselpagination:active', 'a', function() {
        $(this).addClass('active');
        })
    .on('jcarouselpagination:inactive', 'a', function() {
        $(this).removeClass('active');
    });

    $('.jcarousel-pagination').jcarouselPagination({
        item: function(page) {
                return '<a href="#' + (page-1) + '">' + '</a>';
            },
    });

});