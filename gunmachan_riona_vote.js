// ==UserScript==
// @name        投票成功→3秒表示→自動タブ閉じ
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

            // ★ 画面中央に3秒だけ表示するメッセージ
            const msg = document.createElement("div");
            msg.textContent = "与田理央那に投票しました！";
            msg.style.position = "fixed";
            msg.style.top = "50%";
            msg.style.left = "50%";
            msg.style.transform = "translate(-50%, -50%)";
            msg.style.padding = "20px 30px";
            msg.style.background = "rgba(0,0,0,0.8)";
            msg.style.color = "white";
            msg.style.fontSize = "22px";
            msg.style.borderRadius = "12px";
            msg.style.zIndex = "999999";
            document.body.appendChild(msg);

            // ★ 3秒後にメッセージ消してタブ閉じる
            setTimeout(() => {
                msg.remove();
                window.close();
            }, 3000);
        }
    }

    window.addEventListener("load", () => {
        setTimeout(vote, 1200);
    });
})();
