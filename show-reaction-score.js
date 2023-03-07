// ==UserScript==
// @name         Hiện Reaction Score
// @namespace    meo`
// @version      2022.01.17.01
// @description  như tên
// @author       You
// @match        https://voz.vn/t/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=voz.vn
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
// @antifeature  tracking
// ==/UserScript==

window.addEventListener('DOMContentLoaded', async () => {
    const doc = document;
    const map = new Map();
    const $links = doc.querySelectorAll('.message-userDetails .username[data-user-id]');

    $links.forEach($link => {
        const id = $link.dataset.userId;
        const vozKey = 'voz_score_' + id;

        map.set($link.dataset.userId, {
            id,
            url: $link.getAttribute('href'),
        })

        const $userDetail = $link.closest('.message-userDetails');
        if (!$userDetail) {
            return;
        }

        const score = GM_getValue(vozKey) || '...';
        $userDetail.insertAdjacentHTML('beforeend', `<h5 class="userBanner userBanner--primary message-userBanner user-score" style="color: #23497c; background-color: #e2e3e5;">Score: ${score}</h5>`);
        const $userScore = $userDetail.querySelector('.user-score');
        const negative = /^-/.test(score) ? true : false;
        $userScore.style.color = negative ? '#e91e63' : '#23497c';
    })

    const token = doc.querySelector("[name=_xfToken]").value;
    const users = Array.from(map.values());

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        await fetchStats(user)
    }

    function getUserData(id) {

    }

    async function fetchStats(user) {
        try {
            const api = `https://voz.vn${user.url}?tooltip=true&_xfRequestUri=https%3A%2F%2Fvoz.vn%2F&_xfWithData=1&_xfToken=${token}&_xfResponseType=json`;
            const res = await fetch(api);
            const data = await res.json();

            if (data.status === 'ok') {
                const $tooltip = doc.createElement('DIV');

                $tooltip.insertAdjacentHTML('beforeend', data.html.content);

                const $score = $tooltip.querySelector('.memberTooltip-stats > div > dl:nth-child(2) > dd');
                const score = $score ? $score.textContent.trim() : 0;
                const negative = /^-/.test(score) ? true : false;

                const $time = $tooltip.querySelector('.memberTooltip-blurbContainer .memberTooltip-blurb:nth-child(2) .u-dt');
                const time = $time.dataset.time ? new Date(+$time.dataset.time * 1000).toLocaleDateString("vi-VN") : '';

                const $users = doc.querySelectorAll(`.message-userDetails .username[data-user-id='${user.id}']`);
                $users.forEach($el => {
                    const $userDetail = $el.closest('.message-userDetails');
                    if (!$userDetail) {
                        return;
                    }

                    const $userScore = $userDetail.querySelector('.user-score');
                    if (!$userScore) {
                        return;
                    }

                    $userScore.style.color = negative ? '#e91e63' : '#23497c';
                    $userScore.textContent = `Score: ${score}`;
                    GM_setValue(`voz_score_${user.id}`, score);
                })
            }
        } catch (error) {
            console.error(error);
            console.error('voz script fetch reaction error');
            console.error(user);
        }
    }
})