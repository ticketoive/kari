// ==UserScript==
// @name ChangeMemberInfoNoFlash
// @match https://account.tv-asahi.co.jp/apps/id_common/update_member.php?service_type_event_id=ticket&screen_id=edit&RTN=/tp/member/ticket
// @run-at document-start
// ==/UserScript==

(function () {
  'use strict';

  const NEW_MAIL = 'example@example.com';
  const NEW_LAST = '森';
  const NEW_FIRST = '悠馬';
  const NEW_LAST_KANA = 'もり';
  const NEW_FIRST_KANA = 'ゆうま';
  const NEW_SEX = 2;
  const NEW_YEAR = '1999';
  const NEW_MONTH = '01';
  const NEW_DAY = '15';

  // 値を強制的に書き換える関数
  function forceValue(selector, newValue) {
    const el = document.querySelector(selector);
    if (!el) return;

    // value を横取りする
    Object.defineProperty(el, 'value', {
      set(v) {
        v = newValue; // 強制的に書き換え
        this.setAttribute('value', v);
      },
      get() {
        return this.getAttribute('value');
      }
    });

    el.setAttribute('value', newValue);
    el.removeAttribute('readonly');
    el.setAttribute('readonly', '');
  }

  // メール
  forceValue('input[name="member_info[LOGIN_MAIL]"]', NEW_MAIL);

  // 名前
  forceValue('#MEMBER_NAME1 input', NEW_LAST);
  forceValue('#MEMBER_NAME2 input', NEW_FIRST);

  // ふりがな
  forceValue('#MEMBER_NAME_KANA1 input', NEW_LAST_KANA);
  forceValue('#MEMBER_NAME_KANA2 input', NEW_FIRST_KANA);

  // 性別
  const sexRadio = document.querySelector(`input[name="member_info[SEX]"][value="${NEW_SEX}"]`);
  if (sexRadio) sexRadio.checked = true;

  // 生年月日
  forceValue('#BIRTHDAY1 select', NEW_YEAR);
  forceValue('#BIRTHDAY2 select', NEW_MONTH);
  forceValue('#BIRTHDAY3 select', NEW_DAY);

})();
