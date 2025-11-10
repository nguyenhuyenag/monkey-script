// ==UserScript==
// @name         YouTube More Speeds
// @namespace    https://github.com/nguyenhuyenag
// @version      1.4.2
// @description  Adds buttons under a YouTube video with more playback speeds.
// @author       nguyenhuyenag
// @homepage     https://github.com/nguyenhuyenag/monkey-script
// @supportURL   https://github.com/nguyenhuyenag/monkey-script
// @icon         https://www.youtube.com/s/desktop/3748dff5/img/favicon_48.png
// @match        *://*.youtube.com/*
// @license      MIT
// ==/UserScript==

(function () {
    "use strict";

    if (window._ytSpeedExtDone) return;
    window._ytSpeedExtDone = true;

    const infoSel = "div#top-row.style-scope.ytd-watch-metadata";
    const textColor = "#FFF";

    // Màu nút
    const bgNormal = "#2980b9";
    const bgActive = "#e67e22";
    const speeds = [0.25, 0.5, 0.75, 1, 1.2, 1.25, 1.3, 1.4, 1.5, 2];

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
            font-family: "Roboto", "Arial", sans-serif;
            font-size: 13.5px;
            font-weight: 600;
            letter-spacing: 0.2px;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.25);
            user-select: none;
        `;
        btn.onmouseenter = () => {
            if (btn !== activeBtn) btn.style.filter = "brightness(1.18)";
        };
        btn.onmouseleave = () => {
            if (btn !== activeBtn) btn.style.filter = "brightness(1)";
        };

        if (rate === 1) activeBtn = defaultBtn = btn;

        btn.onclick = () => {
            if (activeBtn) {
                activeBtn.style.background = bgNormal;
                activeBtn.style.border = "1px solid rgba(255,255,255,0.2)";
                activeBtn.style.filter = "brightness(1)";
            }
            btn.style.background = bgActive;
            btn.style.border = "1px solid rgba(255,255,255,0.4)";
            btn.style.filter = "brightness(1)";
            activeBtn = btn;
            const v = document.querySelector("video");
            if (v) v.playbackRate = rate;
        };

        return btn;
    };

    const addSpeeds = () => {
        const info = document.querySelector(infoSel);
        if (!info || document.getElementById("more-speeds")) return;

        const wrap = document.createElement("div");
        wrap.id = "more-speeds";
        wrap.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 2px;
            margin-top: 8px;
            padding: 8px 10px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 10px;
            box-shadow: 0 1px 5px rgba(0,0,0,0.2);
            backdrop-filter: blur(4px);
            font-family: "Roboto", "Arial", sans-serif;
        `;

        speeds.forEach(s => wrap.appendChild(createBtn(s)));
        info.parentElement.insertBefore(wrap, info);

        document.addEventListener("transitionend", e => {
            if (e.target.id === "progress" && defaultBtn) defaultBtn.click();
        });
        window.addEventListener("popstate", () => defaultBtn?.click());
    };

    const waitFor = (sel, fn) => {
        const el = document.querySelector(sel);
        el ? fn(el) : requestAnimationFrame(() => waitFor(sel, fn));
    };

    window.addEventListener("yt-navigate-finish", addSpeeds);
    if (document.body) waitFor(infoSel, addSpeeds);
})();
