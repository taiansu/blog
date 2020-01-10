---
title: "Ruby 2.6 的新功能"
date: 2019-01-26 03:30
comments: true
tags: [學程式, Ruby, 函數式編程]
image: /assets/post_img/2019-01-26-ruby-26/title.jpg
---

Ruby 2.6 除了~~主打的~~ JIT 之外，還引進了一些有趣的新功能。其中有一些可以讓 Ruby 在函數式風格的寫法上更加自然流暢。想來稍微展示一下這些功能的用法。

## 1. Compose operator:<br /> `Proc.>>` 及 `Proc.<<`

雖然 Ruby 天生在某些用法上就採用了函數式風格(例如沒有 for 迴圈，而是用 each + block)，但由於高階函式接受的是 block 而非 lambda，lambda 本身也無法簡單組合起來。所以一直以來匿名函式在 Ruby 中除了拿來當參數傳遞之外，用法相當受限。

在正統的函數式編程中，用 function composition 的方式將多個小函式組合在一起是很基本的操作，舉個之前的例子，假設你想要這樣的連續調用：

```ruby
# 注意，因為假設這些函數都是 lambda，所以要用 `.()` 調用
request = generate_request.()
response = get_response.(request)
body = parse_body.(response)
html = render.(body)
```

其實除了 `html` 這個最終結果外，我們不需要中間的臨時變數，而可以改寫成這樣(然後被同事記恨)：

```ruby
html = render.(parse_body.(get_response.(generate_request.())))
```

Ruby 2.6 開始你可以用 `<<` (compose) 或是 `>>` (pipe) 來組合 Proc (或 lambda)。假設我們有兩個 lambda `f` 與 `g`，這兩個運算子的作用如下：

```ruby
(f >> g).(x)
# 等同於
g(f(x))


(f << g).(x)
# 等同於
f(g(x))
```

我自己的記憶方式是把這兩個 operator 看成函式呼叫流程的箭頭。`f >> g` 就是先調用 `f` ，再將結果傳進 `g`。反之 `f << g` 則是先調用 `g` 再傳給 `f`。

那麼之前的例子就可以改成下列兩者之一：
```ruby
get_html = generate_request >> get_response >> parse_body >> render
html = get_html.()

# 或是

get_html = render << parse_body << get_response << generate_request
html = get_html.()
```

Ruby 2.6 的文件範例如下：

```ruby
f = proc {|x| x * x}
g = proc {|x| x + x}

(f << g).call(2) # => 16
(f >> g).call(2) # => 8
```

再進階一點配合 Ruby 原本就有的 `Object#method` 及 `Method#curry`，想來可以組合出非常有意思的寫法。

## 2. Enumerable#filter

函數式編程最著名的三個高階函式就屬 `map`、`reduce` 及 `filter` 了。但在 Ruby 中，`filter` 這個高階函式被改名為 `select`，這一版加上了 `filter` 的別名，跟其它語言的慣用法一致，再也不會等到測試爆掉才想起函式名稱不一樣了。

```ruby
[1, 2, 3, 4].filter {|i| i % 2 == 0} # => [2, 4]
```


## 3. Endless range

現在範圍運算子 `..` 可以不加結束的參數：

```ruby
[:a, :b, :c, :d][2..] # => [:b, :c, :d]


(:b..).lazy.zip(10..).first(3) # => [[:b, 10], [:c, 11], [:d, 12]]
```

## 4. Array#union and Array#difference

`Array#union` 是聯集，`Array#difference` 是差集。直接上範例：

```ruby
[1].union([2, 3], [1, 2, 4, 5]) # => [1, 2, 3, 4, 5]


[1, 1, 2, 2, 3, 3, 4, 5].difference([1, 2, 4]) # => [3, 3, 5]
```


## 結語

除了這些之外，`Proc.call` 調用快了大約 1.4 倍。另外還有 `Object#then`、`Hash#merge`、`Enumerable#to_h` 等等，就找機會試玩看看吧。Happy hacking!
