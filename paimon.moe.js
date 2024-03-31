// ==UserScript==
// @version      1.0.0
// @name         Paimon Moe
// @description  Show not achieved first

// @namespace https://github.com/nguyenhuyenag
// @icon https://paimon.moe/favicon.png
// @author nguyenhuyenag
// @homepage https://github.com/nguyenhuyenag/monkey-script
// @supportURL https://github.com/nguyenhuyenag/monkey-script/issues
// @match *://*.paimon.moe/*
// @license MIT
// ==/UserScript==

(function () {
    "use strict";

    function checkboxHandler() {
        const showNotAchieved = document.querySelector('input[type="checkbox"]:first-of-type');
        if (!showNotAchieved) {
            console.log("Checkbox element not found!");
            return;
        }
        if (!showNotAchieved.checked) {
            showNotAchieved.click();
        } else {
            console.log("Checkbox already checked!");
        }
    }
    
    checkboxHandler();
    
    document.addEventListener('transitionend', checkboxHandler);
    window.addEventListener('popstate', checkboxHandler);
})();
