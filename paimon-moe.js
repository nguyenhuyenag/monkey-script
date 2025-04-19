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

	function clickCheckbox() {
		// Tìm tất cả các label có class "flex items-center"
		const labels = document.querySelectorAll('label.flex.items-center');
		for (const label of labels) {
			// Kiểm tra textContent (bao gồm cả khoảng trắng và đúng chính tả)
			if (label.textContent.includes(' Hiện thị thành tựu chưa có trước')) {
				const checkbox = label.querySelector('input[type="checkbox"]');
				if (checkbox) {
					checkbox.click();
					console.log('✅ Đã tự động click vào checkbox!');
					return true; // Thoát nếu thành công
				}
			}
		}
		console.log('❌ Không tìm thấy checkbox phù hợp.');
		return false;
	}

	// Thử ngay khi DOM sẵn sàng
	if (document.readyState === 'complete') {
		clickCheckbox();
	} else {
		document.addEventListener('DOMContentLoaded', clickCheckbox);
	}
	// Nếu trang tải AJAX, thử lại sau 1 giây
	setTimeout(clickCheckbox, 1000);
})();

