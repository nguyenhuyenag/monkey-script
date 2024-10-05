// ==UserScript==
// @version      1.0.0
// @name         Genshin Achievement
// @description  Genshin Achievement
// @namespace    https://github.com/nguyenhuyenag
// @icon         https://paimon.moe/favicon.png
// @author       nguyenhuyenag
// @homepage     https://github.com/nguyenhuyenag/monkey-script
// @supportURL   https://github.com/nguyenhuyenag/monkey-script/issues
// @match        *://*.paimon.moe/*
// @license      MIT
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
    "use strict";

    const hiddenTexts = [
        'Hoàn thành thí nghiệm quang học lúc trước.',
        'Sử dụng năng lực của Bạch Tuộc Bóng Tròn Dị Sắc.'
    ];

    $(function () {
        let items = $('.bg-item');  // Select all elements with the class 'bg-item'
        console.log("xxxxxxxxxxxxxxxxxxxx:", items.length);

        items.each(function () {
            let descriptionElement = $(this).find('p.text-gray-400.svelte-lpdzps');  // Find the specific <p> inside the current item
            if (descriptionElement.length) {
                let description = descriptionElement.text().trim();
                if (hiddenTexts.includes(description)) {
                    console.log("yyyyyyyyyyyyyyyyyyyyy:", this); // Log the item being hidden
                    $(this).hide(); // Hide the current item
                }
            }
        });
    });
})();
