// ==UserScript==
// @name        神田みか 自動投票（API型）（タブ閉じ強化版）
// @match       https://gunmachan-idolfes.com/*
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    async function vote() {

        const startTime = performance.now();

        const fd = new FormData();
        fd.append("voteItemId", "61");

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

        function showMessage(title, lines = [], color = "#fff") {
            const msg = document.createElement("div");

            msg.style.position = "fixed";
            msg.style.top = "80px";
            msg.style.left = "50%";
            msg.style.transform = "translateX(-50%)";
            msg.style.padding = "16px 22px";
            msg.style.background = "rgba(28,28,30,0.95)";
            msg.style.backdropFilter = "blur(15px)";
            msg.style.color = color;
            msg.style.fontSize = "17px";
            msg.style.fontWeight = "600";
            msg.style.borderRadius = "18px";
            msg.style.boxShadow = "0 10px 35px rgba(0,0,0,0.3)";
            msg.style.zIndex = "999999";
            msg.style.textAlign = "center";
            msg.style.lineHeight = "1.5";

            // タイトル
            const t = document.createElement("div");
            t.textContent = title;
            t.style.fontSize = "18px";
            t.style.marginBottom = "8px";
            msg.appendChild(t);

            // 行追加
            for (const line of lines) {
                const l = document.createElement("div");
                l.textContent = line;
                l.style.fontSize = "15px";
                l.style.opacity = "0.85";
                msg.appendChild(l);
            }

            document.body.appendChild(msg);
            return msg;
        }

        function forceClose() {
            console.log("close開始");

            try { window.close(); } catch (e) {}

            setTimeout(() => { try { window.close(); } catch (e) {} }, 500);
            setTimeout(() => { try { window.close(); } catch (e) {} }, 2000);

            setTimeout(() => {
                if (!document.hidden) {
                    try { history.back(); } catch (e) {}
                }
            }, 3000);
        }

        let msg;

        if (r.status === 201) {

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

            msg = showMessage(
                "投票完了",
                [
                    "投票先: 神田みか",
                    `処理時間: ${elapsed} 秒`
                ]
            );

        } else {

            msg = showMessage(
                "投票完了（既に投票済）",
                [
                    "投票先: 神田みか",
                    `ステータス: ${r.status}`
                ],
                "#ff6b6b"
            );

        }

        setTimeout(() => {
            msg.remove();
            forceClose();
        }, 3000);

    }

    vote();

})();
