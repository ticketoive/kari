// ==UserScript==
// @name    80秒でブラウザ閉じる
// @match   https://gunmachan-idolfes.com/*
// @grant   window.close
// ==/UserScript==
(function () {
    'use strict';

    setTimeout(() => {
        console.log('80秒経過。タブを閉じます。');
        window.close();
    }, 80000);
})();
