// ==UserScript==
// @name    70秒でブラウザ閉じる
// @match   https://gunmachan-idolfes.com/*
// @grant   window.close
// ==/UserScript==
(function () {
    'use strict';

    setTimeout(() => {
        console.log('70秒経過。タブを閉じます。');
        window.close();
    }, 70000);
})();
