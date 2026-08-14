// ==UserScript==
// @name name
// @match https://ticket.tv-asahi.co.jp/tp/ticket/access/*
// ==/UserScript==

(function () {
  'use strict';

  const el = document.querySelector('.gen_code');
  if (el) {
    el.innerHTML = el.innerHTML.replace('増田 佑亮', '森 悠馬');
  }

})();

