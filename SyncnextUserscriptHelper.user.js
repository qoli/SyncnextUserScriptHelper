// ==UserScript==
// @name         Syncnext 網頁解釋助手
// @namespace    http://syncnext_ronnie.com/
// @version      1.0
// @description  發送網頁解釋結果給 Syncnext tvOS app
// @author       Ronnie Wong
// @match        *://*/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @inject-into  content
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/qoli/SyncnextUserScriptHelper/main/SyncnextUserscriptHelper.user.js
// ==/UserScript==

(async function () {
  "use strict";

  GM_xmlhttpRequest({
    method: "HEAD",
    url: window.location.href,
    onload: async function (response) {
      console.log(response.status);
      if (response.status != 200) {
        const newPostURL = await GM.getValue("postURL", null);
        console.log("網頁錯誤代碼：" + response.status);

        if (newPostURL != null) {
          getError(newPostURL, response.status);
        }

        return;
      }

      const syncnextBody = document.getElementById("_syncnextScript");

      if (syncnextBody != null) {
        syncnextBody.classList.remove("scriptNotInstalled");
        syncnextBody.classList.add("scriptInstalled");
      }

      const postURL = document.getElementById("_syncnextURL");
      const pageURL = document.getElementById("_syncnextPageURL");

      if (postURL != null && pageURL != null) {
        await GM.setValue("postURL", postURL.innerHTML);
        await GM.setValue("pageURL", pageURL.innerHTML);
      }

      const videoUrls = document.querySelectorAll(
        "video[src], video source[src]"
      );

      if (videoUrls.length == 0) {
        return;
      }

      videoUrls.forEach(async function (video) {
        const url = video.currentSrc || video.src;

        if (url !== undefined) {
          const postURL = await GM.getValue("postURL", null);
          const pageURL = await GM.getValue("pageURL", null);

          if (postURL !== null && pageURL !== null) {
            getRequest(postURL, url, pageURL);
          }
        }
      });
    },
  });
})();

function getRequest(postURL, url, pageURL) {
  const xmlURL =
    postURL +
    "/receiver" +
    "?page=" +
    encodeURIComponent(pageURL) +
    "&video=" +
    encodeURIComponent(url);

  GM_xmlhttpRequest({
    method: "GET",
    url: xmlURL,
  });
}

function getError(postURL, text) {
  const xmlURL = postURL + "/error" + "?error=" + text;

  GM_xmlhttpRequest({
    method: "GET",
    url: xmlURL,
    onload: function (res) {
      console.log(res.responseText);
    },
  });
}
