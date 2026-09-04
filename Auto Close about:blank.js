// ==UserScript==
// @name         Auto Close about:blank
// @match        about:blank
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(() => {
        try {
            window.close();
        } catch (e) {}
    }, 3000);
})();
`
