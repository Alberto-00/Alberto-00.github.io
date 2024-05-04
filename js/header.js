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

    //switch
    $('.switch').click(function() {
        var currentPage = window.location.href;
        var baseUrl = window.location.origin;
        var safeUrls = {
            '/hacker/index.html': baseUrl + '/index.html',
            '/hacker/contact.html': baseUrl + '/contact.html',
            '/hacker/resume.html': baseUrl + '/resume.html',
            '/index.html': baseUrl + '/hacker/index.html',
            '/contact.html': baseUrl + '/hacker/contact.html',
            '/resume.html': baseUrl + '/hacker/resume.html',
            '/': baseUrl + '/hacker/index.html'
        };

        // Cicla attraverso le chiavi dell'oggetto safeUrls
        for (var key in safeUrls) {
            if (currentPage.includes(key)) {
                window.location.href = safeUrls[key];
                return; // Interrompe l'esecuzione ulteriore del ciclo e della funzione
            }
        }

        // Default reindirizzamento se nessun caso precedente corrisponde
        window.location.href = baseUrl + '/index.html';
    });
})