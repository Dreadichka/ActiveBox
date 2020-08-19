$(function(){

    /*Fixed Header*/

    let header = $("#header");
    let intro = $("#intro");
    let introH = intro.innerHeight();/*innerHeight();- включая pad, height(); - без pad*/
    let scrollPos = $(window).scrollTop();
    let nav = $("#nav");
    let navToggle = $("#navToggle");

    checkScroll(scrollPos, introH);

    $(window).on("scroll resize", function(){
        introH = intro.innerHeight();
        scrollPos = $(this).scrollTop();

        checkScroll(scrollPos, introH);
    });

    function checkScroll(scrollPos, introH){
        if(scrollPos > introH){
            header.addClass("fixed");
        }else{
            header.removeClass("fixed");
        }
    }



    /*Smooth Scroll*/

    $("[data-scroll]").on("click", function(event){
        event.preventDefault();

        let elementId = $(this).data('scroll');
        let elementOffset = $(elementId).offset().top;

        nav.removeClass("show");
        $("nav a").removeClass('active');
        $(this).addClass('active');

        $("html, body").animate({
            scrollTop: elementOffset - 70
        }, 700);
    })



    /*Nav Toggle*/

    navToggle.on("click", function(event){
        event.preventDefault();

        nav.toggleClass("show");
    });



    /*Slider https://kenwheeler.github.io/slick/ */

    let slider = $("#reviews__slider");

    slider.slick({
       infinite: true,
       slidesToShow: 1,
       slidesToScroll: 1,
       fade: true,
       arrows: false,
       dots: true
     });



    /*Categories Filter*/

    let filter = $("[data-filter]");

    filter.on("click", function(event){
        event.preventDefault();

        let cat = $(this).data('filter');

        if(cat == 'show__all'){
            $("[data-cat]").show();
        } else{
           $("[data-cat]").each(function(){

            let workCat = $(this).data('cat');

           if(workCat != cat){
               $(this).hide();
           } else{
               $(this).show();
           }
          });
        }
    });



    /*Modals*/

    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");

    modalCall.on("click", function(event){
        event.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');

        $(modalId).addClass('modal-show');
        $("body").addClass('no-scroll');

        setTimeout(function(){
           $(modalId).find(".modal__dialogs").css({
            transform: "rotateX(0)"
         });
        }, 200);

        $('[data-slider="slick"]').slick('setPosition');
    });

    modalClose.on("click", function(event){
        event.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');

        modalParent.find(".modal__dialogs").css({
            transform: "rotateX(90deg)"
         });

        setTimeout(function(){
           modalParent.removeClass('modal-show');
           $("body").removeClass('no-scroll');
        }, 200);
    });

    $('.modal').on("click", function(event){
        let $this= $(this);

        $this.find(".modal__dialogs").css({
            transform: "rotateX(90deg)"
         });

        setTimeout(function(){
           $this.removeClass('modal-show');
           $("body").removeClass('no-scroll');
        }, 200);
    });

    $('.modal__dialogs').on("click", function(event){
        event.stopPropagation();

        $(this).removeClass('modal-show');
    });



    /*Modals Slider https://kenwheeler.github.io/slick/*/

    $('[data-slider="slick"]').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true,
    });

    $(".slickPrev").on("click", function(event){
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickPrev");
    });

     $(".slickNext").on("click", function(event){
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickNext");
    });



    /*Scroll Element Animate*/

    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or     function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should     initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 100, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should     trigger the animation

});


    /*Preloader*/

    setTimeout(function(){
        let preloader = document.getElementById('page__preloader');
        if(!preloader.classList.contains('done')){
            preloader.classList.add('done');
        }
    }, 1000);

});
