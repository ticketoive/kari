// ==UserScript==
// @name        与田理央那　自動投票（API型・履歴付き）
// @match       https://gunmachan-idolfes.com/*
// ==/UserScript==

(function() {
    'use strict';

    const STORAGE_KEY = "yoda_vote_history";

    function getToday() {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }

    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    }

    function saveHistory(history) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }

    function recordVote() {
        const history = getHistory();
        const today = getToday();
        history[today] = (history[today] || 0) + 1;
        saveHistory(history);
        return history;
    }

    function getStats() {
        const history = getHistory();
        const today = getToday();
        const todayCount = history[today] || 0;
        const totalCount = Object.values(history).reduce((sum, v) => sum + v, 0);
        return { todayCount, totalCount, history };
    }

    function showMessage(success, elapsed, status) {
        const stats = getStats();

        const msg = document.createElement("div");
        msg.style.position = "fixed";
        msg.style.top = "70px";
        msg.style.left = "50%";
        msg.style.transform = "translateX(-50%)";
        msg.style.width = "320px";
        msg.style.background = "rgba(28,28,30,0.96)";
        msg.style.backdropFilter = "blur(20px)";
        msg.style.borderRadius = "22px";
        msg.style.padding = "20px";
        msg.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
        msg.style.zIndex = "999999";
        msg.style.color = "#fff";
        msg.style.fontFamily = "-apple-system,BlinkMacSystemFont,sans-serif";

        const title = document.createElement("div");
        title.style.fontSize = "22px";
        title.style.fontWeight = "700";
        title.style.textAlign = "center";
        title.textContent = success ? "🎉 投票完了！" : "⚠️ 投票失敗";
        msg.appendChild(title);

        const name = document.createElement("div");
        name.style.textAlign = "center";
        name.style.marginTop = "8px";
        name.style.fontSize = "16px";
        name.style.opacity = "0.9";
        name.textContent = success ? "与田理央那" : `ステータス：${status}`;
        msg.appendChild(name);

        const line = document.createElement("div");
        line.style.height = "1px";
        line.style.background = "rgba(255,255,255,0.15)";
        line.style.margin = "16px 0";
        msg.appendChild(line);

        const statsBox = document.createElement("div");
        statsBox.style.display = "flex";
        statsBox.style.justifyContent = "space-around";

        const today = document.createElement("div");
        today.style.textAlign = "center";
        today.innerHTML = `
            <div style="font-size:12px;opacity:.6">今日</div>
            <div style="font-size:28px;font-weight:700;color:#4da3ff">
                ${stats.todayCount}
            </div>
            <div style="font-size:12px;opacity:.7">回</div>
        `;

        const total = document.createElement("div");
        total.style.textAlign = "center";
        total.innerHTML = `
            <div style="font-size:12px;opacity:.6">累計</div>
            <div style="font-size:28px;font-weight:700;color:#4da3ff">
                ${stats.totalCount}
            </div>
            <div style="font-size:12px;opacity:.7">回</div>
        `;

        statsBox.appendChild(today);
        statsBox.appendChild(total);
        msg.appendChild(statsBox);

        if (success) {
            const time = document.createElement("div");
            time.style.marginTop = "16px";
            time.style.fontSize = "14px";
            time.style.textAlign = "center";
            time.style.opacity = "0.75";
            time.textContent = `処理時間：${elapsed} 秒`;
            msg.appendChild(time);
        }

        const historyTitle = document.createElement("div");
        historyTitle.style.marginTop = "18px";
        historyTitle.style.fontSize = "13px";
        historyTitle.style.fontWeight = "600";
        historyTitle.style.opacity = "0.8";
        historyTitle.textContent = "過去の投票履歴";
        msg.appendChild(historyTitle);

        const historyList = document.createElement("div");
        historyList.style.marginTop = "8px";
        historyList.style.maxHeight = "130px";
        historyList.style.overflowY = "auto";

        const entries = Object.entries(stats.history)
            .sort((a, b) => b[0].localeCompare(a[0]));

        if (entries.length === 0) {
            historyList.textContent = "履歴はありません";
            historyList.style.fontSize = "13px";
            historyList.style.opacity = "0.6";
        } else {
            entries.slice(0, 7).forEach(([date, count]) => {
                const row = document.createElement("div");
                row.style.display = "flex";
                row.style.justifyContent = "space-between";
                row.style.padding = "5px 0";
                row.style.fontSize = "13px";

                const d = document.createElement("span");
                d.textContent = date;

                const c = document.createElement("span");
                c.style.fontWeight = "600";
                c.textContent = `${count}回`;

                row.appendChild(d);
                row.appendChild(c);
                historyList.appendChild(row);
            });
        }

        msg.appendChild(historyList);
        document.body.appendChild(msg);
        return msg;
    }

    async function vote() {
        const startTime = performance.now();

        try {
            const fd = new FormData();
            fd.append("voteItemId", "74");

            const r = await fetch(
                "https://api.leadi.jp/v1/gunmachanIdolfes/votes/gunmachan_official_supporter2027",
                {
                    method: "POST",
                    body: fd,
                    headers: { "Origin": "https://gunmachan-idolfes.com" }
                }
            );

            const text = await r.text();
            console.log("ステータス:", r.status);
            console.log("レスポンス:", text);

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

            if (r.status === 201) {
                recordVote();
                const msg = showMessage(true, elapsed, r.status);
                setTimeout(() => {
                    msg.remove();
                    window.close();
                }, 3000);
            } else {
                const msg = showMessage(false, elapsed, r.status);
                setTimeout(() => {
                    msg.remove();
                }, 3500);
            }

        } catch (e) {
            console.error(e);
            const msg = showMessage(false, "-", "通信エラー");
            setTimeout(() => {
                msg.remove();
            }, 3500);
        }
    }

    window.addEventListener("load", () => {
        setTimeout(vote, 1200);
    });

})();
