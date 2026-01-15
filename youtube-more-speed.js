// ==UserScript==
// @name         YouTube More Speeds (Top Outside Player)
// @namespace    https://github.com/nguyenhuyenag
// @version      1.1
// @description  Adds playback speed buttons between search bar and video player (aligned with player).
// @author       nguyenhuyenag
// @match        *://*.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/3748dff5/img/favicon_48.png
// @license      MIT
// ==/UserScript==

(function () {
    "use strict";

    if (window._ytMoreSpeedDone) return;
    window._ytMoreSpeedDone = true;

    const textColor = "#FFF";
    const bgNormal = "#0d6efd";
    const bgActive = "#198754";
    const speeds = [0.5, 1, 1.2, 1.25, 1.3, 1.35, 1.4, 1.5, 2];

    let activeBtn, defaultBtn;

    const createBtn = (rate) => {
        const btn = document.createElement("button");
        btn.textContent = `x${rate}`;

        btn.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${textColor};
            background: ${rate === 1 ? bgActive : bgNormal};
            cursor: pointer;
            margin: 2px 3px;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            width: 54px;
            height: 30px;
            font-family: "Roboto","Arial",sans-serif;
            font-size: 13.5px;
            font-weight: 600;
            letter-spacing: 0.2px;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.25);
            user-select: none;
        `;

        btn.onmouseenter = () => {
            if (btn !== activeBtn) btn.style.filter = "brightness(1.15)";
        };

        btn.onmouseleave = () => {
            if (btn !== activeBtn) btn.style.filter = "brightness(1)";
        };

        if (rate === 1) activeBtn = defaultBtn = btn;

        btn.onclick = () => {
            if (activeBtn) {
                activeBtn.style.background = bgNormal;
                activeBtn.style.filter = "brightness(1)";
            }
            btn.style.background = bgActive;
            activeBtn = btn;

            const v = document.querySelector("video");
            if (v) v.playbackRate = rate;
        };

        return btn;
    };

    const addSpeeds = () => {
        const playerOuter = document.querySelector("#player-container-outer");
        if (!playerOuter || document.getElementById("more-speeds")) return;

        const wrap = document.createElement("div");
        wrap.id = "more-speeds";

        wrap.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 4px;

            margin: 8px 0 6px 0;
            padding: 6px 8px;

            background: rgba(0,0,0,0.55);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 10px;
            backdrop-filter: blur(6px);

            width: fit-content;
            max-width: 100%;
        `;

        speeds.forEach(s => wrap.appendChild(createBtn(s)));

        // Canh thẳng hàng tuyệt đối với player
        const playerLeft = playerOuter.getBoundingClientRect().left;
        const parentLeft = playerOuter.parentElement.getBoundingClientRect().left;
        wrap.style.marginLeft = `${playerLeft - parentLeft}px`;

        // Chèn TRƯỚC khung phát → tạo khoảng trống thật
        playerOuter.parentNode.insertBefore(wrap, playerOuter);

        document.addEventListener("loadedmetadata", () => defaultBtn?.click(), true);
        window.addEventListener("popstate", () => defaultBtn?.click());
    };

    const waitFor = (sel, fn) => {
        const el = document.querySelector(sel);
        if (el) fn();
        else requestAnimationFrame(() => waitFor(sel, fn));
    };

    window.addEventListener("yt-navigate-finish", addSpeeds);
    if (document.body) waitFor("#player-container-outer", addSpeeds);
})();
