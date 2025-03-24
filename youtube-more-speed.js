// ==UserScript==
// @version      1.4.2
// @name         YouTube More Speeds
// @description  Adds buttons under a YouTube video with more playback speeds.

// @name:zu Ngesivinini-YouTube angeziwe
// @description:zu Yengeza izinkinobho ngaphansi kwevidiyo ye-YouTube nge ngaphezulu ukudlala ngesivinini.

// @namespace https://github.com/ssssssander
// @icon https://www.youtube.com/s/desktop/3748dff5/img/favicon_48.png
// @author ssssssander
// @homepage https://github.com/ssssssander/youtube-more-speeds
// @supportURL https://github.com/ssssssander/youtube-more-speeds/issues
// @match *://*.youtube.com/*
// @require https://greasyfork.org/scripts/446257-waitforkeyelements-utility-function/code/waitForKeyElements%20utility%20function.js?version=1059316
// @license MIT
// ==/UserScript==

(function () {
    "use strict";

    let funcDone = false;

    var activeBtn = null;
    var defaultBnt = null;

    const infoElemSelector = "div#top-row.style-scope.ytd-watch-metadata";
    const textColors = ["#FFFFFF", "#000000"];
    const bgColors = ["#605CB8", "#53C292", "#E64640"];

    if (!funcDone) {
        window.addEventListener("yt-navigate-finish", addSpeeds);
    }

    if (document.body && !funcDone) {
        // Chờ cho các phần tử được chọn bởi infoElemSelector xuất hiện
        waitForKeyElements(infoElemSelector, addSpeeds);
    }

    function addSpeeds() {
        if (funcDone) return;

        let color = textColors[0];
        let bgColor = bgColors[0];
        let moreSpeedsDiv = document.createElement("div");
        moreSpeedsDiv.id = "more-speeds";

        let seeds = [0.25, 0.5, 0.75, 1, 1.1, 1.2, 1.25, 1.5, 1.5, 2];
        for (let i of seeds) {
            // if (i >= 1) { }
            // if (i > 2) { i += 0.75; }
            // if (i > 3) { i++; }

            let btn = document.createElement("button");
            btn.style.color = color;
            btn.style.backgroundColor = bgColor;
            btn.style.cursor = "pointer";
            btn.style.marginRight = "1.5px";
            btn.style.border = "2px solid #D3D3D3";
            btn.style.borderRadius = "10px";
            btn.style.width = "45px";
            btn.style.height = "25px";
            btn.textContent = `×${i}`;

            if (i == 1) {
                btn.style.backgroundColor = bgColors[1];
                activeBtn = btn;
                defaultBnt = btn;
            }

            btn.addEventListener("click", () => {
                if (activeBtn) {
                    activeBtn.style.backgroundColor = bgColors[0];
                }
                btn.style.backgroundColor = bgColors[1];
                activeBtn = btn;

                document.getElementsByTagName("video")[0].playbackRate = i;
            });
            moreSpeedsDiv.appendChild(btn);
        }

        let infoElem = document.querySelector(infoElemSelector);
        infoElem.parentElement.insertBefore(moreSpeedsDiv, infoElem);

        // When a CSS transition has completed
        document.addEventListener('transitionend', (e) => {
            if (e.target.id === 'progress') { // important
                if (defaultBnt) { defaultBnt.click(); }
            }
        });

        // When the active history entry changes
        window.addEventListener('popstate', () => {
            if (defaultBnt) { defaultBnt.click(); }
        });

        funcDone = true;
    }
})();
