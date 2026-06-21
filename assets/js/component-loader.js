(function () {
    "use strict";

    var currentScript = document.currentScript;
    var afterScripts = currentScript ? currentScript.getAttribute("data-after-scripts") : "";
    var idleScripts = currentScript ? currentScript.getAttribute("data-idle-scripts") : "";

    function loadScripts(paths) {
        return paths.reduce(function (chain, path) {
            return chain.then(function () {
                return new Promise(function (resolve, reject) {
                    var script = document.createElement("script");
                    script.src = path;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            });
        }, Promise.resolve());
    }

    function loadAfterScripts() {
        var paths = afterScripts.split(",").map(function (path) {
            return path.trim();
        }).filter(Boolean);

        return loadScripts(paths);
    }

    function loadIdleScripts() {
        var paths = idleScripts.split(",").map(function (path) {
            return path.trim();
        }).filter(Boolean);

        if (!paths.length) {
            return Promise.resolve();
        }

        return new Promise(function (resolve) {
            var loaded = false;
            var fallbackTimer = null;

            function cleanup() {
                window.removeEventListener("scroll", start);
                window.removeEventListener("pointerdown", start);
                window.removeEventListener("keydown", start);
                window.removeEventListener("touchstart", start);
                if (fallbackTimer) {
                    window.clearTimeout(fallbackTimer);
                }
            }

            function start() {
                if (loaded) return;
                loaded = true;
                cleanup();
                loadScripts(paths)
                    .then(function () {
                        if (typeof window.initDeferredPageEnhancements === "function") {
                            window.initDeferredPageEnhancements();
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                    })
                    .then(resolve);
            }

            window.addEventListener("scroll", start, { once: true, passive: true });
            window.addEventListener("pointerdown", start, { once: true, passive: true });
            window.addEventListener("keydown", start, { once: true });
            window.addEventListener("touchstart", start, { once: true, passive: true });
            fallbackTimer = window.setTimeout(start, 12000);
        });
    }

    function loadComponent(target) {
        var path = target.getAttribute("data-component");

        if (!path) {
            return Promise.resolve();
        }

        return fetch(path)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Unable to load component: " + path);
                }
                return response.text();
            })
            .then(function (html) {
                target.outerHTML = html;
            });
    }

    function boot() {
        var targets = Array.prototype.slice.call(document.querySelectorAll("[data-component]"));

        Promise.all(targets.map(loadComponent))
            .catch(function (error) {
                console.error(error);
            })
            .then(loadAfterScripts)
            .then(loadIdleScripts)
            .catch(function (error) {
                console.error(error);
            });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
