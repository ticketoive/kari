// ==UserScript==
// @name S1
// @match https://ticket.tv-asahi.co.jp/tp/ticket/access/QbP9lLvsShdV5GvwaN3hmFugbcQ9F1HbdVEIXDtbsXb7bjQFXe3f8sbXeETYSbnS
// ==/UserScript==

(function () {

'use strict';

driver.execute_script("""
document.querySelectorAll('.auth_name span').forEach(el => {
  if (el.textContent.trim() === '150') {
    el.textContent = '1';
  }
});
""")

})();
