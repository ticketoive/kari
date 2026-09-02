// ==UserScript==
// @name    50秒でブラウザ閉じる
// @match   https://gunmachan-idolfes.com/*
// @grant   window.close
// ==/UserScript==
(function () {
    'use strict';

    setTimeout(() => {
        console.log('50秒経過。タブを閉じます。');
        window.close();
    }, 50000);
})();
