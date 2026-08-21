// ==UserScript==
// @name FakeAddressBar ticketdive.com (partial match)
// @match https://ticketoive.github.io/*
// @run-at document-start
// ==/UserScript==

(function () {
  'use strict';

  const url = location.href;

  // ★ 部分一致で判定
  if (url.includes("/com/")) {

    // 本物のパスをそのまま使って偽装
    const path = url.replace("https://ticketoive.github.io", "");
    const fakeUrl = "https://ticketdive.com" + path;

    history.replaceState(null, "", fakeUrl);
  }

})();

