(function($) {

    "use strict";



    /* ------------ PAGE LOADING ------------ */

    // hide header first
    $('.fadeInOnLoad').css('opacity', 0);

    // closing loading section on click
    // useful for bored users
    $('#loading').on('click', function() {
        $("#loading").fadeOut();
    });
    /*On Page Load, Fadecout Loading, Start Scroll Animation*/
    $(window).load(function() {
        $("#loading").fadeOut();
        $("#loading .object").delay(700).fadeOut("slow");
        // Show header on load
        $('.fadeInOnLoad').delay(700).fadeTo("slow", 1);

        /*Iniitate Scroll Animation*/
        bodyScrollAnimation();

        //load twitter news
      var twitHtml = '<a class="twitter-timeline" data-width="1200" data-theme="dark" data-link-color="#E81C4F" href="https://twitter.com/bscdoge">Tweets by DOGEMOON</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';

      $('#newsDiv').html(twitHtml);
    })


    /* ------------ ON SCROLL ANIMATION ------------ */


    function bodyScrollAnimation() {
        var scrollAnimate = $('body').data('scroll-animation');
        if (scrollAnimate === true) {
            new WOW({
                mobile: false
            }).init()
        }
    }


    /* ------------ SCROLL SPY ------------ */


    /*Scroll Spy*/
    $('body').scrollspy({
        target: '#main-navbar',
        offset: 100
    });



    /* ================================================
       Scroll Functions
       ================================================ */


    $('nav a[href^="#"]:not([href="#"]), .back_to_top, .explore').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 1500);
        event.preventDefault();
    });



    /* ---------- Nav BG ON Scroll---------- */

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 99) {
            $(".navbar-default").addClass("is-scrolling");
        } else {
            $(".navbar-default").removeClass("is-scrolling");
        }
    });


    /* ---------- Back to Top ---------- */

    $(window).scroll(function() {
        if ($(window).scrollTop() > 1000) {
            $('.back_to_top').fadeIn('slow');
        } else {
            $('.back_to_top').fadeOut('slow');
        }
    });


    /* ---------- Background Video ---------- */

    if ($('#BGVideo').length) {
        $("#BGVideo").mb_YTPlayer();
    }


    /* ---------- Play Video POPUP ---------- */

    if ($('.video').length) {
        $('.video').magnificPopup({
            type: 'iframe',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                        index: 'youtube.com/', // String that detects type of video 

                        id: 'v=', // String that splits URL in a two parts, second part should be %id%
                        // Or null - full URL will be returned
                        // Or a function that should return %id%, for example:
                        // id: function(url) { return 'parsed id'; }

                        src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }


                },

                srcAction: 'iframe_src',
            }
        });

    }

    /* ---------- PRODUCT POPUP ---------- */

    if ($('a[href="#product-choose"]').length) {

        $('a[href="#product-choose"]').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            midClick: true // mouse middle button click
        });

    }


    /* ---------- MAGNIFIC POPUP ---------- */

    $('.gallery').each(function() {

        $('.gallery').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery: { enabled: true },
            mainClass: 'mfp-fade'
        });

    });

    /* ---------- QUANTITY TOUCHSPIN ---------- */

    if ($('.quanity').length) {

        $('.quanity').TouchSpin({
            verticalbuttons: true,
            verticalupclass: 'glyphicon glyphicon-plus',
            verticaldownclass: 'glyphicon glyphicon-minus'
        });

    }

    /* ---------- SELECTPICKER ---------- */

    if ($('.selectpicker').length) {
        $('.selectpicker').selectpicker();
    }


    /*Feature Notes*/
    $('.feature-note .plus-icon .plus').on('click', function() {
        if ($(this).parents('.feature-note').hasClass('show-cont')) {
            $(this).parents('.feature-note').removeClass('show-cont')
        } else {
            $(this).parents('.feature-note').addClass('show-cont')
        }
    });


    /* ---------- CONTACT FORM FLIPBOX ---------- */

    $('.flip-contact-box').on('click', function() {
        if (!$('.flip-box-container').hasClass('show-form')) {
            $('.flip-box-container').addClass('show-form')
        }
    });

    $('.js-close-flip').on('click', function() {
        $('.flip-box-container').removeClass('show-form');
    });




    /* ================================================
       Paypal Form Validation
       ================================================ */

    /* ================================================
   jQuery Validate - Reset Defaults
   ================================================ */

    if ($.fn.validator) {

        $.validator.setDefaults({
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorPlacement: function(error, element) {}
        });
    }

    if ($.fn.validator) {
        // validate Registration Form
        $("#paypal-regn").validate({
            rules: {
                first_name: "required",
                last_name: "required",
                email: {
                    required: true,
                    email: true
                },
                os0: "required",
                quantity: "required",
                agree: "required"
            },
            messages: {
                first_name: "Your first name",
                last_name: "Your last name",
                email: "We need your email address",
                os0: "Choose your Pass",
                quantity: "How many seats",
                agree: "Please accept our terms and privacy policy"
            },
            submitHandler: function(form) {
                $("#reserve-btn").attr("disabled", true);
                form.submit();
                //console.log($(form).serialize())
            }
        });
    }

    /* ---------- INITIATE EXIT MODAL ---------- */

    var dataexitpopuop = $('body').data('exit-modal');

    if ($('#exit-modal').length && dataexitpopuop === true) {

        var _ouibounce = ouibounce($('#exit-modal')[0], {
            aggressive: true, // use false here to hide message once shown
            timer: 0,
            callback: function() { // if you need to do something, write here
            }
        });
        $('body').on('click', function() {
            $('#exit-modal').hide();
        });
        $('#exit-modal .modal-footer').on('click', function() {
            $('#exit-modal').hide();
        });
        $('#exit-modal .exit-modal').on('click', function(e) {
            e.stopPropagation();
        });

    }


   //make main div height size of window
   //$('#homediv').css('min-height', Math.max(500, $(window).height()-190) + 'px');
   //$('#homediv').css('min-height', '700px');


	 //particls
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 40,
            "density": {
                "enable": false,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 3
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 26.79854800594439,
                "size_min": 8.932849335314796,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

//$('canvas').attr("height", "1000");
/*var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
    stats.begin();
    stats.end();
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
        count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
};
requestAnimationFrame(update);
*/

})(jQuery);
