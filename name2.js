// ==UserScript==
// @name name
// @match https://ticket.tv-asahi.co.jp/tp/ticket/access/5vhYchobmoSl1RIEUpBVWEEIOEYVXVRNJwkUYGN85nsg1BovKpo2bbbDro96I3RD
// ==/UserScript==

(function () {
  'use strict';

  const el = document.querySelector('.gen_code');
  if (el) {
    el.innerHTML = el.innerHTML.replace('藤田 航太', '景山 朋博');
  }

})();
