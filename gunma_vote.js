// ==UserScript==
// @name         Gunmachan 与田理央那 自動投票
// @match        https://gunmachan-idolfes.com/votes/gunmachan_official_supporter2027/list
// @grant        none
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
                    console.log('与田理央那の投票ボタンをクリックします');
                    button.click();
                } else {
                    console.log('ボタンが見つかりませんでした');
                }
                return;
            }
        }

        console.log('与田理央那のカードが見つかりませんでした');
    }

    // ページが動的に生成される可能性があるので少し待つ
    window.addEventListener('load', () => {
        setTimeout(clickYodaButton, 1200);
    });
})();
