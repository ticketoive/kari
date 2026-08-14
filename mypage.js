// ==UserScript==
// @name mypage
// @match  https://account.tv-asahi.co.jp/apps/id_common/update_member.php?service_type_event_id=ticket&screen_id=edit&RTN=/tp/member/ticket
// ==/UserScript==

(function () {
  'use strict';

  // ★ここを自由に変更するだけで他の名前にも応用できる
  const NEW_MAIL = 'helohelo1226@gmail.com';   // ← メールアドレス
  const NEW_LAST = '森';                    // 姓
  const NEW_FIRST = '悠馬';                 // 名
  const NEW_LAST_KANA = 'もり';             // 姓（かな）
  const NEW_FIRST_KANA = 'ゆうま';          // 名（かな）
  const NEW_SEX = 1;                        // 1=男性, 2=女性, 3=回答しない
  const NEW_YEAR = '1999';                  // 生年
  const NEW_MONTH = '01';                   // 月
  const NEW_DAY = '15';                     // 日

  // --- メールアドレス ---
  const mailInput = document.querySelector('input[name="member_info[LOGIN_MAIL]"]');
  if (mailInput) {
    mailInput.removeAttribute('readonly');
    mailInput.value = NEW_MAIL;
  }

  // --- 名前（姓・名） ---
  const lastName = document.querySelector('#MEMBER_NAME1 input');
  const firstName = document.querySelector('#MEMBER_NAME2 input');
  if (lastName) lastName.value = NEW_LAST;
  if (firstName) {
    firstName.removeAttribute('readonly');
    firstName.value = NEW_FIRST;
  }

  // --- ふりがな（姓・名） ---
  const lastKana = document.querySelector('#MEMBER_NAME_KANA1 input');
  const firstKana = document.querySelector('#MEMBER_NAME_KANA2 input');
  if (lastKana) lastKana.value = NEW_LAST_KANA;
  if (firstKana) {
    firstKana.removeAttribute('readonly');
    firstKana.value = NEW_FIRST_KANA;
  }

  // --- 性別 ---
  const sexRadio = document.querySelector(`input[name="member_info[SEX]"][value="${NEW_SEX}"]`);
  if (sexRadio) sexRadio.checked = true;

  // --- 生年月日（年・月・日） ---
  const yearSel = document.querySelector('#BIRTHDAY1 select');
  const monthSel = document.querySelector('#BIRTHDAY2 select');
  const daySel = document.querySelector('#BIRTHDAY3 select');

  if (yearSel) {
    yearSel.removeAttribute('readonly');
    yearSel.value = NEW_YEAR;
  }
  if (monthSel) {
    monthSel.removeAttribute('readonly');
    monthSel.value = NEW_MONTH;
  }
  if (daySel) {
    daySel.removeAttribute('readonly');
    daySel.value = NEW_DAY;
  }

})();
