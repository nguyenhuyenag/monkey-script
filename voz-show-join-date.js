// ==UserScript==
// @name         Voz Join Date Display
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Hiển thị ngày tham gia tài khoản trên Voz (chèn sau username)  
// @author       You
// @match        https://voz.vn/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      voz.vn
// ==/UserScript==

(function () {
    'use strict';

    const WARNING_DATE = new Date(Date.now() - 3 * 30 * 86400 * 1000); // 3 tháng trước
    let cachedJoinDates = JSON.parse(GM_getValue("cachedJoinDates", "{}"));
    const DATA_VERSION = 1;

    if (GM_getValue("dataVersion", 0) < DATA_VERSION) {
        cachedJoinDates = {};
        GM_setValue("dataVersion", DATA_VERSION);
    }

    let processedIds = [];

    // ==========================
    // Hiển thị join date
    // ==========================
    function displayJoinDate(userId) {
        if (processedIds.includes(userId)) return;

        const userElements = document.querySelectorAll(`.message-userDetails a.username[data-user-id='${userId}']`);
        if (!userElements.length) return;

        userElements.forEach(el => {
            const joinTimestamp = cachedJoinDates[String(userId)];
            const joinDateObj = new Date(joinTimestamp * 1000);
            let formattedDate = joinDateObj.toLocaleDateString("vi-VN");
            if (joinDateObj > WARNING_DATE) formattedDate += " ";

            const joinDateHtml = `<h5 class="message-userTitle joindate" dir="auto" itemprop="joindate">${formattedDate}</h5>`;

            if (el.parentElement) {
                el.insertAdjacentHTML('afterend', joinDateHtml);
            }
        });

        processedIds.push(userId);
    }

    // ==========================
    // Lấy join date từ API
    // ==========================
    function fetchJoinDate(userId) {
        if (Object.keys(cachedJoinDates).includes(String(userId))) {
            displayJoinDate(userId);
            return;
        }

        const tokenElement = document.getElementsByName("_xfToken")[0];
        if (!tokenElement) return;
        const token = tokenElement.value;

        const userElement = document.querySelector(`.message-userDetails a.username[data-user-id='${userId}']`);
        if (!userElement) return;
        const username = encodeURIComponent(userElement.innerText);

        const apiUrl = `https://voz.vn/u/${username}.${userId}/?tooltip=true&_xfRequestUri=${document.location.pathname}&_xfWithData=1&_xfToken=${token}&_xfResponseType=json`;

        GM_xmlhttpRequest({
            method: "GET",
            url: apiUrl,
            onload: function (res) {
                try {
                    const match = JSON.parse(res.responseText).html.content.match(/data-timestamp="(.*?)"/);
                    if (match && !isNaN(Number(match[1]))) {
                        cachedJoinDates[String(userId)] = Number(match[1]);
                        displayJoinDate(userId);
                    }
                } catch (e) {
                    console.error("Error parsing response for user " + userId, e);
                }
            }
        });
    }

    // ==========================
    // Khởi tạo IntersectionObserver
    // ==========================
    function initUserObserver() {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                const userId = entry.target.getAttribute("data-user-id");
                if (Object.keys(cachedJoinDates).includes(String(userId))) {
                    obs.unobserve(entry.target);
                }
                fetchJoinDate(userId);
            });
        });
        const userElements = document.querySelectorAll(".message-userDetails a.username");
        userElements.forEach(el => observer.observe(el));
    }

    // ==========================
    // Thêm CSS cho join date
    // ==========================
    function addJoinDateStyle() {
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 751px) { .message-userTitle.joindate:before {content: ". "} }
            @media (min-width: 752px) { .message-userTitle.joindate + br {display: none;} }
        `;
        document.head.appendChild(style);
    }

    // ==========================
    // Lưu cache trước khi thoát
    // ==========================
    window.addEventListener("beforeunload", () => {
        GM_setValue("cachedJoinDates", JSON.stringify(cachedJoinDates));
    });

    // ==========================
    // Chờ element xuất hiện
    // ==========================
    function waitForUserElements() {
        if (document.querySelectorAll(".message-userDetails a.username").length) {
            initUserObserver();
            addJoinDateStyle();
        } else {
            setTimeout(waitForUserElements, 500);
        }
    }

    waitForUserElements();
})();
