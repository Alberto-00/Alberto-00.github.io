$(document).ready(function (){

    //Andare in una parte specifica della pagina tramite gli href nell'header
    $('.sub-menu li a').on('click',function(){
        const $anchor = $(this);
        $('html, body').animate({
            scrollTop: $($anchor.attr('href')).offset().top + "px"
        }, 1000);
    });

    //Scroll top
    $('body').scroll(function() {
        if ($(this).scrollTop() > 180) {
            $('#scrollUp').removeClass('fade-out').addClass('fade-in').css('visibility', 'visible');
        } else {
            $('#scrollUp').removeClass('fade-in').addClass('fade-out');
        }
    });

    $("#scrollUp").click(function () {
        $("html, body").animate({scrollTop: 0}, 800);
    });

    //sidenav
    $('#menu-phone').click(function (event){
        event.stopPropagation();
        $('#toggle').toggleClass("mobile-menu-hide");
    })

    $('html').click(function (){
        const closeSidenav = $('#toggle');
        if (!closeSidenav.hasClass("mobile-menu-hide"))
            closeSidenav.addClass("mobile-menu-hide")
    })
})