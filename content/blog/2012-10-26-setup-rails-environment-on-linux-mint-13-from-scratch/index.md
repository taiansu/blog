---
layout: post
title: "在 Linux 安裝 Rails 環境"
date: 2012-10-26 22:47
comments: true
tags: [學程式, 環境設定, Rails]
---

## 安裝必要元件

開啟「終端機模擬程式」(在 Menu 裡)，分別輸入底下每一行指令後按<kbd>Enter</kbd>。先不要整塊複制貼上，得一行行輸入。如果指令很長懶得打的話，在 Linux裡開瀏覽器 (Menu -> 網際網路)，找這篇文章一步步複製貼上。

```bash
sudo apt-get update
```

按下<kbd>Enter</kbd>後會要求你輸入密碼，按密碼時螢幕沒有反應是正常的，就打進去按<kbd>Enter</kbd>。

```bash
sudo apt-get upgrade
```

完成後中間若有要求取代檔案的訊息，一直按<kbd>Enter</kbd>同意。

```bash
sudo apt-get install curl build-essential zlib1g-dev libssl-dev libreadline-dev xclip git
echo "alias clipboard='clip -sel clip'" >> ~/.bashrc
```

上面的 zlib1g 請拼對，前面是`L`後面是`1`，在這裡卡關就太冤了。

---

## 安裝 rbenv

首先安裝 rbenv

```bash
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo "export PATH='$HOME/.rbenv/bin:$PATH'" >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL
```

再安裝 ruby-build

```bash
mkdir -p ~/.rbenv/plugins
cd ~/.rbenv/plugins
git clone git://github.com/sstephenson/ruby-build.git
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
```

總算要開始裝 Ruby 跟 Rails 了。

```bash
rbenv install 2.1.2
rbenv rehash
rbenv global 2.1.2
ruby -v
gem install bundler rails
rbenv rehash
rails -v
```
