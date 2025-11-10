// ==UserScript==
// @name          Youtube visited links
// @description
// @namespace     Violentmonkey Scripts
// @match         https://www.youtube.com/*
// @grant         GM_addStyle
// @version       0.0.1
// @author        -
// @license       MIT
// @run-at        document-idle
// @icon https://www.youtube.com/s/desktop/3748dff5/img/favicon_48.png
// ==/UserScript==

(function main(){
  const css=`h3>a[id*="video-title"]:visited>yt-formatted-string {
  color: red !important;
  font-weight:200 !important;
}
a:visited>h3>span#video-title {
  color: red !important;
  font-weight:200 !important;
}`
  let csss=GM_addStyle(css).then(el=>console.log('injected ',el));
})()
