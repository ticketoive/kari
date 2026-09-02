// ==UserScript==
// @name    40秒でブラウザ閉じる
// @match   https://gunmachan-idolfes.com/*
// @grant   window.close
// ==/UserScript==
(function () {
    'use strict';

    setTimeout(() => {
        console.log('40秒経過。タブを閉じます。');
        window.close();
    }, 7
40000);
})();
