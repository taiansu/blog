---
layout: post
title: "VirtualBox 安裝 Linux Mint/Ubuntu 步驟"
date: 2012-10-23 01:58
comments: true
tags: [學程式, 環境設定, Linux]
---

1. 下載 [Linux Mint](http://www.linuxmint.com/download.php)。或是你喜歡 [Ubuntu](http://www.ubuntu-tw.org/modules/tinyd0/)，也可以下載桌面版本，但是我在 VirtualBox 上跑 Ubuntu 12.04 的安裝程式慢到令人髮指，所以就裝 Linux Mint 13 Xfce, 64 bit 了…

1. 下載 [VirtualBox](https://www.virtualbox.org/wiki/Downloads)，這兩個要下載好一陣子，吃個午餐再回來吧…

1. 安裝 VirtualBox 後執行，按下[新增]，名稱隨便你打，類型是 [Linux]，版本都是 [Ubuntu (64 bit)]。[繼續]~

1. 記憶體設 1024MB\* -> 立即建立虛擬硬碟 -> VDI -> 動態配置 -> 磁碟 30GB\* -> 建立。
    * 打*的是跟預設值不同的。

1. 在左邊清單找到剛剛建好的機器，在上面按滑鼠右鍵，選擇右鍵選單裡的【設定值】，按上面的[顯示]，把「視訊記憶體」調到最高。

1. 再按上面的[存放裝置]，在「IDE 控制器」底下的「空」上面按一下滑鼠左鍵，在右邊「屬性」區塊裡找到光碟圖示，再按下滑鼠左鍵，按【選擇虛擬 CD / DVD 光碟檔案】。接著在檔案總管裡找到剛下載的 Ubuntu 或是 Linux Mint 的 iso 檔。把光碟檔掛載好之後，按下[確定]關閉對話盒。

1. 回到 VirtualBox，按下上方的[啟動]，等機器開機之後，用滑鼠雙擊桌面上的「Install Linux Mint」(Ubuntu 不需要點光碟，直接就會進安裝畫面)，接著在左邊的語言清單捲到最下面，選[中文(繁體)]，原則上接下來就像你每次重灌那樣不斷的按[繼續]，就會裝好了。()*什麼?你不會重灌?你確定你用的是 Windows 嗎?*)過程中請注意設定帳戶名稱及密碼時，一定要選個好記的密碼。就算勾選了自動登入，以後還是會很常用到這組密碼，弄丟了可是很麻煩的。

1. 重新開機之後，記得電腦要接上網路，點選桌面右下角工作區像是盾牌的圖示，輸入密碼後會出現「更新管理員」，點選上面的「安裝更新」，你就可以先去睡一覺，醒來之後就裝完了。(這步會非常久)
