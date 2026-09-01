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

            const btn = document.createElement("button");
            btn.style.position = "fixed";
            btn.style.top = "0";
            btn.style.left = "0";
            btn.style.width = "100%";
            btn.style.height = "100%";
            btn.style.opacity = "0";
            btn.style.zIndex = "999999";

            btn.onclick = () => {
                location.href = "shortcuts://run-shortcut?name=VoteSuccess";

                window.addEventListener("focus", () => {
                    setTimeout(() => {
                        window.close();
                    }, 300);
                }, { once: true });
            };

            document.body.appendChild(btn);

            alert("投票成功！画面を1回タップすると通知が出て、Safariに戻ったらタブが閉じます");
        }
    }

    window.addEventListener("load", () => {
        setTimeout(vote, 1200);
    });
})();

