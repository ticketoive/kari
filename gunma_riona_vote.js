// ==UserScript==
// @name        投票成功通知（タップでショートカット起動）
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

            // ★ 画面に透明ボタンを作る（タップでショートカット起動）
            const btn = document.createElement("button");
            btn.textContent = "通知を出す";
            btn.style.position = "fixed";
            btn.style.top = "0";
            btn.style.left = "0";
            btn.style.width = "100%";
            btn.style.height = "100%";
            btn.style.opacity = "0"; // 完全透明
            btn.style.zIndex = "999999";

            btn.onclick = () => {
                location.href = "shortcuts://run-shortcut?name=VoteSuccess";
            };

            document.body.appendChild(btn);

            alert("投票成功！画面を1回タップすると通知が出ます");
        }
    }

    window.addEventListener("load", () => {
        setTimeout(vote, 1200);
    });
})();
