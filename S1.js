// ==UserScript==
// @name S1
// @match https://ticket.tv-asahi.co.jp/tp/ticket/access/lC2oCtnUETRk2zZPdufw2j9HZYAOQfeaj650FGJp7CS8FNpNBXoMQYE0MYu4DVNL
// ==/UserScript==

(function () {
  'use strict';

  document.querySelectorAll('.auth_name span').forEach(el => {
    if (el.textContent.trim() === '150') {
      el.textContent = '1';
    }
  });

})();

