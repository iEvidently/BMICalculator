(function ($) {
    $.fn.sameHeight = function (opt) {
        var options = $.extend({
            skipClass: 'same-height-ignore',
            leftEdgeClass: 'same-height-left',
            rightEdgeClass: 'same-height-right',
            elements: '>*',
            flexible: false,
            multiLine: false,
            useMinHeight: false,
            biggestHeight: false
        }, opt);
        return this.each(function () {
            var holder = $(this), postResizeTimer, ignoreResize;
            var elements = holder.find(options.elements).not('.' + options.skipClass);
            if (!elements.length) return;

            // resize handler
            function doResize() {
                elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
                if (options.multiLine) {
                    // resize elements row by row
                    resizeElementsByRows(elements, options);
                } else {
                    // resize elements by holder
                    resizeElements(elements, holder, options);
                }
            }
            doResize();

            // handle flexible layout / font resize
            var delayedResizeHandler = function () {
                if (!ignoreResize) {
                    ignoreResize = true;
                    doResize();
                    clearTimeout(postResizeTimer);
                    postResizeTimer = setTimeout(function () {
                        doResize();
                        setTimeout(function () {
                            ignoreResize = false;
                        }, 10);
                    }, 100);
                }
            };

            // handle flexible/responsive layout
            if (options.flexible) {
                $(window).bind('resize orientationchange fontresize', delayedResizeHandler);
            }

            // handle complete page load including images and fonts
            $(window).bind('load', delayedResizeHandler);
        });
    };

    // detect css min-height support
    var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

    // get elements by rows
    function resizeElementsByRows(boxes, options) {
        var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
        boxes.each(function (ind) {
            var curItem = $(this);
            if (curItem.offset().top === firstOffset) {
                currentRow = currentRow.add(this);
            } else {
                maxHeight = getMaxHeight(currentRow);
                maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
                currentRow = curItem;
                firstOffset = curItem.offset().top;
            }
        });
        if (currentRow.length) {
            maxHeight = getMaxHeight(currentRow);
            maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
        }
        if (options.biggestHeight) {
            boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
        }
    }

    // calculate max element height
    function getMaxHeight(boxes) {
        var maxHeight = 0;
        boxes.each(function () {
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });
        return maxHeight;
    }

    // resize helper function
    function resizeElements(boxes, parent, options) {
        var calcHeight;
        var parentHeight = typeof parent === 'number' ? parent : parent.height();
        boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function (i) {
            var element = $(this);
            var depthDiffHeight = 0;
            var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || element.css('-webkit-box-sizing') === 'border-box';

            if (typeof parent !== 'number') {
                element.parents().each(function () {
                    var tmpParent = $(this);
                    if (parent.is(this)) {
                        return false;
                    } else {
                        depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
                    }
                });
            }
            calcHeight = parentHeight - depthDiffHeight;
            calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

            if (calcHeight > 0) {
                element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
            }
        });
        boxes.filter(':first').addClass(options.leftEdgeClass);
        boxes.filter(':last').addClass(options.rightEdgeClass);
        return calcHeight;
    }
}(jQuery));

function adjustSideHeight() {
    side_h = 0;
    content_h = 0;

    $('.aside').children().each(function () {
        var h_ = $(this).outerHeight() + 46;
        side_h += h_;
    });
    $('#content').children().each(function () {
        var h_ = $(this).outerHeight();
        content_h += h_;
    });
    if ($(window).width() > 1023) {
        if (content_h > side_h && $(window).width() > 1023) {
            $('.aside').css('min-height', content_h);
        }
        else if (content_h < side_h && $(window).width() > 1023) {
            $('#content').css('min-height', side_h);
        }
    }
}

function signup() {
    $('html, body').animate({
        scrollTop: $($('#first')).offset().top
    }, 500);
    $("#collapse1").addClass("in");
    $("#first .accordion-toggle").removeClass("collapsed");

}
function manage() {
    $('html, body').animate({
        scrollTop: $($('#second')).offset().top
    }, 500);
    $("#collapse2").addClass("in");
    $("#second .accordion-toggle").removeClass("collapsed");
}
function secure() {
    $('html, body').animate({
        scrollTop: $($('#third')).offset().top
    }, 500);
    $("#collapse3").addClass("in");
    $("#third .accordion-toggle").removeClass("collapsed");
}

function ClearField() {
    var fields = $('#hmtop .form-control, .search-row-holder input[type="text"], .subs-add-area input[type="text"], .search-form input[type="text"], .search-box-form input[type="text"]');
    fields.each(function () {
        var this_field = $(this);
        var default_value = this_field.val();
        this_field.focus(function () {
            if (this_field.val() == default_value) {
                this_field.val("");
            }
        });
        this_field.blur(function () {
            if (this_field.val() == "") {
                this_field.val(default_value);
            }
        });
    });
}

function BarChart() {
    var el_, newPoint_, newPlace_, offset_;
    $('.stats-row').each(function () {
        el_ = $(this);
        width_ = el_.find('.main-part .hold').width();
        newPoint_ = (el_.find('input.info-field').val() - el_.find('input.info-field').attr("min")) / (el_.find('input.info-field').attr("max") - el_.find('input.info-field').attr("min"));
        offset_ = -1.3;
        if (newPoint_ < 0) {
            newPlace_ = 0;
        }
        else if (newPoint_ > 1) {
            newPlace_ = width_;
        }
        else {
            newPlace_ = width_ * newPoint_ + offset_;
            offset_ -= newPoint_;
        }
        el_.find("span.label").css({
            left: newPlace_,
            marginLeft: offset_ + "%"
        });
    });
}

function initSameHeight() {

    if ($('.programmers-lst > li').length) {
        $('.programmers-lst').sameHeight({
            elements: '.txt-box-holder',
            flexible: true,
            useMinHeight: true,
            multiLine: true
        });
    }

    if ($('.partner-links').length) {
        $('.partner-links').sameHeight({
            elements: '> li',
            flexible: true,
            multiLine: true
        });
    }
}

function BlockHeight() {
    if ($('.partner-links .image-block .bg-img').length) {
        $('.partner-links .image-block .bg-img').each(function () {
            if ($(this).is(':visible')) {
                var h_ = $(this).closest('.partner-links').find('>li:first-child .image-block').height();
                $(this).height(h_);
            }
        });
    }
}

function jQueryMain() {
    $('.search-box-frame > .fa').click(function () {
        if (!$(this).closest('.search-box-frame').hasClass('active')) {
            $(this).closest('.search-box-frame').addClass('active');
            $(this).stop().fadeOut(200);
            $(this).closest('.search-box-frame').find('.search-box-form-holder').animate({
                width: '100%'
            }, 550);
        }
    });


    $('ul.roundnav li a').hover(
        function () {
            if ($(window).width() > 1023) {
                $(this).find('.box').hide();
                $(this).find('.box-hover').stop().fadeIn(350);
            }
        }, function () {
            $(this).find('.box').stop().fadeIn(350);
            $(this).find('.box-hover').hide();
        }
    );

    if ($('.tooltip-item').length) {
        $('.tooltip-item').tooltipster({
            position: 'bottom',
            maxWidth: 230,
            interactive: true,
            interactiveTolerance: 3000
        });
    }

    if ($("#calendar-box").length) {
        $(function () {
            $("#calendar-box").datepicker({
                dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
            });
        });
    }
    BlockHeight();

    $('.top-holder p a.see-more-btn').click(function () {
        $(this).hide();
        $(this).closest('.top-holder').find('.add-txt-box-slide').slideDown(400);
        return false;
    });

    $('.legend-area h3').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).find('span.fa').removeClass('fa-plus-circle').addClass('fa-minus-circle');
            $(this).closest('.legend-area').find('.data-info').stop().slideDown(400);
        }
        else {
            $(this).removeClass('active');
            $(this).find('span.fa').removeClass('fa-minus-circle').addClass('fa-plus-circle');
            $(this).closest('.legend-area').find('.data-info').stop().slideUp(400);
        }
        return false;
    });


    $('#box01 .people-lst li').delegate('input[type=checkbox]', 'change', function () {
        var this_ = $(this);
        var $lis = $('.info-data-holder .hold-cont > .info-date-box'),
            $checked = $('input:checked');

        if ($checked.length) {
            //this_.closest('.hold').removeClass('active');
            var selector = $checked.map(function () {
                return '.' + $(this).attr('rel');
            }).get().join();

            $lis.show().filter(selector).hide().addClass("show-item");
            if (!this_.closest('li').hasClass('active')) {
                this_.closest('li').addClass('active');
            }
            else {
                this_.closest('li').removeClass('active');
            }
        }
        else {
            //this_.closest('.hold').addClass('active');
            this_.closest('li').removeClass('active');
            $lis.show().removeClass("show-item");
            //$('.info-data-holder .error-text').hide();
        }
    });

    initSameHeight();

    $('.filter-area-row .add-link').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).closest('.hold').find('.drop-box-hold').show();
        }
        else {
            $(this).removeClass('active');
            $(this).closest('.hold').find('.drop-box-hold').hide();
        }
        return false;
    });

    $('.add-btn-hold .btn-add').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).closest('.hold-row').find('ul').show();
        }
        else {
            $(this).removeClass('active');
            $(this).closest('.hold-row').find('ul').hide();
        }
        return false;
    });

    $('.radio-add-lst:not(.block) li, .programmes-area-lst .radio-list li').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).parents('li').addClass('active');
        }
        else if ($(this).closest('ul').find('li.active').length < 2) {
            $(this).parents('li').removeClass('active');
            $(this).removeClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });

    $('.add-radio-list li').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).siblings('li').removeClass('active');
        }
    });

    $('.add-drop-block > a').click(function () {
        $(this).closest('.add-drop-block').toggleClass('active');
        return false;
    });

    $('.radio-add-lst.block li').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });

    $('.btn-view-sample').hover(
        function () {
            $(this).closest('.sample-box').find('.img').css('visibility', 'visible');
        }, function () {
            $(this).closest('.sample-box').find('.img').css('visibility', 'hidden');
        }
    );

    $('.btns-row .btn-recommend .link').click(function () {
        $(this).addClass('active');
        return false;
    });

    $('.quest-list a').click(function () {
        var id_ = $(this).attr('href');
        $(this).closest('.quest-list').hide();
        $(id_).show();
        $(id_).siblings().hide();
        return false;
    });

    $('.quest-check-list li').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).siblings('li').removeClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });

    BarChart();

    $('.btn-arrow-bottom').click(function () {
        var href_ = $(this).attr('href');
        if ($(href_).length) {
            var top_ = $(href_).offset().top;
        }
        $('html, body').animate({
            scrollTop: top_ + 30
        }, 500);
        return false;
    });
    var fadeInTimer, fadeInTimer_2;

    /*$('.az-details .btns-row .btn-recommend a, .az-details .btns-row .social-like-btns a').click(function(){
        var this_ = $(this);
        if(!this_.closest('.btns-row').hasClass('active')){
            this_.closest('.btns-row').addClass('active');
            var this_popup = this_.closest('.btns-row').find('.popup-add-block');
            this_popup.fadeIn(450, function(){
                this_popup.animate({
                    bottom: '0'
                }, 600);
                clearTimeout(fadeInTimer);
                fadeInTimer = setTimeout(function() {
                    this_.closest('.btns-row').removeClass('active');
                    this_.closest('.btns-row').find('.popup-add-block').fadeOut(450, function(){
                        this_popup.css('bottom', '-900px');
                    });
                }, 5000);
            });
        }
        return false;
    });*/

    $('.az-details .btns-row .popup-add-block .btn-close').click(function () {
        clearTimeout(fadeInTimer);
        $(this).closest('.btns-row').removeClass('active');
        $(this).closest('.popup-add-block').fadeOut(450).css('bottom', '-900px');;
        return false;
    });

    $('.az-details .box-bottom-hold .btn-close').click(function () {
        clearTimeout(fadeInTimer_2);
        $(this).closest('.box-bottom-hold').removeClass('active');
        $(this).closest('.popup-add-block').fadeOut(450);
        $(this).closest('.popup-add-block').css('bottom', '-900px');
        return false;
    });

    if ($('body.az-details').length) {
        var top_fade = $('.az-details .box-bottom-hold #box04 .content-frame').offset().top;
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > top_fade - 150 && !$('body').hasClass('no-scroll') && $('.az-details .box-bottom-hold #box06 .content-frame').is(':visible')) {
            $('body').addClass('no-scroll');
            $('.az-details .box-bottom-hold .popup-add-block').fadeIn(450, function () {
                var thi_s = $(this);
                $('.az-details .box-bottom-hold .popup-add-block').animate({
                    bottom: '0'
                }, 600);
                clearTimeout(fadeInTimer_2);
                fadeInTimer_2 = setTimeout(function () {
                    thi_s.closest('.box-bottom-hold').removeClass('active');
                    thi_s.fadeOut(450);
                }, 5000);
            });
        }
    });

    ClearField();

    if ($('.members-lst .btn-add-member').length) {
        $('.members-lst .btn-add-member').fancybox({
            padding: '0'
        });
    }
    /*if($('.top-ttl-info .btn-add').length){
        $('.top-ttl-info .btn-add').fancybox({
            padding: '0'
        });
    }*/
    if ($('.popup-link').length) {
        $('.popup-link').fancybox({
            padding: '0',
            width: '780',
            autoSize: false
        });
    }

    if ($('.members-lst-add li > a').length) {
        $('.members-lst-add li > a').fancybox({
            padding: '0',
            width: '780',
            autoSize: false
        });
    }

    if ($('.latest-articles-area').length && !$('.latest-articles-area').hasClass('no-large')) {
        $('.latest-articles-area').find('> div').eq('0').addClass('col-md-12');
        $('.latest-articles-area').find('> div').eq('3').addClass('col-md-12');
    }

    $('.sort-row .dropdown-menu a').click(function () {
        var href_ = $(this).attr('href');
        var text_ = $(this).text();
        $(this).closest('.btn-group').removeClass('open').find('.btn .txt').text(text_);
        $(this).closest('.aside-holder').find(href_).siblings().hide();
        $(this).closest('.aside-holder').find(href_).show();
        return false;
    });
    $('#demolist li').on('click', function () {
        $('#datebox').val($(this).text());
    });

    $('label.btn.btn-primary').click(function () {
        $(this).toggleClass('active');
        return false;
    });

    MobileAccordion();
    ScrolledSide();
    MobileNav();
    IcosClickContent();
    MainTabs();
    BottomTabs();
    MobileNavSide();
    CloseBtn();
    adjustSideHeight();

    $(window).resize(function () {
        adjustSideHeight();
        BarChart();
        BlockHeight();
    });

    $('#side-nav').scrollspy();

    $('.folders-area a').click(function () {
        var href_ = $(this).attr('href');
        var top_ = $(href_).offset().top;
        var link_ = $(href_).find('.accordion-heading a');
        if (link_.hasClass('collapsed')) {
            link_.trigger('click');
        }
        $('body, html').animate({
            scrollTop: top_
        }, 450);
        return false;
    });

    $('.add-nav-section a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        BlockHeight();
    });

    $('.back-to-top a, .btn-back-to-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 450);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('.btn-back-to-top').fadeIn(450);
        }
        else {
            $('.btn-back-to-top').fadeOut(450);
        }
    });

    if ($("select").length) {
        $("select").uniform();
    }

    if ($('.gallery-area').length) {
        $('.gallery-area .slides').bxSlider({
            slideWidth: 197,
            minSlides: 1,
            maxSlides: 4,
            slideMargin: 20,
            moveSlides: 1,
            pager: false
        });
    }

    if ($('.breaking-news-block').length) {
        $('.breaking-news-block .tick-lst-area ul').bxSlider({
            adaptiveHeight: true,
            mode: 'fade',
            pager: false,
            pause: 5000,
            auto: true
        });
    }

    $(document).click(function (e) {
        if ($('.top-links > li > a.user').hasClass('active') && $(e.target).closest('.account-area').get(0) == null) {
            $('.top-links > li > a.user').removeClass('active');
            $('.overlay-section').hide();
            $('#account-box').hide();
            $('.profilebox').hide();
        }

        if ($('.search-box-frame').hasClass('active') && $(e.target).closest('.search-box-frame').get(0) == null) {
            $('.search-box-frame').removeClass('active');
            $('.search-box-form-holder').animate({
                width: '0'
            }, 550, function () {
                $('.search-box-frame > .fa').stop().fadeIn(200);
            });
        }

        if ($('.top-links > li > a.btn-log').hasClass('active') && $(e.target).closest('.account-area').get(0) == null) {
            $('.top-links > li > a.btn-log').removeClass('active');
            $('.overlay-section').hide();
            $('#account-box').hide();
            $('.profilebox').hide();
        }

        if ($('.m-nav-link').hasClass('active') && $('.m-nav-link').is(':visible') && $(e.target).closest('#sidebar').get(0) == null) {
            $('.m-nav-link').removeClass('active');
            $('#sidebar').stop().animate({
                left: '-255px'
            }, 450);
        }

        if ($('.mobile-side-nav').hasClass('active') && $('.mobile-nav').is(':visible') && $(e.target).closest('.mobile-side-nav').get(0) == null) {
            $('.mobile-side-nav').removeClass('active').stop().animate({
                left: '-280px'
            }, 450);
            $('.mobile-nav').removeClass('active');
        }
    });



    $('.showHideMobileContent h3').click(function () {
        if (!$(this).parent().parent().hasClass('showContent')) {
            $(this).parent().parent().addClass('showContent');
        }
        else {
            $(this).parent().parent().removeClass('showContent');
        }
        return false;
    });

    $('.appsTabNav a').click(function () {
        id = $(this).attr('apps-box-rel');
        $('.appsTabContent, .appsTabNav a, .appsTabTitle').removeClass('active');
        $('#' + id).addClass('active');
        $('.appsTabNav a[apps-box-rel=' + id + ']').addClass('active');
        $('.appsTabTitle[apps-box-rel=' + id + ']').addClass('active');
        return false;
    });

    $('.top-links a:not(.user)').click(function () {
        var href_ = $(this).attr('href');
        if ($(href_).length) {
            $('.overlay-section').show();
            $(this).addClass('active');
            $(href_).stop().fadeIn(400);
        }
        return false;
    });

    $('.popup-holder .btn-close').click(function () {
        $('.overlay-section').hide();
        $('body').removeClass('fixed');
        $(this).closest('.overlay-holder').stop().animate({
            top: '-600px'
        }, 1500);
        return false;
    });

    if ($('.excl-slider').length) {
        $('.excl-slider').flexslider({
            animation: "fade",
            controlNav: true,
            directionNav: false,
            slideshow: false,
            slideshowSpeed: 5000
        });
    }

    if ($('.events-slider').length) {
        $('.events-slider').flexslider({
            animation: "fade",
            slideshow: false,
            slideshowSpeed: 5000
        });
    }

    if ($('.slider-add-section').length) {
        $('.slider-add-section').flexslider({
            animation: "fade",
            controlNav: true,
            directionNav: true,
            slideshow: true,
            pausePlay: true,
            pauseText: '<i class="fa fa-pause"></i>',
            playText: '<i class="fa fa-play"></i>',
            slideshowSpeed: 5000,
            start: function (slider) {
                var btn_prev = slider.closest('.slider-add-section').find('.flex-direction-nav .flex-prev').closest('li').clone(true);
                var btn_next = slider.closest('.slider-add-section').find('.flex-direction-nav .flex-next').closest('li').clone(true);
                slider.closest('.slider-add-section').find('.flex-control-paging').append(btn_next);
                slider.closest('.slider-add-section').find('.flex-control-paging').prepend(btn_prev);
                slider.closest('.slider-add-section').find('.flex-control-paging').append('<li class="play-btn"><span><i class="fa fa-pause"></i></span></li>');
            }
        });
    }

    $(document).on('click', 'li.play-btn > span', function () {
        if (!$(this).closest('li').hasClass('active')) {
            $(this).closest('li').addClass('active');
            $(this).closest('.slider-add-section-hold').find('.flex-pause').trigger('click');
            $(this).find('i').removeClass('fa-pause').addClass('fa-play');
        }
        else {
            $(this).closest('li').removeClass('active');
            $(this).closest('.slider-add-section-hold').find('.flex-play').trigger('click');
            $(this).find('i').removeClass('fa-play').addClass('fa-pause');
        }
        return false;
    });

    if ($('.side-gallery').length) {
        $('.side-gallery').flexslider({
            animation: 'slide',
            controlNav: true,
            directionNav: true,
            slideshow: true,
            slideshowSpeed: 7000
        });
    }


    if ($('.top-info-gallery').length) {
        $('.top-info-gallery').flexslider({
            animation: "fade",
            controlNav: true,
            directionNav: true,
            slideshow: true,
            pausePlay: true,
            pauseText: '<i class="fa fa-pause"></i>',
            playText: '<i class="fa fa-play"></i>',
            slideshowSpeed: 7000,
            after: function (slider) {
                if ($('.navigation-gallery').length) {
                    $('.navigation-gallery .lst li a').removeClass('flex-active');
                    $('.navigation-gallery .lst li').eq(slider.currentSlide).find('a').addClass('flex-active');
                }
            }
        });

        $('.navigation-gallery .btn-prev').click(function () {
            $(this).closest('.top-info-section').find('.flex-prev').trigger('click');
            return false;
        });

        $(document).on('click', '.navigation-gallery .lst a', function () {
            var i_ = $(this).closest('li').index();
            $('.top-info-gallery .flex-control-paging li').eq(i_).find('a').trigger('click');
            return false;
        });

        $('.navigation-gallery .btn-next').click(function () {
            $(this).closest('.top-info-section').find('.flex-next').trigger('click');
            return false;
        });

        $('.navigation-gallery .btn-play').click(function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).closest('.top-info-section').find('.flex-pause').trigger('click');
                $(this).find('span').removeClass('fa-pause').addClass('fa-play');
            }
            else {
                $(this).removeClass('active');
                $(this).closest('.top-info-section').find('.flex-play').trigger('click');
                $(this).find('span').removeClass('fa-play').addClass('fa-pause');
            }
            return false;
        });
        if ($('.navigation-gallery').length) {
            var list_ = $('.top-info-gallery .flex-control-paging li').clone();
            $('.navigation-gallery .lst').append(list_);
        }
        if ($('.navigation-gallery').length && $('.top-info-gallery .slides li').length > 1) {
            $('.navigation-gallery').show();
        }
    }

    if ($('.gallery-area-hold').length) {
        $('.gallery-area-hold').flexslider({
            animation: "fade",
            controlNav: true,
            directionNav: true,
            slideshow: true,
            slideshowSpeed: 5000,
            pausePlay: true,
            pauseText: '<i class="fa fa-pause"></i>',
            playText: '<i class="fa fa-play"></i>',
            slideshowSpeed: 5000,
            start: function (slider) {
                slider.closest('.gallery-area-hold').find('.flex-control-paging').append('<li class="play-btn"><span><i class="fa fa-pause"></i></span></li>');
            }
        });
    }

    if ($('.add-gallery-frame').length) {
        $('.add-gallery-frame').flexslider({
            animation: "fade",
            controlNav: true,
            directionNav: false,
            slideshow: false,
            slideshowSpeed: 5000
        });
    }

    if ($('.slider-row').length) {
        $('.slider-row').flexslider({
            animation: "fade",
            controlNav: false,
            directionNav: false,
            slideshow: true,
            slideshowSpeed: 5000
        });
    }

    /*$('.top-links a.user').click(function(){
        var href_ = $(this).attr('href');
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#main .overlay-section').show();
            $(href_).stop().fadeIn(350);
            $("#account-box").css('top','35px');
        }
        else{
            $(this).removeClass('active');
            $('#main .overlay-section').hide();
            $(href_).hide();
        }
        return false;
    });*/

    $('.btns-row .social-like-btns a.btn-plus').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).text('-');
            $(this).closest('.social-like-btns').find('li.hidden-item').show();
        }
        else {
            $(this).removeClass('active');
            $(this).text('+');
            $(this).closest('.social-like-btns').find('li.hidden-item').hide();
        }
        return false;
    });

    $('.add-tab-nav > li > a.drop').click(function () {
        $(this).closest('li').toggleClass('active-item');
        return false;
    });

    $('.side-nav-lst .m-side-panel-link .fa').click(function () {
        $(this).closest('a').addClass('active');
        $(this).closest('.side-panel').stop().animate({
            marginLeft: -270
        }, 450);
        return false;
    });

    $('.side-nav-lst .w-link').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).closest('li').find('> ul').stop().slideDown(350);
            $(this).find('.fa').removeClass('fa-angle-down').addClass('fa-angle-up');
        }
        else {
            $(this).removeClass('active');
            $(this).closest('li').find('> ul').stop().slideUp(350);
            $(this).find('.fa').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        return false;
    });

    $('.mobile-side-nav .link-back').click(function () {
        $(this).closest('.mobile-side-nav').find('.side-panel').stop().animate({
            marginLeft: 0
        }, 450);
        return false;
    });

    if ($('.add-icos-list').length) {
        var clone_link = $('.add-icos-list .link[href="#box-search"]').closest('li').clone(true);
        $('.top-links').prepend(clone_link);
    }

    $('.events-lst-slide .link-slide').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active')
            $(this).find('.fa').removeClass('fa-angle-down').addClass('fa-angle-up');
            $(this).closest('li').find('.upcoming-events-holder').stop(true, true).slideDown(450);
        }
        else {
            $(this).removeClass('active');
            $(this).find('.fa').removeClass('fa-angle-up').addClass('fa-angle-down');
            $(this).closest('li').find('.upcoming-events-holder').stop(true, true).slideUp(450);
        }
        return false;
    });

    $('.list-faqs a.link').click(function () {
        if (!$(this).closest('li').hasClass('active')) {
            $(this).closest('li').addClass('active')
            $(this).closest('li').siblings().removeClass('active');
            $(this).find('.ico').text('-');
            $(this).closest('li').siblings().find('.ico').text('+');
            $(this).closest('li').find('.text-block').stop(true, true).slideDown(400);
            $(this).closest('li').siblings().find('.text-block:visible').stop(true, true).slideUp(500);
        }
        else {
            $(this).closest('li').removeClass('active');
            $(this).find('.ico').text('+');
            $(this).closest('li').find('.text-block').stop(true, true).slideUp(400);
        }
        return false;
    });

    $('.stats-frame .top-title .link-box a').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).find('.fa').removeClass('fa-plus-circle').addClass('fa-minus-circle');
            $(this).closest('.stats-frame').find('.legend-area').addClass('active').stop(true, true).slideDown(450);
        }
        else {
            $(this).removeClass('active');
            $(this).find('.fa').removeClass('fa-minus-circle').addClass('fa-plus-circle');
            $(this).closest('.stats-frame').find('.legend-area').stop(true, true).slideUp(450, function () {
                $(this).closest('.stats-frame').find('.legend-area').removeClass('active');
            });
        }
        return false;
    });

    $('.directory-detail .box-bottom-hold .ttl-row').click(function () {
        if ($('#main .page-holder').width() == 320) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active')
                $(this).find('span.fa').removeClass('fa-angle-down').addClass('fa-angle-up');
                $(this).closest('.box-bottom-hold').find('.partner-links-frame').stop(true, true).slideDown(450);
            }
            else {
                $(this).removeClass('active');
                $(this).find('span.fa').removeClass('fa-angle-up').addClass('fa-angle-down');
                $(this).closest('.box-bottom-hold').find('.partner-links-frame').stop(true, true).slideUp(450);
            }
            return false;
        }
    });
}

$(function () {
    jQueryMain();
});

function MobileAccordion() {
    $('.m-box-link').click(function () {
        $(this).toggleClass('active').closest('div').find('.box-holder').stop().slideToggle(350);
        return false;
    });

    $('.area-ttl').click(function () {
        if ($('.main-section-holder > .page-holder').width() == 320) {
            $(this).toggleClass('active').closest('div.holder-row').find('.holder').stop().slideToggle(350);
            return false;
        }
    });

    $('.list-inform:not(.no-slide) .list-inform-box').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).find('.fa.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            $(this).next('.hidden-info').stop(true, true).slideDown(450);
            $(this).next('.hidden-info').closest("li").addClass('active');
        }
        else {
            $(this).removeClass('active');
            $(this).find('.fa.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            $(this).next('.hidden-info').stop(true, true).slideUp(450);
        }
    });

    $('.appsTabTitle').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).next('.row.appsTabContent').stop(true, true).slideDown(450);
        }
        else {
            $(this).removeClass('active');
            $(this).next('.row.appsTabContent').stop(true, true).slideUp(450);
        }
    });

    $('.partner-links-area .btn-load-more').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).find('.txt').text('Hide more');
            $(this).find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            $(this).closest('.partner-links-area').find('.partner-links li.hidden-item').stop(true, true).fadeIn(400).css('display', 'inline-block');
        }
        else {
            $(this).removeClass('active');
            $(this).closest('.partner-links-area').find('.partner-links li.hidden-item').stop(true, true).fadeOut(350);
            $(this).find('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            $(this).find('.txt').text('Load more');
        }
        return false;
    });
}

function ScrolledSide() {
    if ($('.side-nav').length && !$('body').hasClass('faq-listing')) {
        var top_ = $('.side-nav').offset().top;
        $(window).on('load scroll resize', function () {
            var top_h = Math.round($('footer').offset().top) - $('.side-nav').height();
            if ($(this).scrollTop() > top_ && $(this).scrollTop() < top_h) {
                $('.side-nav').addClass("fixed");
                //$('.grab-deals-banner.for').addClass("fixed");  // Added for Deals Listing Page Banner by Satheesh
                $('.side-nav').removeClass("bottom");
                $('.side-nav').css('bottom', 'auto');
            }
            else if ($(this).scrollTop() >= top_h) {
                var f_h = $('footer').height();
                $('.side-nav').addClass("fixed bottom").css('bottom', f_h);
            }
            else {
                $('.side-nav').removeClass("fixed");
                //$('.grab-deals-banner.for').removeClass("fixed");   // Added for Deals Listing Page Banner by Satheesh
            }
        });
    }

    $('.side-nav a').click(function () {
        if ($('.m-nav-link').hasClass('active') && $('.m-nav-link').is(':visible')) {
            $('.m-nav-link').removeClass('active');
            $('#sidebar').stop().animate({
                left: '-255px'
            }, 450).hide();
            $('.side-nav').removeClass('fixed');
        }

        var id_ = $(this).attr('href');
        var top_2 = $(id_).offset().top;
        if (!$(this).closest('li').hasClass('active')) {
            $(this).closest('li').addClass('active');
            $(this).closest('li').siblings().removeClass('active');
            $('html, body').stop().animate({
                scrollTop: top_2
            }, 450);
        }
        return false;
    });
}

function MobileNav() {
    $('.m-nav-link').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('#sidebar').addClass('collapsed').show().stop(true, true).animate({
                left: 0
            }, 450);
        }
        else {
            $(this).removeClass('active');
            $('#sidebar').removeClass('collapsed').stop(true, true).animate({
                left: '-255px'
            }, 450);
        }
        return false;
    });
}

function IcosClickContent() {
    $('.add-icos-list a.link').click(function () {
        var id_ = $(this).attr('href');

        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).closest('li').siblings().find('> a').removeClass('active');
            $(id_).stop(true, true).slideDown(450);
            $(id_).siblings().hide();
        }
        else {
            $(this).removeClass('active');
            $(id_).stop(true, true).slideUp(450);
        }
        return false;
    });

    $('.search-m-bar > .hold .btn-close-area .btn-close').click(function () {
        $('.add-icos-list a.link').removeClass('active');
        $(this).closest('.box').slideUp(450);
        return false;
    });
}

function MainTabs() {
    var item_click = $('.top-row-listing > ul a, .view-lst a, .tab-nav-article a, .top-add-tabs a, .tab-nav a, .add-tabs a');

    item_click.click(function () {
        var id_ = $(this).attr('href');

        if (!$(this).parent().hasClass('active')) {
            $(this).parent().siblings().removeClass('active');
            $(this).parent().addClass('active');
            $(id_).siblings().hide().removeClass('active');
            $(id_).addClass('active').hide().fadeIn(410);
        }
        return false;
    });
}

function BottomTabs() {
    $('.add-bottom-nav a').click(function () {
        var id_ = $(this).attr('href');

        if (!$(this).closest('li').hasClass('active')) {
            $(this).closest('.add-bottom-nav').addClass('collapsed');
            $(this).closest('li').siblings().removeClass('active');
            $(this).closest('li').addClass('active');
            $(this).closest('li').find('.fa').addClass('fa-angle-down');
            $(id_).siblings().hide();
            $('.bottom-content').show();
            $(id_).stop(true, true).fadeIn(500);
        }
        else {
            $(this).closest('.add-bottom-nav').removeClass('collapsed');
            $(this).closest('li').removeClass('active');
            $(this).closest('.add-bottom-nav').find('.fa').removeClass('fa-angle-down');
            $('.bottom-content').hide();
            $(id_).stop(true, true).fadeOut(500);

        }
        return false;
    });
}


function MobileNavSide() {
    $('.mobile-nav').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.mobile-side-nav').addClass('active').stop().animate({
                left: 0
            }, 450);
        }
        else {
            $(this).removeClass('active');
            $('.mobile-side-nav').removeClass('active').stop().animate({
                left: '-280px'
            }, 450);
        }
        return false;
    });

    $('.mobile-side-nav .btn-close').click(function () {
        $('.mobile-nav').removeClass('active');
        $('.mobile-side-nav').removeClass('active').stop().animate({
            left: '-280px'
        }, 450);
        return false;
    });
}

function CloseBtn() {
    $(document).on('click', '.popup-box .btn-close', function () {
        $('.overlay-area').remove();
        $(this).closest('.popup-box').remove();
        return false;
    });
}

/*  App Slider */
$(window).load(function () {
    if ($('#appsLandingSlider .flexslider').length) {
        $('#appsLandingSlider .flexslider').flexslider({
            animation: "slide",
            pausePlay: true,
            slideshowSpeed: 7000,
            pauseText: '<i class="fa fa-pause"></i>',
            playText: '<i class="fa fa-play"></i>',
        });
    }

    if ($('.news-land .gallery-area-hold .flex-control-nav').length) {
        $('.news-land .gallery-area-hold .flex-control-nav').prepend('<span class="prev fa fa-angle-left"></span>');
        $('.news-land .gallery-area-hold .flex-control-nav').append('<span class="next fa fa-angle-right"></span>');

        $(document).on('click', '.news-land .gallery-area-hold .flex-control-nav .prev', function () {
            $(this).closest('.gallery-area-hold').find('.flex-direction-nav .flex-prev').trigger('click');
        });

        $(document).on('click', '.news-land .gallery-area-hold .flex-control-nav .next', function () {
            $(this).closest('.gallery-area-hold').find('.flex-direction-nav .flex-next').trigger('click');
        });


    }


});