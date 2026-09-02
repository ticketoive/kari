// ==UserScript==
// @name        与田理央那 自動投票（Cloudflare永続カウンター）
// @match       https://gunmachan-idolfes.com/*
// ==/UserScript==

(function() {
    'use strict';

    const API_BASE = "https://vote-counter.heloheo1997.workers.dev";

    async function getCount() {
        const r = await fetch(`${API_BASE}/get`);
        const data = await r.json();
        return Number(data.count || 0);
    }

    async function addCount() {
        const r = await fetch(`${API_BASE}/add`);
        const data = await r.json();
        return Number(data.count || 0);
    }

    async function setupCounter() {
        const count = await getCount();

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

        return counter;
    }

    async function vote(counter) {

        const startTime = performance.now();

        const fd = new FormData();
        fd.append("voteItemId", "74");

        const r = await fetch("https://api.leadi.jp/v1/gunmachanIdolfes/votes/gunmachan_official_supporter2027", {
            method: "POST",
            body: fd,
            headers: { "Origin": "https://gunmachan-idolfes.com" }
        });

        if (r.status === 201) {

            const newCount = await addCount();
            counter.textContent = `今日の成功: ${newCount} 回`;

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

            const msg = document.createElement("div");
            msg.textContent = "与田理央那に投票しました！";
            msg.style.position = "fixed";
            msg.style.top = "80px";
            msg.style.left = "50%";
            msg.style.transform = "translateX(-50%)";
            msg.style.padding = "12px 18px";
            msg.style.background = "rgba(28,28,30,0.95)";
            msg.style.color = "#fff";
            msg.style.fontSize = "16px";
            msg.style.fontWeight = "600";
            msg.style.borderRadius = "16px";
            msg.style.zIndex = "999999";

            const sub = document.createElement("div");
            sub.textContent = `処理時間: ${elapsed} 秒`;
            sub.style.marginTop = "6px";
            sub.style.fontSize = "14px";
            sub.style.opacity = "0.8";
            msg.appendChild(sub);

            document.body.appendChild(msg);

            setTimeout(() => {
                msg.remove();
                window.close();
            }, 3000);

        } else {
            alert(`投票失敗（${r.status}）`);
        }
    }

    window.addEventListener("load", async () => {
        const counter = await setupCounter();
        setTimeout(() => vote(counter), 1200);
    });

})();
