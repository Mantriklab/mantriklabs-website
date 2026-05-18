(function () {
    "use strict";

    var currentScript = document.currentScript;
    var afterScripts = currentScript ? currentScript.getAttribute("data-after-scripts") : "";

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

    function loadComponent(target) {
        var path = target.getAttribute("data-component");

        if (!path) {
            return Promise.resolve();
        }

        return fetch(path, { cache: "no-cache" })
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
