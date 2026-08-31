// ==UserScript==
// @name      与田理央那 自動 （API型）
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

            // ★ iframe でショートカット起動（ページ遷移扱いにならない）
            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = "shortcuts://run-shortcut?name=VoteSuccess";
            document.body.appendChild(iframe);

            // ★ タブ閉じは通知後に確実に実行されるよう遅らせる
            setTimeout(() => {
                window.close();
            }, 4000);
        }
    }

    window.addEventListener("load", () => {
        setTimeout(vote, 1200);
    });
})();
