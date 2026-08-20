// ==UserScript==
// @name         KidZania 名前固定
// @match        https://www.kidzania.jp/membersite/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const NEW_NAME = '与田 理央那';

    function rewrite() {

        // ヘッダー
        const header =
            document.querySelector('.l-headerAccount__text');

        if (header) {
            header.textContent = `${NEW_NAME}さんの`;
        }

        // 搭乗者名
        const passenger =
            document.querySelectorAll(
                '.m-panel-reserveTicket-info__text-main'
            )[4];

        if (passenger) {
            passenger.textContent = NEW_NAME;
        }
    }

    rewrite();

    setInterval(rewrite, 100);
})();
