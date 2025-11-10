// ==UserScript==
// @name          Hide AoPS Infobar
// @namespace     http://tampermonkey.net/
// @version       2025-03-11
// @description   Hides the infobar div on AoPS
// @author        nguyenhuyen_ag
// @match         https://artofproblemsolving.com/*
// @grant         none
// @icon          https://artofproblemsolving.com/assets/images/favicons/online/online-favicon.ico?v=4
// ==/UserScript==

(function() {
	'use strict';

	// Add CSS to hide the infobar
	const style = document.createElement('style');
	style.textContent = '.infobar { display: none !important; }';
	document.head.appendChild(style);

	// Alternative method using direct DOM manipulation
	const infobar = document.querySelector('.infobar');
	if (infobar) {
		infobar.style.display = 'none';
	}
})();
