// ==UserScript==
// @name        与田理央那 自動投票（API直接版）
// @match       https://gunmachan-idolfes.com/votes/gunmachan_official_supporter2027/list
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const YODA_ID = "74";

    function vote() {
        const formData = new FormData();
        formData.append("voteItemId", YODA_ID);

        GM_xmlhttpRequest({
            method: "POST",
            url: "https://api.leadi.jp/v1/gunmachanIdolfes/votes/gunmachan_official_supporter2027",
            data: formData,
            headers: {
                "Origin": "https://gunmachan-idolfes.com"
            },
            onload: function(res) {
                console.log("投票結果:", res.responseText);
                setTimeout(() => window.close(), 5000);
            }
        });
    }

    window.addEventListener('load', () => {
        setTimeout(vote, 1000);
    });
