// ==UserScript==
// @name         KidZania 搭乗者名
// @namespace    https://www.kidzania.jp/
// @version      1.0
// @match        https://www.kidzania.jp/membersite/reserve/confirm/ticket*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function updatePassengerName() {

        // 「増田 佑亮さんの」を取得
        const accountText = document.querySelector('.l-headerAccount__text');

        if (!accountText) return;

        const headerName = accountText.textContent
            .replace('さんの', '')
            .trim();

        // 「搭乗者名」を探す
        document.querySelectorAll('.m-panel-reserveTicket-info__item').forEach(item => {

            const label = item.querySelector('.m-panel-reserveTicket-info__text');

            if (!label) return;

            if (label.textContent.trim() === '搭乗者名') {

                const value = item.querySelector('.m-panel-reserveTicket-info__text-main');

                if (value) {
                    value.textContent = headerName;
                }
            }
        });
    }

    updatePassengerName();

    const observer = new MutationObserver(updatePassengerName);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
