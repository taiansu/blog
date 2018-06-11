---
layout: post
title: Elixir 二三事
date: 2017-01-07 02:17
comments: true
tags: [學程式, 函數式編程, Elixir]
image: /assets/post_img/2017-01-07-about-elixir/railway-station-compress.jpg
image2: /assets/post_img/2017-01-07-about-elixir/railway-station-mobile-compress.jpg
---

自從 2014 被 [Dave Thomas 推坑](../2014-07-26-a_sip_of_elixir/)至今也好一陣子了。前些時候發現自己被 tag
成社群中的[推坑預設嫌疑人](https://www.facebook.com/sutaian/posts/10211656942716422)，想說來記錄一下以 Elixir 為主力開發語言以來的一些理解與心得。

## 總是要提一下 Erlang

Elixir 會跑在 Erlang VM 上。因此許多 Erlang 的特性與解法，在 Elixir 上都可以直接套用。在 Erlang 裡，有一整包這種函式庫、中介軟體及工具的集合, 叫做 [OTP](https://zh.wikipedia.org/wiki/%E9%96%8B%E6%94%BE%E9%9B%BB%E4%BF%A1%E5%B9%B3%E5%8F%B0)。在 Erlang/OTP 中有許多電信產業已經解決，也非常適合網路應用程式的神奇特性：

#### 1. 平行、分散式：_lightweight process_
在 Elixir/Erlang 中，每段程式會在獨立的輕量 VM process 裡平行運作，不共享記憶體。各自透過 message 來交換資訊。因此系統在一台機器上運作，跟在一百台機器上運作的方式完全相同，水平擴充起來非常容易。在 Elixir/Erlang 中使用 process，就如同在 OO 語言裡使用 object instance 一般，是非常基本的手法。

Chris McCord 在 2016 Erlang Factory 演講，說一台 phoenix web server 可以撐住兩百萬 user session。Erlang 作者 Joe Armstrong 這樣[回應](http://joearms.github.io/2016/03/13/Managing-two-million-webservers.html)：

> 在 Erlang/Elixir 系統裡,  
> 沒有**一台 web-server** 可以撐住兩百萬個 session 這種事，  
> 我們有的是**兩百萬個 web-server**，每個各處理一條 session。

#### 2. 高容錯：_supervisor tree_
而這些 process 裡，有一種特殊的角色叫 _supervisor_，他的工作是啟動並控管一群 process，當其中的 process 因故陣亡時，他也要依情況決定如何反應，例如補足不夠的 process，或是整批重新設定等等。

Supervisor 也可以控管 supervisor，因此夠大的 Erlang/Elixir 系統，大多都會是一顆 supervisor
tree，在出錯時會想盡辦法依設定自動復原。Phoenix 框架生成的應用程式其實就是一顆 supervisor tree。

> Erlang The Move: II  
> 你可以直接往它臉上開霰彈槍，它只會停一秒，然後繼續前進，就像魔鬼終結者裡演的那樣。

#### 3. Hot update
我們從來沒有聽過因為電話系統要升級，所以某段時間大家都不能打電話的情況。Erlang 能做到在不影響其它運作中使用者的情況下，修復/升級部份元件。1990 拍的 [Erlang the movie](https://www.youtube.com/watch?v=xrIjfIjssLE) 後半段就有 Hot update 的示範。__注意__：*這是近三十年前的影片，非常 old school。*

Youtube 上還曾經有示範在 AR Drone 四軸飛行器寫 bug，並且在空中飛行時把 bug 修掉繼續飛的[影片](https://plus.google.com/+RichardCarlsson/posts/UBMensoXyxG)，是所謂 "In-flight update, litterally"，但後來不知為何下架了。

> Erlang [宣稱](http://stackoverflow.com/questions/8426897/erlangs-99-9999999-nine-nines-reliability) 曾在 AXD301 ATM 機器上達到 9 個 9 的上線時間，也就是 99.9999999%。

## 回來講 Elixir

既然有這麼多好處，為什麼不直接學 Erlang 呢？ 這門語言這麼久以來都沒有很熱門，想來是有一些原因的。Elixir 帶來了這些好東西：

* 較為直覺友善的語法
* 內建的多功能 Build tool: mix
* 內建的測試框架 ExUnit 及三位一體的 doctest
* 好用的 Standard library，像是 Stream, Path 及 File 等等。
* 極為強大且容易操作的 meta-programming 能力
* Phoenix web framework 及光底層就很好用的 [Plug](https://github.com/elixir-lang/plug)

另外由於 Elixir 是直接編譯成 BEAM binary，而非先轉成 Erlang 再編譯，所以兩者的效能理論上是在同一個數量級的。許多評測顯示 Elixir 編譯出來的效能與 Erlang 相較慢一兩個百分比，推測是編譯優化上還有進步的空間。

## 目前為止的心得

由於語法上很像 Ruby，所以開始寫的時候有一種安全感。接著要開始習慣的是 Functional programming 的思考模式。我自己因為持續在碰 React/Redux 及 Rx.js，所以這部份對我來說相對比較輕鬆，而國外的幾篇心得都說從 Ruby 跳過來寫 Elixir，要做到一樣的事大約就是兩週到三個月的轉換期。

前陣子還發生幫人家改 Ruby code，一直想要寫 `apply` 去動態呼叫, 被 Manic 提醒說「在 Ruby 裡那個叫 `send` 吧？」的糗事。

再接下來就發現大多數的底層核心，都是靠 macro 機制跟 Erlang 的 OTP 來完成的。熟悉 Erlang 生態圈裡的做事方式，可以讓應用程式拿到更多平行、高容錯機制的好處，這些就得花時間來磨經驗了。


## 目前個人進度
* 讀完 Programming Elixir
* 讀完 Elixir in Action
* 讀完 Programming Phoenix
* 讀完 Meta-programming Elixir
* 1/2 Programming Erlang
* 1/3 The Little Elixir & OTP Guild Book
* 1/3 Learn you some Erlang for great good
* 1/4 Designing for Scalability with Erlang/OTP
* 跟 [Mickey Chen](https://www.facebook.com/mickey.1985) 一起<s>撐</s>辦到[第九場 Elixir Taiwan](http://elixirtw.kktix.cc/events/taipei201701)
* 寫了一個 library 叫 [pipe_to](https://github.com/taiansu/pipe_to)
* 在 Rubyconf Taiwan 2016 給 [talk](https://2016.rubyconf.tw/#TAI-AN SU)

## 接下來的計劃
* 先清掉沒看完的書
* Erlang in Anger
* Elixir cookbook
* 繼續辦 Elixir Taiwan
* 在 [Web tech topic](https://www.facebook.com/groups/webtechtopic/?fref=ts) 也有計劃籌備中
* 繼續定期去 [Ruby 默默會](https://www.facebook.com/rubymokumokukai/?fref=ts)推坑

