/**
 *  infiniteSlide
 *  updateClock
 *  goTop
 *  settingColor
 *  openMbMenu
 *  switchPrice
 *  services_btn
 *  counter
 *  dot
 *  viewbox
 */

(function ($) {
    "use strict";

    /* Go Top
    -------------------------------------------------------------------------*/
    var goTop = function () {
        var $goTop = $("#goTop");
        var $borderProgress = $(".border-progress");
        var $footer = $(".tf-footer");

        $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height() - $(window).height();
            var scrollPercent = (scrollTop / docHeight) * 100;
            var progressAngle = (scrollPercent / 100) * 360;

            $borderProgress.css("--progress-angle", progressAngle + "deg");

            var windowBottom = scrollTop + $(window).height();
            var hasFooter = $footer.length > 0;
            var footerOffset = hasFooter ? $footer.offset().top : Infinity;

            if (scrollTop > 100 && windowBottom < footerOffset) {
                $goTop.addClass("show");
            } else {
                $goTop.removeClass("show");
            }
        });

        $goTop.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 100);
        });
    };
    /* Infinite Slide 
    -------------------------------------------------------------------------*/
    var infiniteSlide = function () {
        if ($(".infiniteSlide").length > 0 && $.fn.infiniteslide) {
            $(".infiniteSlide").each(function () {
                var $this = $(this);
                var style = $this.data("style") || "left";
                var clone = $this.data("clone") || 2;
                var speed = $this.data("speed") || 50;
                $this.infiniteslide({
                    speed: speed,
                    direction: style,
                    clone: clone,
                    pauseonhover: false,
                });
            });
        }
    };
    /* Update Clock
    -------------------------------------------------------------------------*/
    var updateClock = () => {
        function startClocks(selector = ".clock") {
            function updateClock() {
                const now = new Date();
                const timeString = now.toLocaleTimeString("en-GB");
                document.querySelectorAll(selector).forEach((el) => {
                    el.textContent = timeString;
                });
            }
            updateClock();
            setInterval(updateClock, 1000);
        }

        startClocks(".clock");
    };
    /* Setting Color
    -------------------------------------------------------------------------*/
    const settingColor = () => {
        if (!$(".settings-color").length) return;

        const COLOR_KEY = "selectedColorIndex";

        const savedIndex = localStorage.getItem(COLOR_KEY);

        if (savedIndex !== null) {
            setColor(savedIndex);
            setActiveItem(savedIndex - 1);
        }

        $(".choose-item").on("click", function () {
            const index = $(this).index();
            setColor(index + 1);
            setActiveItem(index);
            localStorage.setItem(COLOR_KEY, index + 1);
        });

        function setColor(index) {
            $("body").attr("data-color-primary", "color-primary-" + index);
        }

        function setActiveItem(index) {
            $(".choose-item").removeClass("active").eq(index).addClass("active");
        }
    };
    /* Active nav link
    -------------------------------------------------------------------------*/
    var setActiveNavLink = () => {
        var page = window.location.pathname.split("/").pop() || "index.html";
        $(".nav-menu-main .item-link").each(function () {
            var href = $(this).attr("href");
            if (href === page) {
                $(this).addClass("active");
            }
        });
        $(".nav-ul-mb .mb-menu-link").each(function () {
            var href = $(this).attr("href");
            if (href === page) {
                $(this).addClass("active");
            }
        });
    };

    var headerOnScroll = () => {
        var $header = $(".tf-header");
        if (!$header.length) return;

        var lastScrollTop = $(window).scrollTop();
        var scrollThreshold = 8;
        var topOffset = 80;
        var upwardScrollDistance = 0;
        var showAfterUpScroll = 56;

        $(window).on("scroll", function () {
            var currentScrollTop = $(this).scrollTop();
            var delta = currentScrollTop - lastScrollTop;

            if (Math.abs(delta) < scrollThreshold) return;

            if (currentScrollTop <= topOffset) {
                $header.removeClass("header-hidden header-compact");
                upwardScrollDistance = 0;
            } else if (delta > 0) {
                $header.addClass("header-hidden").removeClass("header-compact");
                upwardScrollDistance = 0;
            } else {
                upwardScrollDistance += Math.abs(delta);
                if (upwardScrollDistance >= showAfterUpScroll) {
                    $header.removeClass("header-hidden").addClass("header-compact");
                }
            }

            lastScrollTop = currentScrollTop;
        });
    };

    /* Open Menu
    -------------------------------------------------------------------------*/
    var openMbMenu = () => {
        var menuScrollTop = 0;

        var lockPageScroll = function () {
            menuScrollTop = $(window).scrollTop();
            $("html, body").addClass("mobile-menu-open");
            $("body").css({
                position: "fixed",
                top: -menuScrollTop + "px",
                left: 0,
                right: 0,
                width: "100%",
            });
        };

        var unlockPageScroll = function () {
            $("html, body").removeClass("mobile-menu-open");
            $("body").css({
                position: "",
                top: "",
                left: "",
                right: "",
                width: "",
            });
            $(window).scrollTop(menuScrollTop);
        };

        $(".open-mb-menu").on("click", function () {
            $(".offcanvas-menu").addClass("show");
            $("body").addClass("overflow-hidden");
            lockPageScroll();
        });

        $(".close-mb-menu").on("click", function () {
            $(".offcanvas-menu").removeClass("show");
            $("body").removeClass("overflow-hidden");
            unlockPageScroll();
        });

        /* Close on backdrop click (outside the panel) */
        $(".offcanvas-menu").on("click", function (e) {
            if (!$(e.target).closest(".mb-container").length) {
                $(this).removeClass("show");
                $("body").removeClass("overflow-hidden");
                unlockPageScroll();
            }
        });
    };
    /* switchprice
    -------------------------------------------------------------------------*/
    var switchPrice = () => {
        function formatUSD(n) {
            return '$' + Number(n).toLocaleString('en-US');
        }

        function updatePrices(isYearly) {
            $('.price-number').each(function() {
            const $p = $(this);
            const val = isYearly ? $p.data('year') : $p.data('month');
            $p.text(formatUSD(val));
            $p.next('.price-per').text(isYearly ? '/ year' : '/ month');
            });
        }

        $('#pricingSwitch').on('change', function() {
            updatePrices(this.checked);
        });

        if ($('#pricingSwitch').is(':checked')) {
            updatePrices(true);
        } else {
            updatePrices(false);
        }
    };
    /* services_btn
    -------------------------------------------------------------------------*/
    var services_btn = () => {
        $('.services-image-btn[data-bs-toggle]').on('click', function(){
            if(!$(this).hasClass('active-img')) {
                $('.services-image-btn').removeClass('active-img');
                $(this).addClass('active-img');

                const newImg = $(this).data('img');
                $('.services-image').find('img').css('opacity', 0);
                setTimeout(() => {
                  $('.services-image').find('img').attr('src', newImg).css('opacity', 1);
                }, 200);
            }
        });
    };
    // counter
    var counter = function () {
        if ($(document.body).hasClass("counter-scroll")) {
          var a = 0;
          $(window).scroll(function () {
            var oTop = $(".counter").offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
              if ($().countTo) {
                $(".counter")
                  .find(".number")
                  .each(function () {
                    var to = $(this).data("to"),
                      speed = $(this).data("speed");
                    $(this).countTo({
                      to: to,
                      speed: speed,
                    });
                  });
              }
              a = 1;
            }
          });
        }
    };
    // dot
    var dot = function () {
        if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") return;

        document.querySelectorAll(".pagi-dot").forEach(pagi => {
            const dots = pagi.querySelectorAll("span");
            const activeIndex = [...dots].findIndex(dot =>
                dot.classList.contains("active")
            );
            dots.forEach(dot => dot.classList.remove("active"));
            ScrollTrigger.create({
                trigger: pagi,
                start: "top 95%",
                once: true,
                onEnter: () => {
                    dots.forEach((dot, index) => {
                        if (index <= activeIndex) {
                            gsap.delayedCall(index * 0.4, () => {
                                dots.forEach(d => d.classList.remove("active"));
                                dot.classList.add("active");
                            });
                        }
                    });
                }
            });
        });
    };
    // viewbox
    var viewbox = function () {
        document.querySelectorAll("svg[data-viewbox-desktop]").forEach(svg => {
            const desktopViewBox = svg.dataset.viewboxDesktop;
            const mobileViewBox  = svg.dataset.viewboxMobile;
            const mq = window.matchMedia("(max-width: 767px)");
            const updateViewBox = e => {
                svg.setAttribute(
                    "viewBox",
                    e.matches ? mobileViewBox : desktopViewBox
                );
            };
            updateViewBox(mq);
            mq.addEventListener("change", updateViewBox);
        });
    };
    // load live demos only after explicit interaction
    var liveDemoPreview = function () {
        document.querySelectorAll(".live-demo").forEach((demo) => {
            const iframe = demo.querySelector("iframe[data-src]");
            const trigger = demo.querySelector(".live-demo-trigger");

            if (!iframe || !trigger || demo.dataset.liveDemoBound === "true") return;

            demo.dataset.liveDemoBound = "true";
            trigger.addEventListener("click", function () {
                if (!iframe.src) {
                    iframe.src = iframe.dataset.src;
                }

                demo.classList.add("is-loaded");
                trigger.setAttribute("hidden", "hidden");
            });
        });
    };

    // Dom Ready
    $(function () {
        infiniteSlide();
        updateClock();
        goTop();
        settingColor();
        setActiveNavLink();
        headerOnScroll();
        openMbMenu();
        switchPrice();
        services_btn();
        counter();
        dot();
        viewbox();
        liveDemoPreview();
        if (typeof window.initSwipers === 'function') {
            window.initSwipers();
        }
    });

    window.initDeferredPageEnhancements = function () {
        infiniteSlide();
        counter();
        dot();
        if (typeof window.initSwipers === 'function') {
            window.initSwipers();
        }
    };
})(jQuery);
