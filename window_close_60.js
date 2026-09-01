// ==UserScript==
// @name    60秒でブラウザ閉じる
// @match   https://gunmachan-idolfes.com/*
// @grant   window.close
// ==/UserScript==
(function () {
    'use strict';

    setTimeout(() => {
        console.log('60秒経過。タブを閉じます。');
        window.close();
    }, 60000);
})();
