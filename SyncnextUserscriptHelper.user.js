// ==UserScript==
// @name         SyncnextUserScriptHelper
// @namespace    http://syncnext_ronnie.com/
// @version      1.0
// @description  send video URL to Syncnext tvOS app
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
// ==/UserScript==

(async function () {
  "use strict";

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
        formRequest(postURL, url, pageURL);
      }
    }
  });
})();

function formRequest(postURL, url, pageURL) {
  const xmlURL =
    postURL +
    "?page=" +
    encodeURIComponent(pageURL) +
    "&video=" +
    encodeURIComponent(url);

  console.log(xmlURL);

  GM_xmlhttpRequest({
    method: "GET",
    url: xmlURL,
  });
}
