$(document).ready(function (){
    $('.sub-menu li a').on('click',function(event){
        const $anchor = $(this);
        $('html, body').animate({
            scrollTop: $($anchor.attr('href')).offset().top + "px"
        }, 1000);
    });
})
