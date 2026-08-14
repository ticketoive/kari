// ==UserScript==
// @name ChangeMemberInfoInstant
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

  // DOM がまだ構築中なので、監視して書き換える
  const observer = new MutationObserver(() => {

    // メール
    const mailInput = document.querySelector('input[name="member_info[LOGIN_MAIL]"]');
    if (mailInput) {
      mailInput.removeAttribute('readonly');
      mailInput.value = NEW_MAIL;
      mailInput.setAttribute('readonly', '');
    }

    // 名前
    const lastName = document.querySelector('#MEMBER_NAME1 input');
    const firstName = document.querySelector('#MEMBER_NAME2 input');
    if (lastName) lastName.value = NEW_LAST;
    if (firstName) {
      firstName.removeAttribute('readonly');
      firstName.value = NEW_FIRST;
      firstName.setAttribute('readonly', '');
    }

    // ふりがな
    const lastKana = document.querySelector('#MEMBER_NAME_KANA1 input');
    const firstKana = document.querySelector('#MEMBER_NAME_KANA2 input');
    if (lastKana) lastKana.value = NEW_LAST_KANA;
    if (firstKana) {
      firstKana.removeAttribute('readonly');
      firstKana.value = NEW_FIRST_KANA;
      firstKana.setAttribute('readonly', '');
    }

    // 性別
    const sexRadio = document.querySelector(`input[name="member_info[SEX]"][value="${NEW_SEX}"]`);
    if (sexRadio) sexRadio.checked = true;

    // 生年月日
    const yearSel = document.querySelector('#BIRTHDAY1 select');
    const monthSel = document.querySelector('#BIRTHDAY2 select');
    const daySel = document.querySelector('#BIRTHDAY3 select');

    if (yearSel) {
      yearSel.removeAttribute('readonly');
      yearSel.value = NEW_YEAR;
      yearSel.setAttribute('readonly', '');
    }
    if (monthSel) {
      monthSel.removeAttribute('readonly');
      monthSel.value = NEW_MONTH;
      monthSel.setAttribute('readonly', '');
    }
    if (daySel) {
      daySel.removeAttribute('readonly');
      daySel.value = NEW_DAY;
      daySel.setAttribute('readonly', '');
    }

  });

  observer.observe(document, { childList: true, subtree: true });

})();
