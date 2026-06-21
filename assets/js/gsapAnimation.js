(function ($) {
    "use strict";
    // DOM Ready

    var changetext = function () {
        if ($(".text-color-change").length) {
            $(".text-color-change").each(function () {
                const $el = $(this)[0];

                $el.wordSplit?.revert();
                $el.charSplit?.revert();

                $el.wordSplit = new SplitText($el, { type: "words", wordsClass: "word-wrapper" });
                $el.charSplit = new SplitText($el.wordSplit.words, { type: "chars", charsClass: "char-wrapper" });

                gsap.set($el.charSplit.chars, { color: "#FFFFFF52" });

                gsap.to($el.charSplit.chars, {
                    color: "#ffffff",
                    stagger: { each: 0.03, from: "start" },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: $el,
                        start: "top 70%",
                        end: "bottom 20%",
                        scrub: true,
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }
    };

    var gsapA2 = () => {
        if ($(".gsap-anime-2").length) {
            const cards = document.querySelectorAll(".flip-image");

            function animate() {
                const isMobile = window.innerWidth < 767;
                const cardW = isMobile ? 150 : 325;
                const cardH = isMobile ? 150 : 325;

                const parent = cards[0].parentElement;
                parent.style.position = "relative";
                const centerX = parent.clientWidth / 2 - cardW / 2;
                const centerY = parent.clientHeight / 2 - cardH / 2;

                cards.forEach((card, i) => {
                    card.style.position = "absolute";
                    card.style.zIndex = i + 1;
                });

                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                    scrollTrigger: {
                        trigger: ".gsap-anime-2",
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });

                tl.to(cards, {
                    x: centerX,
                    y: centerY,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                }).to(cards, {
                    x: (i) => {
                        if (i === 0) return centerX - (isMobile ? 180 : 400);
                        if (i === 1) return centerX - (isMobile ? 110 : 240);
                        if (i === 2) return centerX - (isMobile ? 40 : 80);
                        if (i === 3) return centerX + (isMobile ? 40 : 80);
                        if (i === 4) return centerX + (isMobile ? 110 : 240);
                        if (i === 5) return centerX + (isMobile ? 180 : 400);
                        return centerX;
                    },
                    y: (i) => {
                        if (i === 0) return centerY - (isMobile ? 120 : 300);
                        if (i === 1) return centerY - (isMobile ? 70 : 180);
                        if (i === 2) return centerY - (isMobile ? 25 : 60);
                        if (i === 3) return centerY + (isMobile ? 25 : 60);
                        if (i === 4) return centerY + (isMobile ? 70 : 180);
                        if (i === 5) return centerY + (isMobile ? 120 : 300);
                        return centerY;
                    },
                    rotation: -10,
                    rotateX: 4,
                    rotateY: 10,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.3,
                });
            }

            animate();

            window.addEventListener("resize", () => {
                gsap.killTweensOf(".flip-image");
                animate();
            });
        }
    };

    var stackElement = function () {
        if ($(".stack-element").length > 0) {
            let scrollTriggerInstances = [];

            const updateTotalHeight = () => {
                const containerHeight = $(".stack-element-main").outerHeight();

                scrollTriggerInstances.forEach((instance) => instance.kill());
                scrollTriggerInstances = [];

                const elements = document.querySelectorAll(".element:not(:last-child)");

                elements.forEach((element, index) => {
                    const elementHeight = element.offsetHeight;

                    const pinTrigger = ScrollTrigger.create({
                        trigger: element,
                        scrub: 1,
                        start: "top top+=0", // sticky top
                        end: `+=${containerHeight - elementHeight}`,
                        pin: true,
                        pinSpacing: false,
                        animation: gsap.to(element, {
                            scale: 0.9,
                            opacity: 0,
                        }),
                    });

                    scrollTriggerInstances.push(pinTrigger);
                });
            };

            updateTotalHeight();

            ScrollTrigger.create({
                trigger: ".stack-element",
                start: "top top",
                end: "bottom top",
                onLeave: () => {
                    gsap.set(".stack-element .element", {
                        clearProps: "all"
                    });
                },
                onLeaveBack: () => {
                    gsap.set(".stack-element .element", {
                        clearProps: "all"
                    });
                }
            });

            let resizeTimeout;
            window.addEventListener("resize", () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(updateTotalHeight, 150);
            });
        }
    };
    function stackElement2() {
        const container = document.querySelector(".stack-element-2");
        if (!container) return;

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        ScrollTrigger.getAll().forEach((st) => st.kill());

        ScrollTrigger.matchMedia({
            "(min-width: 992px)": () => {
                const elements = container.querySelectorAll(".element");

                let totalHeight = 0;
                elements.forEach((el, i) => {
                    if (i > 0) totalHeight += el.offsetHeight;
                });

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "+=" + totalHeight,
                        scrub: true,
                        pin: true,
                        invalidateOnRefresh: true,
                    },
                });

                elements.forEach((el, i) => {
                    if (i === 0) return;
                    tl.fromTo(el, { y: "100%" }, { y: "0%", duration: el.offsetHeight / totalHeight });
                });

                const st = tl.scrollTrigger;

                if (!container._stackBound) {
                    container.addEventListener("click", (e) => {
                        const action = e.target.closest(".action");
                        if (!action) return;

                        const el = action.closest(".element");
                        const idx = Array.from(elements).indexOf(el);
                        if (idx === -1) return;

                        let nextIndex = idx < elements.length - 1 ? idx + 1 : idx - 1;

                        const progressPer = 1 / (elements.length - 1);
                        const targetProgress = progressPer * nextIndex;

                        const targetScroll = st.start + (st.end - st.start) * targetProgress;

                        gsap.to(window, {
                            duration: 0.6,
                            scrollTo: targetScroll,
                            ease: "power2.out",
                            onStart: () => (st.scrub = false),
                            onComplete: () => (st.scrub = true),
                        });
                    });

                    container._stackBound = true;
                }
            },

            "(max-width: 991px)": () => {
                const elements = container.querySelectorAll(".element");
                elements.forEach((el) => gsap.set(el, { clearProps: "all" }));
            },
        });
    }

    var scrollSmooth = () => {
        if ($("#smooth-wrapper").length > 0) {
            let smoother = ScrollSmoother.create({
                smooth: 2,
                smoothTouch: 0.1,
                effects: true,
            });
        }
    };

    var scrollEffectFade = () => {
        if ($(".effectFade").length) {
            gsap.registerPlugin(ScrollTrigger);

            document.querySelectorAll(".effectFade").forEach((el) => {
                if (el.closest(".section-hero")) {
                    gsap.set(el, { autoAlpha: 1, clearProps: "transform" });
                    return;
                }

                let fromVars = { autoAlpha: 0 };
                let toVars = { autoAlpha: 1, duration: 1, ease: "power3.out" };
                let wrapper = null;
                let startPush = "top 95%";
                let delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
                toVars.delay = delay;

                if (el.classList.contains("fadeUp") && !el.classList.contains("no-div")) {
                    wrapper = document.createElement("div");
                    wrapper.classList.add("overflow-hidden");
                    el.parentNode.insertBefore(wrapper, el);
                    wrapper.appendChild(el);
                }

                if (el.classList.contains("no-div")) {
                    wrapper = null;
                }
                if (el.classList.contains("fadeUp")) {
                    fromVars.y = 50;
                    toVars.y = 0;
                } else if (el.classList.contains("fadeDown")) {
                    fromVars.y = -50;
                    toVars.y = 0;
                } else if (el.classList.contains("fadeLeft")) {
                    fromVars.x = -50;
                    toVars.x = 0;
                } else if (el.classList.contains("fadeRight")) {
                    fromVars.x = 50;
                    toVars.x = 0;
                } else if (el.classList.contains("fadeRotateX")) {
                    fromVars.rotationX = 45;
                    fromVars.yPercent = 100;
                    fromVars.transformOrigin = "top center -50";
                    toVars.rotationX = 0;
                    toVars.yPercent = 0;
                    toVars.transformOrigin = "top center -50";
                    toVars.duration = 1;
                    toVars.ease = "power3.out";
                    if (wrapper) {
                        wrapper.style.perspective = "400px";
                    }
                } else if (el.classList.contains("fadeZoom")) {
                    fromVars.scale = 0.8;
                    toVars.scale = 1;
                }

                if (el.classList.contains("view-visible")) {
                    startPush = "top 101%";
                }

                gsap.set(el, fromVars);

                gsap.to(el, {
                    ...toVars,
                    scrollTrigger: {
                        trigger: el,
                        start: startPush,
                        toggleActions: "play none none none",
                    },
                });
            });
        }
    };

    var loader = function () {
        if ($(".preloader").length) {
            var innerBars = document.querySelectorAll(".inner-bar");
            var increment = 0;

            function animateBars() {
                for (var i = 0; i < 2; i++) {
                    var randomWidth = Math.floor(Math.random() * 101);
                    gsap.to(innerBars[i + increment], {
                        width: randomWidth + "%",
                        duration: 0.3,
                        ease: "none",
                    });
                }

                gsap.delayedCall(0.3, function () {
                    for (var i = 0; i < 2; i++) {
                        gsap.to(innerBars[i + increment], {
                            width: "100%",
                            duration: 0.3,
                            ease: "none",
                        });
                    }

                    increment += 2;

                    if (increment < innerBars.length) {
                        animateBars();
                    } else {
                        var preloaderTL = gsap.timeline({
                            onComplete: () => {
                                $(".preloader").remove();
                                runAnimations();
                            },
                        });

                        preloaderTL.to(".preloader", {
                            "--preloader-clip": "100%",
                            duration: 0.3,
                            ease: "none",
                        });
                    }
                });
            }

            $(window).on("load", function () {
                animateBars();
            });
        } else {
            runAnimations();
        }
    };

    var animateBox = () => {
        if ($(".animate-box").length > 0) {
            gsap.registerPlugin(ScrollTrigger);
            gsap.fromTo(
                ".animate-box",
                { x: -400, y: -100, scale: 0.1 },
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".animate-box",
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    };

    var aboutGlobeAnimation = () => {
        if (!$(".about-globe").length) return;

        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll(".about-globe").forEach((textureImg) => {
            var globeWrap = textureImg.closest(".about-globe-wrap");
            var card = textureImg.closest(".col-left");

            if (!globeWrap || !card) return;

            if (textureImg._aboutGlobeTrigger) {
                textureImg._aboutGlobeTrigger.kill();
            }
            if (textureImg._aboutGlobeReset) {
                textureImg._aboutGlobeReset();
            }

            var canvas = globeWrap.querySelector(".about-globe-canvas");
            if (!canvas) {
                canvas = document.createElement("canvas");
                canvas.className = "about-globe-canvas";
                canvas.setAttribute("aria-hidden", "true");
                globeWrap.insertBefore(canvas, textureImg);
            }

            var ctx = canvas.getContext("2d", { willReadFrequently: true });
            var textureCanvas = document.createElement("canvas");
            var textureCtx = textureCanvas.getContext("2d", { willReadFrequently: true });
            var textureData = null;
            var textureWidth = 0;
            var textureHeight = 0;
            var textureBounds = null;

            var state = {
                active: false,
                width: 0,
                height: 0,
                dpr: 1,
                pitch: 0,
                yaw: 0,
                roll: 0,
                targetPitch: 0,
                targetYaw: 0,
                targetRoll: 0,
                spinYaw: 0,
                spinTween: null,
            };
            globeWrap._aboutGlobeState = state;

            var resizeCanvas = () => {
                var rect = globeWrap.getBoundingClientRect();
                var nextDpr = Math.min(window.devicePixelRatio || 1, 1.6);
                var nextWidth = Math.max(260, Math.round(rect.width * nextDpr));
                var nextHeight = Math.max(152, Math.round(rect.height * nextDpr));

                if (state.width === nextWidth && state.height === nextHeight && state.dpr === nextDpr) return;

                state.width = nextWidth;
                state.height = nextHeight;
                state.dpr = nextDpr;
                canvas.width = nextWidth;
                canvas.height = nextHeight;
                drawGlobe();
            };

            var prepareTexture = () => {
                if (!textureImg.complete || !textureImg.naturalWidth) return false;

                textureWidth = textureImg.naturalWidth;
                textureHeight = textureImg.naturalHeight;
                textureCanvas.width = textureWidth;
                textureCanvas.height = textureHeight;
                textureCtx.clearRect(0, 0, textureWidth, textureHeight);
                textureCtx.drawImage(textureImg, 0, 0, textureWidth, textureHeight);
                textureData = textureCtx.getImageData(0, 0, textureWidth, textureHeight).data;
                textureBounds = getTextureBounds();
                return true;
            };

            var getTextureBounds = () => {
                var minX = textureWidth;
                var minY = textureHeight;
                var maxX = 0;
                var maxY = 0;

                for (var y = 0; y < textureHeight; y += 2) {
                    for (var x = 0; x < textureWidth; x += 2) {
                        var alpha = textureData[(y * textureWidth + x) * 4 + 3];
                        if (alpha > 16) {
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }

                return {
                    centerX: (minX + maxX) * 0.5,
                    centerY: (minY + maxY) * 0.5,
                    radiusX: (maxX - minX) * 0.5,
                    radiusY: (maxY - minY) * 0.5,
                };
            };

            var sampleTexture = (longitude, latitude) => {
                var visibleLongitude = Math.asin(Math.sin(longitude));
                var sampleX = Math.sin(visibleLongitude) * Math.cos(latitude);
                var sampleY = -Math.sin(latitude);
                var x = Math.floor(textureBounds.centerX + sampleX * textureBounds.radiusX);
                var y = Math.floor(textureBounds.centerY + sampleY * textureBounds.radiusY);

                x = gsap.utils.clamp(0, textureWidth - 1, x);
                y = gsap.utils.clamp(0, textureHeight - 1, y);

                var index = (y * textureWidth + x) * 4;
                var alpha = textureData[index + 3];

                return [
                    textureData[index],
                    textureData[index + 1],
                    textureData[index + 2],
                    alpha > 16 ? alpha : 255,
                ];
            };

            var drawGlobe = () => {
                if (!textureData || !state.width || !state.height) return;

                var width = state.width;
                var height = state.height;
                var image = ctx.createImageData(width, height);
                var data = image.data;
                var cx = width * 0.5;
                var cy = height * 0.52;
                var radius = Math.min(width * 0.42, height * 0.48);
                var radiusSq = radius * radius;
                var yaw = state.yaw + state.spinYaw;
                var pitch = state.pitch;
                var cosYaw = Math.cos(-yaw);
                var sinYaw = Math.sin(-yaw);
                var cosPitch = Math.cos(-pitch);
                var sinPitch = Math.sin(-pitch);
                var lightX = -0.42;
                var lightY = -0.5;
                var lightZ = 0.76;

                for (var y = 0; y < height; y++) {
                    var dy = y - cy;
                    for (var x = 0; x < width; x++) {
                        var dx = x - cx;
                        var distanceSq = dx * dx + dy * dy;
                        var output = (y * width + x) * 4;

                        if (distanceSq > radiusSq) {
                            data[output + 3] = 0;
                            continue;
                        }

                        var nx = dx / radius;
                        var ny = dy / radius;
                        var nz = Math.sqrt(1 - nx * nx - ny * ny);
                        var py = ny * cosPitch - nz * sinPitch;
                        var pz = ny * sinPitch + nz * cosPitch;
                        var ox = nx * cosYaw + pz * sinYaw;
                        var oz = -nx * sinYaw + pz * cosYaw;
                        var oy = py;
                        var longitude = Math.atan2(ox, oz);
                        var latitude = Math.asin(gsap.utils.clamp(-1, 1, oy));
                        var sample = sampleTexture(longitude, latitude);
                        var edge = Math.sqrt(distanceSq) / radius;
                        var light = Math.max(0, nx * lightX + ny * lightY + nz * lightZ);
                        var shade = 0.32 + light * 0.88;
                        var rim = Math.pow(edge, 3) * 0.22;
                        var alpha = sample[3] * gsap.utils.clamp(0, 1, (1 - edge) * 18);

                        data[output] = Math.min(255, sample[0] * shade + 18 * rim);
                        data[output + 1] = Math.min(255, sample[1] * shade + 26 * rim);
                        data[output + 2] = Math.min(255, sample[2] * shade + 40 * rim);
                        data[output + 3] = alpha;
                    }
                }

                ctx.clearRect(0, 0, width, height);
                ctx.save();
                ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
                ctx.shadowBlur = radius * 0.12;
                ctx.shadowOffsetY = radius * 0.05;
                ctx.putImageData(image, 0, 0);
                ctx.restore();

                var gradient = ctx.createRadialGradient(cx - radius * 0.32, cy - radius * 0.34, radius * 0.04, cx, cy, radius);
                gradient.addColorStop(0, "rgba(255,255,255,0.26)");
                gradient.addColorStop(0.36, "rgba(255,255,255,0.06)");
                gradient.addColorStop(0.78, "rgba(0,0,0,0)");
                gradient.addColorStop(1, "rgba(0,0,0,0.26)");
                ctx.globalCompositeOperation = "source-atop";
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
            };

            var renderGlobe = () => {
                if (!state.active) return;

                state.pitch += (state.targetPitch - state.pitch) * 0.08;
                state.yaw += (state.targetYaw - state.yaw) * 0.08;
                state.roll += (state.targetRoll - state.roll) * 0.08;

                gsap.set(globeWrap, { rotateZ: state.roll * 10 });
                drawGlobe();
            };

            var resetInteraction = () => {
                state.active = false;
                state.pitch = 0;
                state.yaw = 0;
                state.roll = 0;
                state.targetPitch = 0;
                state.targetYaw = 0;
                state.targetRoll = 0;
                state.spinYaw = 0;

                if (state.spinTween) {
                    state.spinTween.kill();
                    state.spinTween = null;
                }

                gsap.ticker.remove(renderGlobe);
                drawGlobe();
            };
            textureImg._aboutGlobeReset = resetInteraction;

            if (!globeWrap._aboutGlobeInteractiveBound) {
                globeWrap.addEventListener("click", function () {
                    var liveState = globeWrap._aboutGlobeState;
                    if (!liveState || !liveState.active) return;

                    if (liveState.spinTween) {
                        liveState.spinTween.kill();
                    }

                    liveState.spinTween = gsap.to(liveState, {
                        spinYaw: liveState.spinYaw + Math.PI * 2,
                        duration: 1.15,
                        ease: "power3.out",
                    });
                });

                globeWrap._aboutGlobeInteractiveBound = true;
            }

            gsap.set(globeWrap, {
                autoAlpha: 0,
                yPercent: 18,
                scale: 0.84,
                rotateZ: -4,
                filter: "blur(8px) saturate(0.85)",
                transformOrigin: "50% 55%",
            });

            var tween = gsap.timeline({ paused: true });

            tween
                .to(globeWrap, {
                    autoAlpha: 1,
                    yPercent: 0,
                    scale: 1.04,
                    rotateZ: 0,
                    filter: "blur(0px) saturate(1.12)",
                    duration: 0.9,
                    ease: "power4.out",
                })
                .to(globeWrap, {
                    scale: 0.985,
                    duration: 0.22,
                    ease: "power2.inOut",
                })
                .to(globeWrap, {
                    scale: 1,
                    filter: "blur(0px) saturate(1)",
                    duration: 0.42,
                    ease: "elastic.out(1, 0.55)",
                });

            textureImg._aboutGlobeTrigger = ScrollTrigger.create({
                trigger: globeWrap,
                start: "top 88%",
                end: "bottom 12%",
                onEnter: function () {
                    resetInteraction();
                    resizeCanvas();
                    tween.restart();
                },
                onEnterBack: function () {
                    resetInteraction();
                    resizeCanvas();
                    tween.restart();
                },
                onLeave: function () {
                    resetInteraction();
                    tween.pause(0);
                },
                onLeaveBack: function () {
                    resetInteraction();
                    tween.pause(0);
                },
            });

            tween.eventCallback("onComplete", function () {
                state.active = true;
                gsap.ticker.add(renderGlobe);
            });

            if (prepareTexture()) {
                resizeCanvas();
            } else {
                textureImg.addEventListener("load", function () {
                    prepareTexture();
                    resizeCanvas();
                }, { once: true });
            }

            window.addEventListener("resize", resizeCanvas, { passive: true });
        });
    };

    aboutGlobeAnimation = () => {
        var wraps = document.querySelectorAll(".about-globe-wrap");
        if (!wraps.length) return;

        gsap.registerPlugin(ScrollTrigger);

        var loadScript = (src) => {
            window._aboutGlobeScripts = window._aboutGlobeScripts || {};
            if (window._aboutGlobeScripts[src]) return window._aboutGlobeScripts[src];

            window._aboutGlobeScripts[src] = new Promise((resolve, reject) => {
                var existing = document.querySelector('script[src="' + src + '"]');
                if (existing) {
                    existing.addEventListener("load", resolve, { once: true });
                    existing.addEventListener("error", reject, { once: true });
                    if (existing.dataset.loaded === "true") resolve();
                    return;
                }

                var script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = () => {
                    script.dataset.loaded = "true";
                    resolve();
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });

            return window._aboutGlobeScripts[src];
        };

        Promise.all([
            loadScript("https://cdn.jsdelivr.net/npm/globe.gl"),
            import("https://esm.sh/three"),
        ]).then(([, THREE]) => {
            if (!window.Globe || !THREE) return;

            wraps.forEach((wrap) => {
                var card = wrap.closest(".col-left");
                var target = wrap.querySelector(".about-globe-viz");
                var locationButton = card ? card.querySelector(".about-globe-location-btn") : null;
                if (!card || !target) return;

                if (wrap._aboutGlobeCleanup) {
                    wrap._aboutGlobeCleanup();
                }

                target.innerHTML = "";

                var state = {
                    active: false,
                    lat: 6,
                    lng: -18,
                    targetLat: 6,
                    targetLng: -18,
                    spinLng: 0,
                    altitude: 1.9,
                    autoSpinPausedUntil: 0,
                    frame: null,
                    spinTween: null,
                    resizeHandler: null,
                };
                var boudha = {
                    lat: 27.7215,
                    lng: 85.362,
                    label: "Boudha, Kathmandu",
                    color: "#ff2f1f",
                };

                if (!document.getElementById("about-globe-pin-style")) {
                    var pinStyle = document.createElement("style");
                    pinStyle.id = "about-globe-pin-style";
                    pinStyle.textContent = "@keyframes aboutGlobePinPulse{0%{transform:translate(-50%,-50%) scale(.55);opacity:.82}70%{transform:translate(-50%,-50%) scale(1.25);opacity:.12}100%{transform:translate(-50%,-50%) scale(1.45);opacity:0}}";
                    document.head.appendChild(pinStyle);
                }

                var world = new Globe(target, { animateIn: false })
                    .globeImageUrl("https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg")
                    .bumpImageUrl("https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png")
                    .backgroundColor("rgba(0,0,0,0)")
                    .showAtmosphere(true)
                    .atmosphereColor("#ffffff")
                    .atmosphereAltitude(0.18)
                    .ringsData([]);

                if (world.htmlElementsData) {
                    world
                        .htmlElementsData([])
                        .htmlLat("lat")
                        .htmlLng("lng")
                        .htmlAltitude(0.075)
                        .htmlElement((d) => {
                            var marker = document.createElement("div");
                            var glow = document.createElement("span");
                            var pin = document.createElement("span");

                            marker.title = d.label;
                            marker.style.position = "relative";
                            marker.style.width = "58px";
                            marker.style.height = "58px";
                            marker.style.transform = "translate(-50%, -50%)";
                            marker.style.pointerEvents = "none";

                            glow.style.position = "absolute";
                            glow.style.left = "50%";
                            glow.style.top = "50%";
                            glow.style.width = "48px";
                            glow.style.height = "48px";
                            glow.style.borderRadius = "50%";
                            glow.style.border = "2px solid rgba(255,47,31,0.72)";
                            glow.style.background = "radial-gradient(circle, rgba(255,47,31,0.26) 0%, rgba(255,47,31,0.14) 42%, rgba(255,47,31,0) 72%)";
                            glow.style.boxShadow = "0 0 24px rgba(255,47,31,0.45)";
                            glow.style.animation = "aboutGlobePinPulse 1.45s ease-out infinite";

                            pin.style.position = "absolute";
                            pin.style.left = "50%";
                            pin.style.top = "50%";
                            pin.style.width = "18px";
                            pin.style.height = "18px";
                            pin.style.borderRadius = "50% 50% 50% 0";
                            pin.style.background = d.color;
                            pin.style.border = "2px solid #fff";
                            pin.style.boxShadow = "0 8px 18px rgba(0,0,0,0.35)";
                            pin.style.transform = "translate(-50%, -84%) rotate(-45deg)";

                            marker.appendChild(glow);
                            marker.appendChild(pin);

                            return marker;
                        });
                }

                var controls = world.controls();
                controls.enableZoom = false;
                controls.enablePan = false;
                controls.autoRotate = false;
                controls.autoRotateSpeed = 0.35;

                world.pointOfView({ lat: state.lat, lng: state.lng, altitude: state.altitude }, 0);

                var resize = () => {
                    var rect = wrap.getBoundingClientRect();
                    world.width(Math.max(280, Math.round(rect.width)));
                    world.height(Math.max(164, Math.round(rect.height)));
                };

                resize();
                state.resizeHandler = resize;
                window.addEventListener("resize", state.resizeHandler, { passive: true });

                var clouds = null;
                var cloudsFrame = null;
                var cloudsUrl = "https://cdn.jsdelivr.net/gh/vasturiano/globe.gl/example/clouds/clouds.png";

                new THREE.TextureLoader().load(cloudsUrl, (cloudsTexture) => {
                    clouds = new THREE.Mesh(
                        new THREE.SphereGeometry(world.getGlobeRadius() * 1.004, 75, 75),
                        new THREE.MeshPhongMaterial({
                            map: cloudsTexture,
                            transparent: true,
                            opacity: 0.42,
                            depthWrite: false,
                        })
                    );
                    world.scene().add(clouds);
                });

                var render = () => {
                    if (!state.active) return;

                    state.lat += (state.targetLat - state.lat) * 0.08;
                    state.lng += (state.targetLng - state.lng) * 0.08;
                    if (Date.now() > state.autoSpinPausedUntil) {
                        state.spinLng += 0.075;
                    }

                    world.pointOfView({
                        lat: state.lat,
                        lng: state.lng + state.spinLng,
                        altitude: state.altitude,
                    }, 0);

                    if (clouds) {
                        clouds.rotation.y += -0.006 * Math.PI / 180;
                    }

                    state.frame = requestAnimationFrame(render);
                };

                var start = () => {
                    state.active = true;
                    controls.autoRotate = true;
                    wrap.classList.add("is-webgl-ready");
                    cancelAnimationFrame(state.frame);
                    state.frame = requestAnimationFrame(render);
                };

                var stop = () => {
                    state.active = false;
                    controls.autoRotate = false;
                    state.targetLat = 6;
                    state.targetLng = -18;
                    state.lat = 6;
                    state.lng = -18;
                    state.spinLng = 0;
                    state.altitude = 1.9;
                    state.autoSpinPausedUntil = 0;
                    if (locationButton) {
                        locationButton.classList.remove("is-active");
                    }

                    if (state.spinTween) {
                        state.spinTween.kill();
                        state.spinTween = null;
                    }

                    world.ringsData([]);
                    if (world.htmlElementsData) {
                        world.htmlElementsData([]);
                    }

                    cancelAnimationFrame(state.frame);
                    world.pointOfView({ lat: state.lat, lng: state.lng, altitude: state.altitude }, 0);
                };

                var reveal = gsap.timeline({ paused: true })
                    .fromTo(wrap, {
                        autoAlpha: 0,
                        yPercent: 16,
                        scale: 0.86,
                        filter: "blur(8px) saturate(0.85)",
                    }, {
                        autoAlpha: 1,
                        yPercent: 0,
                        scale: 1.04,
                        filter: "blur(0px) saturate(1.12)",
                        duration: 0.9,
                        ease: "power4.out",
                    })
                    .to(wrap, {
                        scale: 1,
                        filter: "blur(0px) saturate(1)",
                        duration: 0.42,
                        ease: "elastic.out(1, 0.55)",
                    });

                reveal.eventCallback("onComplete", start);

                var trigger = ScrollTrigger.create({
                    trigger: wrap,
                    start: "top 88%",
                    end: "bottom 12%",
                    onEnter: () => {
                        stop();
                        resize();
                        reveal.restart();
                    },
                    onEnterBack: () => {
                        stop();
                        resize();
                        reveal.restart();
                    },
                    onLeave: () => {
                        stop();
                        reveal.pause(0);
                    },
                    onLeaveBack: () => {
                        stop();
                        reveal.pause(0);
                    },
                });

                var onClick = () => {
                    if (!state.active) return;

                    if (state.spinTween) {
                        state.spinTween.kill();
                    }

                    state.spinTween = gsap.to(state, {
                        spinLng: state.spinLng + 360,
                        duration: 1.15,
                        ease: "power3.out",
                    });
                };

                var onShowBoudha = (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (!state.active) {
                        start();
                    }

                    if (state.spinTween) {
                        state.spinTween.kill();
                        state.spinTween = null;
                    }

                    state.spinLng = 0;
                    state.autoSpinPausedUntil = Date.now() + 12000;
                    state.targetLat = boudha.lat;
                    state.targetLng = boudha.lng;
                    if (locationButton) {
                        locationButton.classList.add("is-active");
                    }

                    world.ringsData([]);

                    if (world.htmlElementsData) {
                        world.htmlElementsData([boudha]);
                    }

                    gsap.to(state, {
                        lat: boudha.lat,
                        lng: boudha.lng,
                        altitude: 1.42,
                        duration: 1.35,
                        ease: "power3.inOut",
                        onUpdate: () => {
                            world.pointOfView({
                                lat: state.lat,
                                lng: state.lng,
                                altitude: state.altitude,
                            }, 0);
                        },
                    });

                    gsap.fromTo(wrap, { scale: 1 }, {
                        scale: 1.015,
                        duration: 0.22,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.out",
                    });
                };

                wrap.addEventListener("click", onClick);
                if (locationButton) {
                    locationButton.addEventListener("click", onShowBoudha);
                }

                wrap._aboutGlobeCleanup = () => {
                    stop();
                    trigger.kill();
                    reveal.kill();
                    window.removeEventListener("resize", state.resizeHandler);
                    wrap.removeEventListener("click", onClick);
                    if (locationButton) {
                        locationButton.removeEventListener("click", onShowBoudha);
                    }

                    if (clouds) {
                        world.scene().remove(clouds);
                        clouds.geometry.dispose();
                        clouds.material.map.dispose();
                        clouds.material.dispose();
                    }
                    cancelAnimationFrame(cloudsFrame);
                };
            });
        }).catch((error) => {
            console.error("Unable to load globe.gl", error);
        });
    };

    /* Tech Progress
    ---------------------------------------------------------- */
    var techProgress = () => {
        gsap.utils.toArray(".progress-line").forEach((el) => {
            const progress = el.dataset.progress;

            gsap.fromTo(
                el,
                { width: "15%" },
                {
                    width: progress + "%",
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    };

    // animationGrow
    const animationGrow = () => {
        if (!$(".img-transform-3")) return;
        var grow = document.querySelectorAll(".img-transform-3");
        grow.forEach((item) => {
            gsap.to(item, {
                transform: "translate(-20px,-20px)",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 60%",
                    end: "top center",
                },
            });
        });

        if (!$(".img-grow-1")) return;
        var grow1 = document.querySelectorAll(".img-grow-1");
        grow1.forEach((item) => {
            gsap.to(item, {
                transform: "scale(1.15) rotate(30deg)",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 90%",
                    end: "top center",
                },
            });
        });
        if (!$(".img-grow-2")) return;
        var grow1 = document.querySelectorAll(".img-grow-2");
        grow1.forEach((item) => {
            gsap.to(item, {
                transform: "scale(1.15) rotate(-12deg)",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 90%",
                    end: "top center",
                },
            });
        });
        if (!$(".img-grow-3")) return;
        var grow1 = document.querySelectorAll(".img-grow-3");
        grow1.forEach((item) => {
            gsap.to(item, {
                transform: "scale(1.15) rotate(-15deg)",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 90%",
                    end: "top center",
                },
            });
        });
        if (!$(".img-grow-4")) return;
        var grow1 = document.querySelectorAll(".img-grow-4");
        grow1.forEach((item) => {
            gsap.to(item, {
                transform: "scale(1.15) rotate(-15deg)",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 90%",
                    end: "top center",
                },
            });
        });
        if (!$(".img-grow-5")) return;
        var grow1 = document.querySelectorAll(".img-grow-5");
        grow1.forEach((item) => {
            gsap.to(item, {
                transform: "scale(1.15) rotate(15deg)",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 90%",
                    end: "top center",
                },
            });
        });
        if (!$(".img-grow-6")) return;
        var grow1 = document.querySelectorAll(".img-grow-6");
        grow1.forEach((item) => {
            gsap.to(item, {
                transform: "scale(1.1) rotate(30deg)",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 90%",
                    end: "top center",
                },
            });
        });

        if (!$(".grow-1")) return;
        var grow2 = document.querySelectorAll(".grow-1");
        grow2.forEach((item) => {
            gsap.to(item, {
                transform: "scale(1.2)",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 90%",
                    end: "top center",
                },
            });
        });
    };

    var runAnimations = () => {
        stackElement();
        scrollSmooth();
        stackElement2();
        gsapA2();
        changetext();
        scrollEffectFade();
        aboutGlobeAnimation();
        animateBox();
        techProgress();
        animationGrow();
    };

    $(function () {
        loader();
    });


    $(window).on("load", function () {
        const hash = window.location.hash;
        if (hash && $(hash).length) {
            setTimeout(() => {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: hash,
                    ease: "power2.out",
                });
            }, 800);
        }
    });
})(jQuery);
