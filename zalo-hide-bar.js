// ==UserScript==
// @name         Hide Zalo bar
// @namespace    http://tampermonkey.net/
// @version      2025-03-13
// @description  Try to take over the world!
// @author       nguyenhuyen_ag
// @match        https://chat.zalo.me/*
// @icon         https://chat.zalo.me/favicon-96x96.v1.png
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	// Add CSS to hide the infobar
	const style = document.createElement('style');
	style.textContent = '.system-banner__container { display: none !important; }';
	document.head.appendChild(style);

	// Alternative method using direct DOM manipulation
	const infobar = document.querySelector('.system-banner__container');
	if (infobar) {
		infobar.style.display = 'none';
	}
})();