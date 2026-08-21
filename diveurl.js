// ==UserScript==
// @name FakeAddressBar ticketdive.com
// @match https://ticketoive.github.io/com1/5.html
// @run-at document-start
// ==/UserScript==

(function () {
  'use strict';

  // ★ 本物のURL
  const realUrl = location.href;

  // ★ 偽装したいURL（ドメイン以降は自由に設定）
  const fakeUrl = "https://ticketdive.com/com1/5.html";

  // ★ アドレスバーのURLを見た目だけ変更（ページはそのまま）
  history.replaceState(null, "", fakeUrl);
})();
