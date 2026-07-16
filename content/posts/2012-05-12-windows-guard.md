---
title: 在 Windows 7 安裝 Guard
date: '2012-05-12T09:13:00+0800'
slug: 2012-05-12-windows-guard
---

寫Rails的人都知道 [Guard](https://github.com/guard/guard) 實在好用的要命，修改檔案後按下存檔的那一瞬間，就幫你跑 RSpec/jasmine/spork 測試、還能自動重新整理頁面。

之前撐在 PC 下寫 Rails 時，著實花了一些功夫才讓 Guard, Guard-Livereload 在 Windows 7 64-bit 上跑起來，以下是錯誤嘗試後的快速通關教學。

<!--more-->

首先你要確定：

>  1. 有把 [Ruby](http://rubyinstaller.org/downloads/) 裝起來。
>  1. 裝好 [DevKit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)。
>  1. 記得設定好 path。

安裝步驟：

```powershell
C:\>gem install eventmachine --pre
C:\>gem install em-websocket rb-fchange win32console rb-notifu
C:\>gem install guard guard-livereload

C:\>guard init livereload
```

接著裝上[瀏覽器插件](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei)，在終端機上打 `guard` 後，按下瀏覽器上的 Livereload 圖示開始監聽。修改檔案並儲存時，就會自動重新整理頁面了。

ps.: 也可以用 [LiveReload.js](https://github.com/livereload/livereload-js) 取代瀏覽器插件。
