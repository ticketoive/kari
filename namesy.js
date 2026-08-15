// ==UserScript==
// @name namesy
// @match https://ticket.tv-asahi.co.jp/tp/ticket/access/wnCaGUd9adyd22IbRVw5ja602l7XypjovY1DqA3UYlWzqiLk2P6CChhppEIByapP
// ==/UserScript==

(function () {
  'use strict';

  const el = document.querySelector('.gen_code');
  if (el) {
    el.innerHTML = el.innerHTML.replace('小林  琢弥', '齋藤 将弘');
  }

})();

