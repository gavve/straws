$(document).ready( function() {


    var lazyLoad = function() {
        [].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() {
              img.removeAttribute('data-src');
            };
          });
    };
    lazyLoad();


    /*
    **
    ** Variables
    */

    var links = {
        0: "The Straw",
        1: "The Change",
        2: "Clean",
        3: "Our planet",
        4: "Believe",
        5: "Goals"
    }
    var _bindings = function() {
        const slider = $('.main-slick');
        slider.slick({
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            arrows:false,
            edgeFriction: 0.05,
            lazyLoad: 'progressive',
            swipeToSlide: true,
            touchThreshold:10,
            appendDots: $('.straw-nav__links'),
            customPaging : function(slider, i) {
                return '<a role="tab" id="slick-slide-control0'+i+'" aria-controls="slick-slide0'+i+'" aria-label="'+i+1+' of 6" tabindex="0" aria-selected="true">'+links[i]+'</a>';
            },
            responsive: [
                 {
                     breakpoint: 768,
                     settings: {
                         vertical: true,
                         verticalSwiping: true
                     }
                 }
            ]
        });

        //Implementing navigation of slides using mouse scroll
        slider.on('wheel', (function(e) {
            e.preventDefault();
        
            if (e.originalEvent.deltaY < 0) {
            $(this).slick('slickPrev');
            } else {
            $(this).slick('slickNext');
            }
        }));

        $('.hamburger').on('click', function() {
            $(this).toggleClass("is-active");
            $('.straw-nav__links').toggleClass("straw-nav__links--open");
        });

        $('.slick-dots li a').on('click', function() {
            if($('.hamburger').hasClass("is-active")) {
                $('.hamburger').removeClass("is-active");
                $('.straw-nav__links').removeClass("straw-nav__links--open");
            }
        });

        $('.slick-dots li a').on("keyup", function(e) {
            if(e.originalEvent.keyCode === 13) {
                // press enter
                $(this).click();
            }
        });
    };

    // var changeSlickSlide = function() {
    //     console.log($(document).scrollTop());
    // };

    // addEventListener("wheel", changeSlickSlide);

    _bindings();
});