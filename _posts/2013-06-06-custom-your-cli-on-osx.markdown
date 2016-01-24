---
layout: post
title: 量身訂作 Mac 的 Command Line Interface
date: 2013-06-06 00:42
comments: true
tags: Programming, Config
---

之前答應的事欠很久，就用這篇來還吧。

<!-- more -->
身為 Ruby/Rails 開發者，每天跟 [Command Line Interface (CLI)](http://zh.wikipedia.org/wiki/%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%95%8C%E9%9D%A2) 混在一起是再正常也不過的了。

之所以買 Mac，就是因為 Mac 的 CLI 跟 Windows 渣一般的命令提示字元不是同一個等級的東西。即使如此，要是每次打開內建的終端機，都看到是下圖這個樣子，也很難不心生畏懼一下的。

[![Original OSX CLI](https://lh6.googleusercontent.com/-j_2AS_FWZGI/Ua8_nAeEpaI/AAAAAAAAAQQ/8T_sNU4hEwE/w958-h696-no/cli_origin.jpg)](https://lh6.googleusercontent.com/-j_2AS_FWZGI/Ua8_nAeEpaI/AAAAAAAAAQQ/8T_sNU4hEwE/w958-h696-no/cli_origin.jpg)

既然是每天拿來吃飯的工具，我自己用了 iTerm2，Oh My ZSH，再選一個喜歡的 [monospace 字體](http://zh.wikipedia.org/wiki/%E7%AD%89%E5%AE%BD%E5%AD%97%E4%BD%93)，把它弄成這樣:

[![Prettier OSX CLI](https://lh4.googleusercontent.com/-f5Qb2cT_gis/Ua9h2-9jeaI/AAAAAAAAARU/DKyVwKdAylY/w958-h683-no/cli_after.jpg)](https://lh4.googleusercontent.com/-f5Qb2cT_gis/Ua9h2-9jeaI/AAAAAAAAARU/DKyVwKdAylY/w958-h683-no/cli_after.jpg)

##monospace 字體
好用的 monospace 字體其實蠻多的，可以從[這裡](http://www.slant.co/topics/67/~what-are-the-best-programming-fonts)挑一個。基本上就是 `1`，`l`，`I` 及 `0`，`o`，`O` 要分的清楚，其它就是個人喜好了。我目前用的是 Source Code Pro，之前則是 [Bitstream vara sans mono](http://www.dafont.com/bitstream-vera-mono.font)。

## iTerm2
iTerm2 不是必要的，但它提供了原生的 Terminal.app 所沒有的幾個好用功能：

1. <kbd>command</kbd> + click to open file
1. Split pane view
1. Hotkey Instant terminal anywhere
1. Highlight word when searching
1. Mouseless copy
1. Paste history

到[官網](http://www.iterm2.com/downloads/stable/iTerm2_v1_0_0.zip)下載後解壓縮，然後丟到 Application 裡。

執行 iTerm2，到 Preference 改 Profiles => Default => Text 選擇你剛裝好的字體。

####進階自訂選項

[SMYCK](http://color.smyck.org/)，[railscasts theme](https://github.com/rickharris/vim-railscasts) 都是蠻不錯的配色。下載後點兩下匯入，再去 Preference 改 Profiles => Default => Colors。

##oh-my-zsh

oh-my-zsh 讓你可以不用再辛苦的手刻 config file，就內建一堆好用的 plugin(*註)， 還提供一堆主題讓你挑選。因為我比較喜歡 zsh 的補完功能，如果你還是想用 Mac 預設的 bash，[bash-it](https://github.com/revans/bash-it) 看來可以做到類似的事。但因為我沒用過，所以請自行踩雷。

安裝 oh-my-zsh 的方式，就是打開剛剛裝好的 iTerm2 ( Terminal.app 也可以)，貼上這行指令:

``` shell
curl -L http://install.ohmyz.sh | sh
```

更多 Oh My ZSH 的設定可以參考 RailsCasts 的[影片](http://railscasts.com/episodes/308-oh-my-zsh)

### 進階自訂選項

到 [zshthem](http://zshthem.es/all/) 挑一個順眼的主題，記下上方的名字。(裡面沒有列出全部可用的主題，像是很多人愛用，但是需要特殊字體的 agnoster)。我用的是 af-magic。

修改 `~/.zshrc` ，把 `ZSH-THEME="xxxxx"` 的xxxxx改成你剛剛記下來的字，儲存。然後回到 iTerm2，輸入 `source ~/.zshrc`

---

__提醒__：

  * `~/.zshrc` 底下的 `plugins="(.....)"` 千萬要慎選。

    看清楚 `~/.oh-my-zsh/plugins/` 裡的相應的檔案內容。我曾經被 bundler plugin 搞掉好幾個小時。

  * 指令上色是用 [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) 做的。

    想要的話就參考連結裡的說明。

---

__UPDATE__:

後來我改用 [prezto](https://github.com/sorin-ionescu/prezto) 來取代 ohmyzsh，功能跟佈景主題比較少，但啟動速度較快.

