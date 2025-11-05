// ==UserScript==
// @name         YouTube Playlist Reverse
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Thêm nút đảo thứ tự danh sách phát YouTube (đảo DOM trên trang)
// @author       nguyenhuyenag
// @match        https://www.youtube.com/playlist?list=*
// @match        https://www.youtube.com/*&list=*
// @match        https://www.youtube.com/*?list=*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Tạo nút cố định ở góc phải phía trên
    function createButton() {
        if (document.getElementById('yt-reverse-playlist-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'yt-reverse-playlist-btn';
        btn.textContent = 'Reverse playlist';
        Object.assign(btn.style, {
            position: 'fixed',
            right: '12px',
            top: '80px',
            zIndex: 9999,
            padding: '8px 12px',
            background: '#ff0000',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
        });
        btn.addEventListener('click', reverseAll);
        document.body.appendChild(btn);
    }

    // Reverse DOM nodes for a given parent and item selector
    function reverseList(parentSelector, itemSelector) {
        const parent = document.querySelector(parentSelector);
        if (!parent) return 0;
        const items = Array.from(parent.querySelectorAll(itemSelector));
        if (items.length <= 1) return 0;
        // Append in reverse order (append moves nodes if already in DOM)
        for (let i = items.length - 1; i >= 0; i--) {
            parent.appendChild(items[i]);
        }
        return items.length;
    }

    // Chạy cho cả main playlist và panel bên phải (nếu có)
    function reverseAll() {
        let changed = 0;
        // Main playlist listing on playlist page
        changed += reverseList('ytd-playlist-video-list-renderer #contents', 'ytd-playlist-video-renderer');
        // Panel on the right (when watching a video)
        changed += reverseList('ytd-playlist-panel-renderer #items', 'ytd-playlist-panel-video-renderer');
        // Newer YouTube layout variants:
        changed += reverseList('#content ytd-playlist-video-list-renderer #contents', 'ytd-playlist-video-renderer');
        changed += reverseList('ytd-playlist-panel-renderer #contents', 'ytd-playlist-panel-video-renderer');

        // Thông báo nhỏ
        showToast(`Reversed ${changed} items (visible loaded items).`);
    }

    // Hiện toast nhỏ
    function showToast(text) {
        const id = 'yt-reverse-toast';
        let t = document.getElementById(id);
        if (t) t.remove();
        t = document.createElement('div');
        t.id = id;
        t.textContent = text;
        Object.assign(t.style, {
            position: 'fixed',
            right: '12px',
            top: '140px',
            zIndex: 10000,
            padding: '8px 10px',
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '13px'
        });
        document.body.appendChild(t);
        setTimeout(() => t && t.remove(), 2500);
    }

    // Tự động thêm nút khi cần (vì YouTube SPA)
    const mo = new MutationObserver(() => {
        createButton();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    // Shortcut: Shift+R
    window.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key.toLowerCase() === 'r') {
            reverseAll();
        }
    });

    // Khởi tạo
    createButton();
})();
