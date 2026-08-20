// ==UserScript==
// @name         KidZania 名前固定
// @match        https://www.kidzania.jp/membersite/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const NEW_NAME = '山田 太郎'; // ←ここを好きな名前に変更

    function replaceName() {

        // 「○○さんの」
        document.querySelectorAll('.l-headerAccount__text').forEach(el => {

            if (el.textContent.includes('さんの')) {
                el.textContent = `${NEW_NAME}さんの`;
            }

            if (el.textContent.trim() === 'マイページ') {
                el.textContent = 'マイページ';
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

    // SPA対策
    setInterval(replaceName, 200);

})();
    replaceName();

    setInterval(replaceName, 500);
})();
