// ==UserScript==
// @name         Slack restriction
// @namespace    ...
// @version      0.1
// @description  ...
// @author       Luma
// @match        https://app.slack.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=app.slack.com
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
    if (23 <= hours || hours < 6) {
      wipeStyle();
      stopWithText("寝てください。 (23:00-06:00)");
      return true;
    }
    return false;
  };

  while (true) {
    if (timeCheck()) break;
    await delay(3000);
  }
})();
