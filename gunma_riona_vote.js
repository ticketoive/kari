 // ==UserScript==
// @name        与田理央那 自動投票(API型)
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

            alert("投票成功！");

            // ★ Safari / Orion で確実に閉じる方法
            window.addEventListener("focus", () => {
                setTimeout(() => {
                    window.close();
                }, 200);
            }, { once: true });

        }
    }

    window.addEventListener("load", () => {
        setTimeout(vote, 1200);
    });
})();
