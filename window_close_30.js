// ==UserScript==
// @name    30秒でブラウザ閉じる
// @match   https://gunmachan-idolfes.com/*
// @grant   window.close
// ==/UserScript==
(function () {
    'use strict';

    setTimeout(() => {
        console.log('30秒経過。タブを閉じます。');
        window.close();
    }, 30000);
})();
