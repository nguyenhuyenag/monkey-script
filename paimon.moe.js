// ==UserScript==
// @version      1.0.0
// @name         Paimon Moe
// @description  Test

// @namespace https://github.com/nguyenhuyenag
// @icon https://paimon.moe/favicon.png
// @author Fzen
// @homepage https://github.com/nguyenhuyenag/youtube-more-speeds
// @supportURL https://github.com/ssssssander/youtube-more-speeds/issues
// @match *://*.paimon.moe/*
// @license MIT
// ==/UserScript==

(function () {
    "use strict";
    // Select the first checkbox input element on the page
    const firstCheckbox = document.querySelector('input[type="checkbox"]:first-of-type');

    // Check if the checkbox element exists
    if (firstCheckbox) {
        // Select the parent element of the checkbox
        const parentElement = firstCheckbox.parentNode;

        // Check if the parent element exists
        if (parentElement) {
            // Trigger a click event on the parent element
            parentElement.click();
        } else {
            console.log("Parent element not found.");
        }
    } else {
        console.log("Checkbox element not found.");
    }
})();
