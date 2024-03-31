// ==UserScript==
// @version      1.0.0
// @name         Paimon Moe
// @description  Show not achieved first

// @namespace https://github.com/nguyenhuyenag
// @icon https://paimon.moe/favicon.png
// @author Fzen
// @homepage https://github.com/nguyenhuyenag/monkey-script
// @supportURL https://github.com/nguyenhuyenag/monkey-script/issues
// @match *://*.paimon.moe/*
// @license MIT
// ==/UserScript==

(function () {
    "use strict";

    // Select the first checkbox input element on the page
    const firstCheckbox = document.querySelector('input[type="checkbox"]:first-of-type');

    if (firstCheckbox) {
        const parentElement = firstCheckbox.parentNode;
        if (parentElement) {
            parentElement.click();
        } else {
            console.log("Parent element not found.");
        }
    } else {
        console.log("Checkbox element not found.");
    }
})();
