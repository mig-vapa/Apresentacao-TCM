$('.slide-presentation').each(function(i) {
    $(this).css('z-index', 998 - i);
    $(this).attr('data-index', i);
});

var dif = 0;
var int;

var vm1 = new Vue({
    el: '#app',
    data: {
        integrantes: [{
                nome: 'Miguel Velasques',
                n: 29
            },
            {
                nome: 'Felipe Perrella',
                n: 8
            },
            {
                nome: 'Lucas Favalli',
                n: 27
            },
            {
                nome: 'Guilherme Pakalnis',
                n: 16
            },
            {
                nome: 'Rafael Afonso',
                n: 31
            },
            {
                nome: 'Christyan Satoshi',
                n: 6
            }
        ],
        zoom: 1,
        grafs: [
            "image.png",
            "image (1).png",
            "image (2).png",
            "image (3).png",
            "image (4).png",
            "image (5).png",
            "image (6).png",
            "image (7).png",
            "image (8).png",
            "image (9).png",
            "image (10).png",
            "image (11).png",
        ],
        slide: 0,
        runWatch: true,
        cubeFace: 0
    },
    methods: {
        changeSlide: function(val) {
            $('#slidesMenu').modal('hide');
            if (val >= 0 && val < this.totalSlides) {
                if (this.slide - val == 1 || this.slide - val == -1) this.slide = val;
                else if (this.slide < val) {
                    dif = val - this.slide;
                    int = setInterval(function() {
                        if (dif > 0) {
                            $('#btn-next').click();
                            dif--;
                        } else {
                            clearInterval(int);
                        }
                    }, 70);
                } else if (this.slide > val) {
                    dif = this.slide - val;
                    int = setInterval(function() {
                        if (dif > 0) {
                            $('#btn-prev').click();
                            dif--;
                        } else {
                            clearInterval(int);
                        }
                    }, 70);
                }
            };
        }
    },
    watch: {
        slide: function(slideNew, slideOld) {
            if (slideNew > slideOld) {
                $('.slide-presentation[data-index=' + slideOld + ']').removeClass('slide-shown');
                $('.slide-presentation[data-index=' + slideOld + ']').addClass('slide-hidden');
            } else {
                $('.slide-presentation[data-index=' + slideNew + ']').addClass('slide-shown');
                $('.slide-presentation[data-index=' + slideNew + ']').addClass('slide-hidden');
            }
        },
        zoom: function(aaa) {
            $('#zoom-box').css('transform', 'scale(' + aaa + '")');
        },
        cubeFace: function(newVal, oldVal) {

            if (newVal >= 0 && newVal <= 5) {
                $('.cube').addClass('cube--change-middle');
                for (a in ['front', 'back', 'right', 'left', 'top', 'bottom']) {
                    console.log(['front', 'back', 'right', 'left', 'top', 'bottom'][a]);
                    $('.cube').removeClass('cube--show-' + ['front', 'back', 'right', 'left', 'top', 'bottom'][a]);
                }
                setTimeout(function() {
                    $('.cube').removeClass('cube--change-middle').addClass('cube--show-' + ['front', 'back', 'right', 'left', 'top', 'bottom'][newVal]);
                }, 500);
            }

            else {
                this.cubeFace = oldVal;
            }

        }
    },
    computed: {
        totalSlides: function() {
            var c = 0;
            for (i in $('.slide-presentation')) {
                if ((parseInt(i) + "") != "NaN") {
                    c++;
                }
            }
            return c;
        },
        slidesMenu: function() {
            var a = [];
            var i;
            $('.slide-presentation').each(function() {
                i = $(this).find('[data-title]').html();
                a.push({
                    title: $.trim(i),
                    Bg: $(this).css('background'),
                    colorTxt: $(this).css('color'),
                    index: $(this).data('index')
                });
            });
            return a;
        }
    }
});

var a = 0;
$('.slide-presentation').each(function() {
    if ($(this)[0].hasAttribute('data-initial')) {

        vm1.changeSlide(a);

    }
    a++;
});


$(document).bind('keyup', function(e) {
    if (e.keyCode == 39) {
        vm1.changeSlide(vm1.slide + 1);
    } else if (e.keyCode == 37) {
        vm1.changeSlide(vm1.slide - 1);
    } else {
        if ($('.slide-presentation[data-index="' + vm1.slide + '"]').has('cube')) {
            if (e.keyCode == 38) {

            } else if (e.keyCode == 40) {

            }
        }
    }
});


$('[data-toggle="zoom"]').click(function() {
    img = $('[data-index="' + vm1.slide + '"] .carousel .carousel-item.active img')[0] != undefined ? $('[data-index="' + vm1.slide + '"] .carousel .carousel-item.active img') : $('[data-index="' + vm1.slide + '"] img');


    if (img[0] != undefined) {
        $('<img id="dinnamic-image"></img>').attr('src', img.attr('src')).appendTo('#app');
        imageX = $('#dinnamic-image').width();
        imageY = $('#dinnamic-image').height();
        $('#dinnamic-image').remove();
        $('<div id="zoom-box" class="border border-dark rounded"></div>').appendTo('#app');
        // console.log('' + vm1.zoom * imageX + 'px ' + vm1.zoom * imageY + 'px');
        // $('#zoom-box').css('background-size', '' + vm1.zoom * img.width() + 'px ' + vm1.zoom * img.height() + 'px');
        $('#zoom-box').css('width', ($('#zoom-box').width() / vm1.zoom) + 'px');
        $('#zoom-box').css('height', ($('#zoom-box').height() / vm1.zoom) + 'px');
        $('#zoom-box').css('transform', 'scale(' + vm1.zoom + ')');
        $('#app').bind('mousemove', function(event) {
            porcX = (event.pageX - img.offset().left) / img.width();
            porcY = (event.pageY - img.offset().top) / img.height();

            posX = img.width() * porcX;
            posY = img.height() * porcY;

            console.log(img.width());

            xBox = $('#zoom-box').width();
            yBox = $('#zoom-box').height();

            // console.log((posX - (xBox / 2)) + 'px ' + (posY - (yBox / 2)) + 'px');
            $('#zoom-box').css({
                'top': event.pageY - yBox / 2,
                'left': event.pageX - xBox / 2,
                'background-image': 'url("' + img.attr('src') + '")',
                'background-position': (-posX + xBox / 2) + 'px ' + (-posY + yBox / 2) + 'px',
                'background-size': img.width() + 'px ' + img.height() + 'px'
            });
        });
        $('#zoom-box').bind('dblclick', function() {
            $('#app').unbind('mousemove');
            $(this).remove();
        });
    }
});