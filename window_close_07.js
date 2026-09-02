// ==UserScript==
// @name    7秒でブラウザ閉じる
// @match   https://gunmachan-idolfes.com/*
// @grant   window.close
// ==/UserScript==
(function () {
    'use strict';

    setTimeout(() => {
        console.log('7秒経過。タブを閉じます。');
        window.close();
    }, 7000);
})();
