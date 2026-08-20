// ==UserScript==
// @name         KidZania 名前・性別変更
// @match        https://www.kidzania.jp/membersite/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const NEW_NAME = '山田 太郎';
    const NEW_SEX  = '女性'; // 男性 / 女性

    function replaceProfile() {

        // ヘッダー
        const header = document.querySelector('.l-headerAccount__text');
        if (header) {
            header.textContent = `${NEW_NAME}さんの`;
        }

        document.querySelectorAll('.m-form-layoutConfirm__item')
            .forEach(item => {

                const label =
                    item.querySelector('.m-form-layoutConfirm__head .m-text__text');

                const value =
                    item.querySelector('.m-form-layoutConfirm__body .m-text__text');

                if (!label || !value) return;

                if (label.textContent.includes('氏名')) {
                    value.textContent = NEW_NAME;
                }

                if (label.textContent.includes('性別')) {
                    value.textContent = NEW_SEX;
                }

            });

    }

    replaceProfile();
    setInterval(replaceProfile, 100);
})();
