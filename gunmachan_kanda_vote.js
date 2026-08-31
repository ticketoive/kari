// ==UserScript==
// @name        神田みか 自動投票
// @match       https://gunmachan-idolfes.com/votes/gunmachan_official_supporter2027/list
// ==/UserScript==

(function() {
    'use strict';

    function clickYodaButton() {
        const cards = document.querySelectorAll('.vote-list-item-card');
        for (const card of cards) {
            const title = card.querySelector('h3');
            if (title && title.textContent.trim() === '神田みか') {
                const button = card.querySelector('.vote-list-item-button button');
                if (button) {
                    console.log('投票します');
                    button.click();

                    // 5秒後に閉じる
                    setTimeout(() => {
                        console.log('5秒経過 → タブを閉じます');
                        window.close();
                    }, 5000);
                }
                return;
            }
        }
    }

    window.addEventListener('load', () => {
        setTimeout(clickYodaButton, 1200);
    });
})();
