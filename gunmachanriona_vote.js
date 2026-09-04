// ==UserScript==
// @name        与田理央那 自動投票（API型）（タブ閉じ強化）
// @match       https://gunmachan-idolfes.com/*
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    async function vote() {

        const startTime = performance.now();

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

        function forceClose() {
            console.log("close開始");

            try { window.close(); } catch (e) {}

            setTimeout(() => {
                try { window.close(); } catch (e) {}
            }, 500);

            setTimeout(() => {
                try { window.close(); } catch (e) {}
            }, 2000);

            setTimeout(() => {
                if (!document.hidden) {
                    try { history.back(); } catch (e) {}
                }
            }, 3000);
        }

        // ★ 成功時と失敗時で同じ流れに統一
        let msg;

        if (r.status === 201) {

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

            msg = showMessage("与田理央那に投票しました！");

            const sub = document.createElement("div");
            sub.textContent = `処理時間: ${elapsed} 秒`;
            sub.style.marginTop = "6px";
            sub.style.fontSize = "14px";
            sub.style.opacity = "0.8";
            msg.appendChild(sub);

        } else {

            // ★ 400 など失敗時も成功時と同じ流れ
            msg = showMessage(`既に投票済です（${r.status}）`, "#ff6b6b");

        }

        // ★ 成功・失敗どちらでも 3 秒後に閉じる
        setTimeout(() => {
            msg.remove();
            forceClose();
        }, 3000);

    }

    vote();

})();

