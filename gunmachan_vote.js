// ==UserScript==
// @name        与田理央那 自動投票＋投票後に閉じる
// @match       https://gunmachan-idolfes.com/votes/gunmachan_official_supporter2027/list
// ==/UserScript==

(function() {
    'use strict';

    function clickYodaButton() {
        const cards = document.querySelectorAll('.vote-list-item-card');
        for (const card of cards) {
            const title = card.querySelector('h3');
            if (title && title.textContent.trim() === '与田理央那') {
                const button = card.querySelector('.vote-list-item-button button');
                if (button) {
                    console.log('投票します');
                    button.click();

                    // 投票後の画面変化を監視
                    observeAfterVote();
                }
                return;
            }
        }
    }

    function observeAfterVote() {
        const observer = new MutationObserver(() => {
            // 投票後に表示が変わる要素を検知する
            const done = document.querySelector('.vote-complete, .vote-result, .modal, .alert');
            if (done) {
                console.log('投票完了を検知 → タブを閉じます');
                window.close();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.addEventListener('load', () => {
        setTimeout(clickYodaButton, 1200);
    });
})();
