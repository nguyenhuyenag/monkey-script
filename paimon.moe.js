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
        const firstCheckbox = document.querySelector('input[type="checkbox"]:first-of-type');
        if (!firstCheckbox) {
            console.log("Checkbox element not found!");
            return;
        }
        if (!firstCheckbox.checked) {
            firstCheckbox.click();
        } else {
            console.log("Checkbox already checked!");
        }
    }
    
    checkboxHandler();
    
    document.addEventListener('transitionend', checkboxHandler);
    window.addEventListener('popstate', checkboxHandler);
})();
