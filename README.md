# 如何使用網頁解釋助手

> 文章更新在 7 月 2 日

## 原文地址

https://www.notion.so/qoli/9b7cae119c0245ceb9e32a0207a3d5d1

![FeaturesImage_new.png](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E7%B6%B2%E9%A0%81%E8%A7%A3%E9%87%8B%E5%8A%A9%E6%89%8B%209b7cae119c0245ceb9e32a0207a3d5d1/FeaturesImage_new.png)

在 Syncnext 1.22 版本下，增加了全新「網頁解釋助手」功能。

## 為何需要網頁解釋助手

在 tvOS 的限制下，App 是無法使用 WebView 框架的。

但是現在的影音網站的混繞方案越來越強，手工解密的成本越來越高。

並且考慮到在未來支持插件化的條件下，所以先推出了由手機協助解釋網站內容，然後傳遞給 Syncnext tvOS app 的處理方案。

### 工作原理

本方案透過 Userscript 方式，注入目標網站，取回 Video 標籤的播放地址。

然後再透過 Socket 通信方案告知 Syncnext tvOS app 真實的播放地址。

## 第一次使用教學

在使用播放部分影片的過程中，它可能會出現需要網頁解釋助手的幫助。

![Simulator Screenshot - 16.1 - 2023-07-01 at 15.38.31.png](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E7%B6%B2%E9%A0%81%E8%A7%A3%E9%87%8B%E5%8A%A9%E6%89%8B%209b7cae119c0245ceb9e32a0207a3d5d1/Simulator_Screenshot_-_16.1_-_2023-07-01_at_15.38.31.png)

### 打開「網頁解釋助手」

如上圖所述，上面的界面要求打開一個網站。

那麼，請使用手機或者電腦打開網頁。

在這篇教學中，將採用 iPhone 打開網頁。

**小提示：iPhone 內置相機可以掃描二維碼。**

![Untitled](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E7%B6%B2%E9%A0%81%E8%A7%A3%E9%87%8B%E5%8A%A9%E6%89%8B%209b7cae119c0245ceb9e32a0207a3d5d1/Untitled.png)

### 安裝 Safari 使用的 Userscripts app

如圖片所示，我們使用網頁助手之前，需要一個妥善的 Userscript 環境。

安裝 Userscripts app 即可。

[‎Userscripts](https://apps.apple.com/hk/app/userscripts/id1463298887)

![Userscript-install-0.png](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E7%B6%B2%E9%A0%81%E8%A7%A3%E9%87%8B%E5%8A%A9%E6%89%8B%209b7cae119c0245ceb9e32a0207a3d5d1/Userscript-install-0.png)

### 設定 Userscripts 應用程式

按照上圖，為 Userscripts 選擇可以寫入的目錄即可。

### 安裝腳本

然後，在安裝網頁助手需要的腳本。

[](https://raw.githubusercontent.com/qoli/SyncnextUserScriptHelper/main/SyncnextUserscriptHelper.user.js)

![Userscript-install.png](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E7%B6%B2%E9%A0%81%E8%A7%A3%E9%87%8B%E5%8A%A9%E6%89%8B%209b7cae119c0245ceb9e32a0207a3d5d1/Userscript-install.png)

### 重新載入當前網頁

返回到剛才的安裝要求頁面，我們重新載入一下網頁。

就可以看到我們的頁面界面已經發生變化，並且自動解釋網頁地址並告知 Syncnext app。

![Userscript-install-2.png](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E7%B6%B2%E9%A0%81%E8%A7%A3%E9%87%8B%E5%8A%A9%E6%89%8B%209b7cae119c0245ceb9e32a0207a3d5d1/Userscript-install-2.png)

## 小技巧

網頁助手的地址是可以保存起來的，只需要在需要使用時候重新載入網頁即可。

## 結語

希望你觀影愉快。
