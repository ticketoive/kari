// ==UserScript==
// @name        与田理央那 自動投票（API型）完全版
// @match       https://gunmachan-idolfes.com/*
// ==/UserScript==

(function() {
    'use strict';

    /* ============================
       IndexedDB 永続保存（Safari対応）
       ============================ */

    function openDB() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open("yodaVoteDB", 1);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains("store")) {
                    db.createObjectStore("store");
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function dbGet(key) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction("store", "readonly");
            const store = tx.objectStore("store");
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function dbSet(key, value) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction("store", "readwrite");
            const store = tx.objectStore("store");
            const req = store.put(value, key);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    }

    /* ============================
       今日のカウント読み込み＋日付リセット
       ============================ */

    (async () => {

        const today = new Date().toISOString().slice(0, 10);

        let savedDate = await dbGet("date");
        let count = await dbGet("count") || 0;

        if (savedDate !== today) {
            count = 0;
            await dbSet("count", count);
            await dbSet("date", today);
        }

        /* ============================
           右上に常時表示するカウンター
           ============================ */

        const counter = document.createElement("div");
        counter.textContent = `今日の成功: ${count} 回`;
        counter.style.position = "fixed";
        counter.style.top = "10px";
        counter.style.right = "10px";
        counter.style.padding = "8px 12px";
        counter.style.background = "rgba(28,28,30,0.85)";
        counter.style.color = "#fff";
        counter.style.fontSize = "14px";
        counter.style.fontWeight = "600";
        counter.style.borderRadius = "12px";
        counter.style.zIndex = "999999";
        counter.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
        document.body.appendChild(counter);

        /* ============================
           投票処理
           ============================ */

        async function vote() {

            const startTime = performance.now();

            const fd = new FormData();
            fd.append("voteItemId", "74");

            const r = await fetch("https://api.leadi.jp/v1/gunmachanIdolfes/votes/gunmachan_official_supporter2027", {
                method: "POST",
                body: fd,
                headers: { "Origin": "https://gunmachan-idolfes.com" }
            });

            const text = await r.text();

            function showMessage(msgText, color = "#fff") {
                const msg = document.createElement("div");
                msg.textContent = msgText;
                msg.style.position = "fixed";
                msg.style.top = "80px";
                msg.style.left = "50%";
                msg.style.transform = "translateX(-50%)";
                msg.style.padding = "12px 18px";
                msg.style.background = "rgba(28,28,30,0.95)";
                msg.style.color = color;
                msg.style.fontSize = "16px";
                msg.style.fontWeight = "600";
                msg.style.borderRadius = "16px";
                msg.style.zIndex = "999999";
                document.body.appendChild(msg);
                return msg;
            }

            if (r.status === 201) {

                /* ★ カウント +1（永続保存） */
                count++;
                await dbSet("count", count);
                await dbSet("date", today);

                /* ★ 右上の表示更新 */
                counter.textContent = `今日の成功: ${count} 回`;

                /* ★ 処理時間表示 */
                const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

                const msg = showMessage("与田理央那に投票しました！");
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
                showMessage(`投票失敗（${r.status}）`, "#ff6b6b");
            }
        }

        window.addEventListener("load", () => {
            setTimeout(vote, 1200);
        });

    })();

})();
