---
layout: post
title: 淺嚐 Elixir
date: 2014-07-26
tags: [學程式, 函數式編程, Elixir]
---
來聊一下最近在唸的新玩具： [Elixir](http://elixir-lang.org)。
發音是：「ㄦ利ㄎ洗爾」

# Why Elixir
是說去年底 Peepcode 還活著的時候有出過一集 Elixir 的教學。我一直蠻仰慕這個寫出這本厲害的 [Craft Rails Applications](http://pragprog.com/book/jvrails2/crafting-rails-applications) 的作者 [José Valim](https://twitter.com/josevalim) ，但是這影片一直在 stack 的最底端沒機會去看。( 話說 José 是巴西人，回頭去看影片，一直會聽到小舌音的 "ㄟ赫爾"，要仔細聽前後文才發現是 "error"。)

一直到上次 [Dave Thomas](https://twitter.com/pragdave) 路過台灣被 Ruby Taiwan 社群拉來[吃熱炒](http://rubytaiwan.kktix.cc/events/dave-drinkup)，席間聊到他寫的新書 [Programming Elixir](http://pragprog.com/book/elixir/programming-elixir) 。他說電腦跟手機核心愈來愈多，分散式運算是肯定是未來五年最重要的課題之一，也提到最後出線的也許不是 Elixir ，但是出頭的那個語言必然會有相似的概念 ( 看看 go 那個精美的 goroutine ) 。加上他總是說一年要學一門讓你重新思考的新語言，講的這麼有趣，一頓飯吃完腦也被順利的洗過一輪了。

# What is Elixir

2012 才發表的 Elixir 是建在 Erlang Virtual Machine (BEAM) 上的函數式語言。繼承 Erlang 優秀的分散式運算模型 Actor model ，「目標是在 Erlang 生態系裡帶進高生產力及高擴展性的開發過程」。簡單來說就是像 Ruby 的漂亮語法，更一致的操作跟 meta-programming 能力。

Elixir 這個字是萬靈藥的意思。Dave 的新書裡還開了這樣一個玩笑："Of course, I'm not saying that Elixir is a magic potion (well, technically it is, but you know what I mean)."

> Disclaimer: Elixir 當下版本為 0.14.3。最近幾乎每個月都會有更新。雖然已有公司用在正式環境上，但幾乎都是原來就使用 Erlang 的公司才敢這麼做。另外我書也還沒整本看完。 XD

---

# 我喜歡的部份

## 0. Script and compiled

  Elixir 有兩種副檔名：`ex` 及 `exs`。執行 `exs` 副檔名時，預設會直譯並執行。若是 `ex` 副檔名，則會編譯成 BEAM binary 後執行。想要手動編譯 `exs` 檔案也是可以的。

## 1. 樣式比對 (Pattern matching)

Elixir ( 及 Erlang ) 的等號並不是單純的指派，而是樣式比對。當我們在數學上說 `y = x + 1` 時，並不是說把 `y` 指派成 `x + 1`。而是說當 `x` 為某值時，`y` 會依規則 ( 這裡指的是 + 1 ) 比對成另外一個值。

在 Ruby 中，當你寫
{% highlight ruby %}
a, a, b = [1, 2, 3] # => a 會是 2
{% endhighlight %}

因為第二次指派覆蓋了第一次指派。

而在 Elixir 中，則是這樣：
{% highlight elixir %}
[a, a, b] = [1, 2, 3]
# => ** (MatchError) no match of right hand side value: [1, 2, 3]

[a, a, b] = [1, 1, 3]
# => 因為能成功比對，a 會是 1，b 則是 3
{% endhighlight %}

樣式比對在 Elixir 裡用法相當巧妙，例如：
{% highlight elixir %}
[ head | tail ] = [1, 2, 3, 4, 5]
# =>  head 是 1, tail 是 [2, 3, 4, 5]
{% endhighlight %}

以及函式呼叫：

{% highlight elixir %}
parse_response = fn
  {:ok, value}  -> render(value)
  {:err, msg} -> show_error(msg)
end

parse_response.(response)
{% endhighlight %}
會依 `response` 是 `{:ok, something}` 或是 `{:err, something}` 決定執行的方法區塊。

## 2. List and Recursive

有了上面的樣式比對，就可以寫出非常漂亮的遞迴函式：

{% highlight elixir %}
defmodule Factorial do
  def calc(0), do: 1
  def calc(val), do: val * calc(val - 1)
end
{% endhighlight %}

以及 list 處理函式：

{% highlight elixir %}
defmodule Sum
  def calc([]), do: 0
  def calc([ head | tail]), do: head + calc(tail)
end
{% endhighlight %}

## 3. Pipe operator

我們常常看到這種程式：

{% highlight ruby %}
request = generate_request
response = get_response(request)
body = parse_body(response, :html)
html = render(body)
{% endhighlight %}

因為若想省去中間那些暫時的變數，就要寫成這樣：

{% highlight ruby %}
html = render(parse_body(get_response(generate_request), :html))
{% endhighlight %}

這看起來更醜，你得要從裡面讀到外面，而且還常常找不到開始讀的點。

Pipe operator `|>` 可以讓你把回傳值當成下一個函式呼叫的第一個參數。所以上面的例子會寫成：

{% highlight elixir %}
html = generate_request
       |> get_response
       |> parse_body(:html)
       |> render
{% endhighlight %}

當看到上面的寫法之後，我好像看懂了底下這句話：

> Functional programming is like a jounery of data transforming.

---

## 稿擠，有機會再來寫：

* The function capture notation
* Spawn a process
* pmap
* Meta-programming with marco
* Mix and Doctest

---

## What I feel until now:

之前有短暫的摸過 Clojure，也唸了兩章 SICP。不過這幾個週學 Elixir，時不時有種頓悟的感覺。好像又多了解 Functional programming 一點點。更重要的是，這語言到目前為止，讓我獲得非常多的樂趣。

Happy hacking!
