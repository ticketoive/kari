// ==UserScript==
// @name         KidZania 保護者ページ
// @match        https://www.kidzania.jp/membersite/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const NEW_NAME = '山田 太郎';
    const NEW_KANA = 'ヤマダ タロウ';
    const NEW_SEX  = '女性';

    function replaceProfile() {

        // ヘッダー
        const header = document.querySelector('.l-headerAccount__text');
        if (header) {
            header.textContent = `${NEW_NAME}さんの`;
        }

        document.querySelectorAll('.m-form-layoutConfirm__item')
            .forEach(item => {

                const label =
                    item.querySelector(
                        '.m-form-layoutConfirm__head .m-text__text'
                    );

                const value =
                    item.querySelector(
                        '.m-form-layoutConfirm__body .m-text__text'
                    );

                if (!label || !value) return;

                const text = label.textContent;

                // 氏名
                if (text.includes('氏名（カタカナ）')) {
                    value.textContent = NEW_KANA;
                }
                else if (text.includes('氏名')) {
                    value.textContent = NEW_NAME;
                }

                // 性別
                if (text.includes('性別')) {
                    value.textContent = NEW_SEX;
                }
            });

    }

    replaceProfile();

    // キッザニア側の再描画対策
    setInterval(replaceProfile, 100);
})();
