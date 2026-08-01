// ==UserScript==
// @name         WordPress Classic Editor
// @namespace    https://nguyenhuyenag.wordpress.com/
// @version      1.1
// @description  Automatically force Classic Editor on WordPress.com post edit and add new pages
// @author       nguyenhuyen_ag
// @match        https://*.wordpress.com/wp-admin/post.php*
// @match        https://*.wordpress.com/wp-admin/post-new.php*
// @grant        none
// @run-at       document-idle
// @icon         https://s0.wp.com/i/favicon.ico
// ==/UserScript==

(function () {
    'use strict';

    console.log('[Classic Editor] Userscript started');

    const url = new URL(window.location.href);

    // Nếu chưa có tham số classic-editor thì thêm vào
    if (!url.searchParams.has('classic-editor')) {
        url.searchParams.append('classic-editor', '');
        console.log('[Classic Editor] Redirecting...');
        window.location.replace(url.toString());
        return;
    }

    console.log('[Classic Editor] Waiting for popup...');

    let count = 0;

    const timer = setInterval(() => {
        count++;

        const button = document.querySelector(
            'button.blocks-in-post-classic-button'
        );

        console.log(`[Classic Editor] Attempt ${count}:`, button);

        if (button) {
            console.log('[Classic Editor] Clicking "Continue to Classic Editor"...');

            button.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            }));

            clearInterval(timer);
            return;
        }

        // Dừng sau 30 giây nếu không tìm thấy
        if (count >= 60) {
            console.log('[Classic Editor] Button not found.');
            clearInterval(timer);
        }

    }, 500);

})();