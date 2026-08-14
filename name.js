// ==UserScript==
// @name name
// @match https://ticket.tv-asahi.co.jp/tp/ticket/access/lC2oCtnUETRk2zZPdufw2j9HZYAOQfeaj650FGJp7CS8FNpNBXoMQYE0MYu4DVNL
// ==/UserScript==

(function () {
  'use strict';

  document.querySelectorAll('. gen_code span').forEach(el => {
    if (el.textContent.trim() === '増田 佑亮') {
      el.textContent = '森 悠馬';
    }
  });

})();
