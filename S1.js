// ==UserScript==
// @name S5
// @match https://ticket.tv-asahi.co.jp/tp/ticket/access/QbP9lLvsShdV5GvwaN3hmFugbcQ9F1HbdVEIXDtbsXb7bjQFXe3f8sbXeETYSbnS
// ==/UserScript==

(function () {

'use strict';

document.querySelectorAll('.ticket-text-area span').forEach(el => {
  if (el.textContent.includes('整理番号：')) {
    el.innerHTML = el.innerHTML.replace(
      /整理番号：[^<]+/,
      '整理番号：S5'
    );
  }
});
})();