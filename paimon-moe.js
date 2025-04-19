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

	// Click check box: Hiện thị thành tựu chưa có trước
	function clickCheckbox() {
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

	// Ẩn những thành tựu bị bỏ
	function hideTargetDivs() {
		const targetParagraphs = document.querySelectorAll('p.mr-1.svelte-lpdzps');
		targetParagraphs.forEach(p => {
			if (p.textContent.trim() === '1') {
				const divToHide = p.closest('div.bg-item.rounded-xl');
				if (divToHide) {
					divToHide.style.display = 'none'; // Ẩn div
					console.log('✅ Đã ẩn div:', divToHide);
				}
			}
		});
	}

	// // Mảng chứa các nội dung cần ẩn
	// const targetContents = [
	// 	"Deianeira Của Snezhevna"
	// ];

	// function hideMatchingDivs() {
	// 	// Tìm tất cả các thẻ p có class font-semibold
	// 	const titleElements = document.querySelectorAll('p.font-semibold.svelte-lpdzps');

	// 	titleElements.forEach(p => {
	// 		// Lấy nội dung text (bỏ qua các thẻ con bên trong)
	// 		const titleText = p.childNodes[0]?.textContent?.trim();

	// 		// Kiểm tra nếu nội dung nằm trong mảng targetTitles
	// 		if (titleText && targetTitles.includes(titleText)) {
	// 			// Tìm thẻ div cha cần ẩn (có class bg-item rounded-xl)
	// 			const divToHide = p.closest('div.bg-item.rounded-xl');
	// 			if (divToHide) {
	// 				divToHide.style.display = 'none';
	// 				console.log('✅ Đã ẩn div chứa:', titleText);
	// 			}
	// 		}
	// 	});
	// }

	// Thử ngay khi DOM sẵn sàng
	if (document.readyState === 'complete') {
		clickCheckbox();
		hideTargetDivs();
		// hideMatchingDivs();
	} else {
		document.addEventListener('DOMContentLoaded', clickCheckbox);
		document.addEventListener('DOMContentLoaded', hideTargetDivs);
		// document.addEventListener('DOMContentLoaded', hideMatchingDivs);
	}
	// Nếu trang tải AJAX, thử lại 
	setTimeout(clickCheckbox, 3000);
	setTimeout(hideTargetDivs, 3000);
	// setTimeout(hideMatchingDivs, 3000);
})();
