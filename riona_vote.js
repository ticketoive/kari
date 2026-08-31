// ==UserScript==
// @name        投票成功通知＋タブ閉じ
// @match       https://gunmachan-idolfes.com/*
// ==/UserScript==

(function() {
    'use strict';

    async function vote() {
        const fd = new FormData();
        fd.append("voteItemId", "74");

        const r = await fetch("https://api.leadi.jp/v1/gunmachanIdolfes/votes/gunmachan_official_supporter2027", {
            method: "POST",
            body: fd,
            headers: {
                "Origin": "https://gunmachan-idolfes.com"
            }
        });

        const text = await r.text();
        console.log("ステータス:", r.status);
        console.log("レスポンス:", text);

        if (r.status === 201) {
            // ① ショートカット通知を起動
            location.href = "shortcuts://run-shortcut?name=VoteSuccess";

            // ② 少し待ってタブを閉じる
            setTimeout(() => {
                window.close(); // ← ショートカットが開いたタブなら閉じられる
            }, 5000);
        }
    }

    window.addEventListener("load", () => {
        setTimeout(vote, 1200);
    });
})();

