---
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

```bash
$ brew install \
  coreutils automake autoconf openssl \
  libyaml readline libxslt libtool unixodbc \
  unzip curl wxmac
```

2. 安裝 asdf
```bash
$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.2
```

3. 將 asdf init script 加到 bashrc 中，這步之後需要重啟 shell。zsh 及 fish 參考[官方說明](https://asdf-vm.com/#/core-manage-asdf-vm)
```bash
$ echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
$ echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
```

4. 安裝 asdf 的 elixir 及 erlang plugin
```bash
$ asdf plugin-add erlang
$ asdf plugin-add elixir
```

5. 用 asdf 找到可用的 Erlang 版本並安裝。安裝 Erlang 需要很久，可以去聽個兩首歌再回來。
```bash
asdf list-all erlang
asdf install erlang 22.2.6
asdf global erlang 22.2.6
```


6. 用 asdf 找到可用的 Elixir 版本並安裝。由於 Elixir 是預編譯版本，所以可以選擇用符合自己 Erlang 版本編譯的版本。
```bash
asdf list-all elixir
asdf install elixir 1.10.0-otp-22
asdf global elixir 1.10.0-otp-22
```

### Postgresql 及 NodeJs

如果想試試 phoenix，那麼需要安裝 postgresql 及 nodejs 5.5 以上的版本。這裡一樣使用 asdf 來安裝 nodejs，若你的系統中已存在其它 nodejs 版本，可以省略後面兩步。
```bash
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
```bash
$ brew cask install docker
```

2. 拉官方 image。
```bash
$ docker pull elixir
```

3. 跑起來試試看。按兩次 `Ctrl+C` 結束
```bash
$ docker run -it --rm elixir iex
```

4. 執行本機上的 elixir 檔案
```bash
$ docker run -it --rm -v $(pwd):/tmp elixir elixir /tmp/my_elixir_file.ex
```

---

# Ubuntu/Debian

## A. 使用 asdf

1. 安裝 asdf 及 erlang 需要的元件
```bash
$ apt-get -y install build-essential autoconf m4 \
libncurses5-dev libwxgtk3.0-dev libgl1-mesa-dev libglu1-mesa-dev \
libpng-dev libssh-dev unixodbc-dev
```

接著參考 Mac 的 2 ~ 6 步

---

# Windows

## A. 使用 Linux Sub System (推薦)

1. 參考[微軟官方說明](https://docs.microsoft.com/zh-tw/windows/wsl/install-win10)，安裝 Linux 子系統。若不知道要用什麼的話，那就選 Ubuntu 吧。

2. 啟動 Linux 子系統後，照著 Ubuntu/Debian 小節操作。

## B. 使用 scoop

參考 [Scoop]() 官網說明

1. 用系統管理者權限打開 powershell

2. 貼上以下指令並按 [Enter] 執行 (從官網 copy 會比較方便)

```powershell
iwr -useb get.scoop.sh | iex
```

3. 安裝 elixir

```powershell
scoop install elixir
```

4. 執行看看

```powershell
iex.bat
```


## C. 使用 chocolatey

參考 [chocolatey](https://chocolatey.org/install) 官網說明

1. 用系統管理者權限打開 powershell

2. 貼上以下指令並按 [Enter] 執行 (從官網 copy 會比較方便)

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

3. 安裝 elixir

```powershell
choco install elixir
```

4. 執行看看

```powershell
iex.bat
```

## D. 使用 Docker
同 Mac -> C. 使用 Docker
