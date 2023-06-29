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

  const syncnextBody = document.getElementById("_syncnextScript");

  if (syncnextBody != null) {
    syncnextBody.classList.remove("scriptNotInstalled");
    syncnextBody.classList.add("scriptInstalled");
  }

  const postURL = document.getElementById("_syncnextURL");
  const pageURL = document.getElementById("_syncnextPageURL");

  if (postURL != null) {
    await GM.setValue("postURL", postURL.innerHTML);
    await GM.setValue("pageURL", pageURL.innerHTML);
  }

  const videoUrls = document.querySelectorAll("video[src], video source[src]");
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
})();

function getRequest(postURL, url, pageURL) {
  const xmlURL =
    postURL +
    "/receiver" +
    "?page=" +
    encodeURIComponent(pageURL) +
    "&video=" +
    encodeURIComponent(url);

  console.log(xmlURL);

  GM_xmlhttpRequest({
    method: "GET",
    url: xmlURL,
    onload: function (res) {
      console.log("Download finish");
      console.log(res);

      if (res.status != 200) {
        // alert("發送給 Syncnext 遇到錯誤" + res.status + " - " + res.statusText);
      }
    },
  });
}
