// ==UserScript==
// @name         WordPress Classic Editor
// @namespace    https://nguyenhuyenag.wordpress.com/
// @version      1.0
// @description  Automatically force Classic Editor on WordPress.com post edit and add new pages
// @author       nguyenhuyen_ag
// @match        https://*.wordpress.com/wp-admin/post.php*
// @match        https://*.wordpress.com/wp-admin/post-new.php*
// @grant        none
// @icon         https://s0.wp.com/i/favicon.ico
// ==/UserScript==

(function () {
    'use strict';

    const url = new URL(window.location.href);

    // Nếu chưa có classic-editor thì thêm vào
    if (!url.searchParams.has('classic-editor')) {
        url.searchParams.append('classic-editor', '');
        window.location.replace(url.toString());
    }
})();
