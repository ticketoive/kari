// ==UserScript==
// @name mail
// @match https://ticket.tv-asahi.co.jp/tp/member/payment
// @match https://ticket.tv-asahi.co.jp/tp/member/ticket/unused 
// @match https://ticket.tv-asahi.co.jp/tp/member/ticket/old
// @match https://ticket.tv-asahi.co.jp/tp/member/ticket
// @run-at document-start
// ==/UserScript==

(function () {
  'use strict';

  const NEW_MAIL = 'example@example.com';  // ← ここを好きなメールに変更

  const observer = new MutationObserver(() => {
    const el = document.querySelector('.mypage-id');

    if (el) {
      // 元のメールを含むテキスト部分を強制置換
      const span = el.querySelector('span');
      if (span) {
        // span の後ろのテキストノードを探す
        const textNode = span.nextSibling;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          textNode.textContent = NEW_MAIL;
        }
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });

})();
