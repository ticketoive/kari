// ==UserScript==
// @name         KidZania 名前変更
// @match        https://www.kidzania.jp/membersite/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const NEW_NAME = '山田 太郎'; // ←変更したい名前

    function replaceName() {

        // ○○さんの
        document.querySelectorAll('.l-headerAccount__text').forEach(el => {
            if (el.textContent.includes('さんの')) {
                el.textContent = `${NEW_NAME}さんの`;
            }
        });

        // 搭乗者名
        document.querySelectorAll('.m-panel-reserveTicket-info__item').forEach(item => {

            const label = item.querySelector('.m-panel-reserveTicket-info__text');

            if (
                label &&
                label.textContent.trim() === '搭乗者名'
            ) {

                const value = item.querySelector('.m-panel-reserveTicket-info__text-main');

                if (value) {
                    value.textContent = NEW_NAME;
                }
            }
        });
    }

    replaceName();

    setInterval(replaceName, 500);
})();
