// ==UserScript==
// @name        星宮 自動投票（API型）
// @match       https://gunmachan-idolfes.com/*
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    async function vote() {

        const startTime = performance.now();

        const fd = new FormData();
        fd.append("voteItemId", "68");

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

        function showMessage(msgText, color = "#fff") {
            const msg = document.createElement("div");
            msg.textContent = msgText;
            msg.style.position = "fixed";
            msg.style.top = "80px";
            msg.style.left = "50%";
            msg.style.transform = "translateX(-50%)";
            msg.style.padding = "12px 18px";
            msg.style.background = "rgba(28,28,30,0.95)";
            msg.style.backdropFilter = "blur(15px)";
            msg.style.color = color;
            msg.style.fontSize = "16px";
            msg.style.fontWeight = "600";
            msg.style.borderRadius = "16px";
            msg.style.boxShadow = "0 8px 30px rgba(0,0,0,0.25)";
            msg.style.zIndex = "999999";
            document.body.appendChild(msg);
            return msg;
        }

        if (r.status === 201) {

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

            const msg = showMessage("星宮に投票しました！");

            const sub = document.createElement("div");
            sub.textContent = `処理時間: ${elapsed} 秒`;
            sub.style.marginTop = "6px";
            sub.style.fontSize = "14px";
            sub.style.opacity = "0.8";
            msg.appendChild(sub);

            setTimeout(() => {
                msg.remove();
                window.close();
            }, 3000);

        } else {
            showMessage(`既に投票済です（${r.status}）`, "#ff6b6b");
        }
    }

    // ★ ページ読み込み前に即実行
    vote();

})();
