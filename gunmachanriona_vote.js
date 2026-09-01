// ==UserScript==
// @name        与田理央那　自動投票（API型）
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
            msg.style.top = "80px";
            msg.style.left = "50%";
            msg.style.transform = "translateX(-50%)";
            msg.style.padding = "12px 18px";
            msg.style.background = "rgba(28,28,30,0.95)";
            msg.style.backdropFilter = "blur(15px)";
            msg.style.color = "#fff";
            msg.style.fontSize = "16px";
            msg.style.fontWeight = "600";
            msg.style.borderRadius = "16px";
            msg.style.boxShadow = "0 8px 30px rgba(0,0,0,0.25)";
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
