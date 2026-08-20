// ==UserScript==
// @name         KidZania Name Changer
// @match        https://www.kidzania.jp/membersite/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const NEW_NAME = '山田 太郎'; // ←変更したい名前

    function rewrite() {

        // 「○○さんの」
        const header = document.querySelector('.l-headerAccount__text');

        if (header) {
            header.textContent = `${NEW_NAME}さんの`;
        }

        // 搭乗者名
        document
            .querySelectorAll('.m-panel-reserveTicket-info__item')
            .forEach(item => {

                const label = item.querySelector(
                    '.m-panel-reserveTicket-info__text'
                );

                if (
                    label &&
                    label.textContent.trim() === '搭乗者名'
                ) {

                    const value = item.querySelector(
                        '.m-panel-reserveTicket-info__text-main'
                    );

                    if (value) {
                        value.textContent = NEW_NAME;
                    }
                }
            });
    }

    rewrite();

    setInterval(rewrite, 100);

})();
