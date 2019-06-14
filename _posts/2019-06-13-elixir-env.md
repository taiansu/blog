---
layout: post
title: "安裝 Elixir 環境"
date: 2019-06-13 01:00
comments: true
tags: [學程式, Elixir, 函數式編程]
---


本文介紹幾種在電腦上安裝 Elixir / Erlang 環境的方法。



# Mac


## A. 使用 asdf (推薦)

[asdf](https://github.com/asdf-vm/asdf) 是類 unix 作業系統上類似 rvm, rbenv 或 nvm 的語言版本管理套件。特別之處在於它可以安裝不同的 plugin 來管理[多種不同的語言](https://github.com/asdf-vm/asdf-plugins)。

### pre request
* homebrew
* git

### Install

1. 安裝 asdf 及 erlang 需要的元件
```
$ brew install \
  coreutils automake autoconf openssl \
  libyaml readline libxslt libtool unixodbc \
  unzip curl wxmac
```

2. 安裝 asdf
```
$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.2
```

3. 將 asdf init script 加到 bashrc 中，這步之後需要重啟 shell。zsh 及 fish 參考[官方說明](https://asdf-vm.com/#/core-manage-asdf-vm)
```
$ echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
$ echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
```

4. 安裝 asdf 的 elixir 及 erlang plugin
```
$ asdf plugin-add erlang
$ asdf plugin-add elixir
```

5. 用 asdf 找到可用的 Erlang 版本並安裝。安裝 Erlang 需要很久，可以去聽個兩首歌再回來。
```
asdf list-all erlang
asdf install erlang 22.0.2
asdf global erlang 22.0.2
```


6. 用 asdf 找到可用的 Elixir 版本並安裝。由於 Elixir 是預編譯版本，所以可以選擇用符合自己 Erlang 版本編譯的版本。
```
asdf list-all elixir
asdf install elixir 1.8.2-otp-22
asdf global elixir 1.8.2-otp-22
```

### Postgresql 及 NodeJs

如果想試試 phoenix，那麼需要安裝 postgresql 及 nodejs 5.5 以上的版本。這裡一樣使用 asdf 來安裝 nodejs，若你的系統中已存在其它 nodejs 版本，可以省略後面兩步。
```
# 1. 安裝 postgresql
$ brew install postgresql

# 2. 安裝 asdf 的 nodejs plugin
$ brew install gpg
$ asdf plugin-add nodejs
$ bash~/.asdf/plugins/nodejs/bin/import-release-team-keyring

# 3. 用 asdf 安裝 nodejs
$ asdf list-all nodejs
$ asdf install nodejs 12.4.0
$ asdf global nodejs 12.4.0
```

### 完工

試一下會不會動：
```
$ elixir -v
$ which erl

## 如果有裝 phoenix 的話
$ mix phx.new --version
```

---

## B. 使用 homebrew

由於這個方法會跟著 homebrew upgrade 一起更新版本，所以比較適合下載來玩一下的情況。長時間的正式專案開發可能會遇到一些雷。

```
$ brew install erlang elixir
```

---

## C. 使用 Docker

1. 安裝 docker
```
$ brew cask install docker
```

2. 拉官方 image。也可以不加 tag 直接拉預設版本，但是該版本有 1.08GB。相較之下 alpine 版只有 82 MB。
	```
$ docker pull elixir:1.8-otp-22-alpine
	```
```
	

3. 跑起來
```
$ docker run elixir:1.8-otp-22-alpine -it --rm iex
```

---

# Ubuntu/Debian

## A. 使用 asdf

1. 安裝 asdf 及 erlang 需要的元件
```
$ apt-get -y install build-essential autoconf m4 \
libncurses5-dev libwxgtk3.0-dev libgl1-mesa-dev libglu1-mesa-dev \
libpng-dev libssh-dev unixodbc-dev
```

2~6 步與 Mac 的做法相同

---

以下待補完

# Windows

## A. 使用 Linux Sub System (推薦)

## B. 使用 scoop (第二優先選擇)

## C. 使用 chocolatey

## D. 使用 Docker
```