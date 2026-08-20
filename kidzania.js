/// ==UserScript==
// @name         KidZania 搭乗者名変更
// @match        https://www.kidzania.jp/membersite/reserve/confirm/ticket*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const NEW_NAME = '山田 太郎'; // ←好きな名前

    function replaceName() {
        document.querySelectorAll('.m-panel-reserveTicket-info__item').forEach(item => {

            const label = item.querySelector('.m-panel-reserveTicket-info__text');

            if (!label) return;

            if (label.textContent.trim() === '搭乗者名') {

                const value = item.querySelector('.m-panel-reserveTicket-info__text-main');

                if (value) {
                    value.textContent = NEW_NAME;
                }
            }
        });
    }

    replaceName();

    new MutationObserver(replaceName).observe(document.body, {
        childList: true,
        subtree: true
    });
})();

})();
