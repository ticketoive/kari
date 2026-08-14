// ==UserScript==
// @name mypage
// @match https://account.tv-asahi.co.jp/apps/id_common/update_member.php?service_type_event_id=ticket&screen_id=edit&RTN=/tp/member/ticket
// @run-at document-start
// ==/UserScript==

(function () {
  'use strict';

  const NEW_MAIL = 'example@example.com';
  const NEW_LAST = '増田';     // ← 姓（編集可能にする）
  const NEW_FIRST = '佑亮';  // ← 名（グレーアウトに戻す）
  const NEW_LAST_KANA = 'ますだ';
  const NEW_FIRST_KANA = 'ゆうすけ';
  const NEW_SEX = 1;
  const NEW_YEAR = '1997';
  const NEW_MONTH = '12';
  const NEW_DAY = '26';

  const observer = new MutationObserver(() => {

    // --- 姓（編集可能にする＝readonly を付けない） ---
    const lastName = document.querySelector('#MEMBER_NAME1 input');
    if (lastName) {
      Object.defineProperty(lastName, 'value', {
        set(v) {
          v = NEW_LAST;
          this.setAttribute('value', v);
        },
        get() {
          return this.getAttribute('value');
        }
      });

      lastName.removeAttribute('readonly');   // ← グレーアウトしない
      lastName.setAttribute('value', NEW_LAST);
    }

    // --- 名（グレーアウトに戻す） ---
    const firstName = document.querySelector('#MEMBER_NAME2 input');
    if (firstName) {
      Object.defineProperty(firstName, 'value', {
        set(v) {
          v = NEW_FIRST;
          this.setAttribute('value', v);
        },
        get() {
          return this.getAttribute('value');
        }
      });

      firstName.removeAttribute('readonly');
      firstName.setAttribute('value', NEW_FIRST);
      firstName.setAttribute('readonly', ''); // ← グレーアウトに戻す
    }

    // --- ふりがな（姓は編集可能、名はグレーアウト） ---
    const lastKana = document.querySelector('#MEMBER_NAME_KANA1 input');
    if (lastKana) {
      lastKana.removeAttribute('readonly');
      lastKana.value = NEW_LAST_KANA;
    }

    const firstKana = document.querySelector('#MEMBER_NAME_KANA2 input');
    if (firstKana) {
      firstKana.removeAttribute('readonly');
      firstKana.value = NEW_FIRST_KANA;
      firstKana.setAttribute('readonly', ''); // 名はグレーアウト
    }

    // --- 性別 ---
    const sexRadio = document.querySelector(`input[name="member_info[SEX]"][value="${NEW_SEX}"]`);
    if (sexRadio) sexRadio.checked = true;

    // --- 生年月日（全部グレーアウト） ---
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

    // --- メールアドレス（グレーアウト） ---
    const mailInput = document.querySelector('input[name="member_info[LOGIN_MAIL]"]');
    if (mailInput) {
      mailInput.removeAttribute('readonly');
      mailInput.value = NEW_MAIL;
      mailInput.setAttribute('readonly', '');
    }

  });

  observer.observe(document, { childList: true, subtree: true });

})();
