$(document).ready(function (){

    var text = ["Internet Of Things Addicted", "AI Addicted", "CyberSecurity Student"];
    var counter = 0;
    firstChange($('.txt-eff1'));
    var inst = setInterval(change, 3950);

    function firstChange(elem){
        elem.each(function(){
            $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
        });

        anime.timeline({loop: true})
            .add({
                targets: '.txt-eff1 .letter',
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: function(el, i) {
                    return 500 + 30 * i;
                }
            }).add({
            targets: '.txt-eff1 .letter',
            translateX: [0,-30],
            opacity: [1,0],
            easing: "easeInExpo",
            duration: 1100,
            delay: function(el, i) {
                return 100 + 30 * i;
            }
        });
    }

    function change() {
        const elem = $('.txt-eff1');
        elem.text(text[counter]);
        counter++;
        if (counter >= text.length) {
            counter = 0;
        }
        firstChange(elem);
    }
})
