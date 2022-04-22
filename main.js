// ==UserScript==
// @name         Twitter restriction
// @namespace    ...
// @version      0.1
// @description  ...
// @author       Luma
// @match        https://twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
(async function () {
  "use strict";

  const wipeStyle = () => {
    const styles = `
        body > *:not(.my-luma-cover) {
          opacity: 0 !important;
          pointer-events: none !important;
        }
        .my-luma-cover {
          position: fixed !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          top: 0 !important;
          width: 100% !important;
          font-size: 20px;
          height: 100% !important;
          color: #ddd !important;
          background-color: black !important;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  };

  const stopWithText = (text) => {
    const cover = document.createElement("div");
    document.body.appendChild(cover);
    cover.classList.add("my-luma-cover");
    cover.textContent = text;
  };

  const timeCheck = () => {
    const hours = (new Date()).getHours();
    if (21 <= hours || hours < 6) {
      wipeStyle();
      stopWithText("ツイネタはメモして寝てください。 (21:00-06:00)");
      return true;
    }
    if (9 <= hours && hours <= 11) {
      wipeStyle();
      stopWithText("ツイネタはメモして生産活動してください (09:00-11:00)");
      return true;
    }
    if (13 <= hours && hours <= 19) {
      wipeStyle();
      stopWithText("ツイネタはメモして生産活動してください (13:00-19:00)");
      return true;
    }
    return false;
  };

  while (true) {
    if (timeCheck()) break;
    await delay(3000);
  }
})();
