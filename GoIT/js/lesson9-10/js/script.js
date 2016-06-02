$(window).load(function(){

    $(function() {
        $('.dropdown').hover(
            function(){
                $(this).children('.submenu').slideDown(200).animate({backgroundColor:'#d8bfd8'},200);
            },
            function(){
                $(this).children('.submenu').animate({backgroundColor:'#d4d4d4'},200).slideUp(200);
            }
        );

        $('.dropdown_2').hover(
            function(){
                $(this).children('.submenu').animate({width:'toggle'},200).animate({backgroundColor:'#c2abc2'},200);
            },

            function(){
                $(this).children('.submenu').animate({backgroundColor:'#d4d4d4'},200).animate({width:'toggle'},200);
            }

        );

        $('.test').click(
            function(){
                $(this).animate({backgroundColor:'#d3a0f0'},200);
            }    
        );

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
                    return '<a href="#' + (page) + '">' + '</a>';
            },
        });

        $('select').ikSelect();

        $('.jquery__box').simpleSwitch();

        $('#disabled1').parent().addClass('disabled');

    });
});