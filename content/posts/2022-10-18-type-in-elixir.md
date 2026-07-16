---
title: 聊聊 Elixir 中的 type
date: '2022-10-19T00:57:56+0800'
slug: 2022-10-18-type-in-elixir
---

最近有幾位朋友分別來問 Elixir 的 type 的問題，想說中文世界好像沒有比較完整的東西，就把知道的東西整理出來。

<!--more-->

## (目前) Elixir 的 type 能做什麼？

tl;dr: 最主要是文件，然後在某種程度下防止錯誤。

我覺得這應該是在研究 Elixir 的 type 時最需要知道的事情了。不像 Haskell 及 F# 這種以型別著稱的 ML 系語言，Elixir / Erlang 本質上是個動態語言，所有與型別有關的標註都會被編譯器忽略。而 Erlang 內建的型別檢查工具 dialyzer 是採用 success typing，在型別 _有可能_ 是正確的時候就視為通過 (等一下會看到有趣的範例)，所以目前在 Elixir 中撰寫型別標注最主要還是用做於程式相互操作間的文件溝通使用。

我自己個人的習慣通常是剛開始寫 code 時不會標注型別，然後在寫測試程式時把 public 的函式都標上型別。當然也有專注在資料結構的情況，這時候才會一開始就對型別比較講究。

## Elixir 的型別標注語法

Elixir 的型別語法主要就看官方文件的 [typespecs 這一頁](https://hexdocs.pm/elixir/1.12/typespecs.html)。比較值得另外提的就是 sum type (union type) 跟 product type 的標記方式。在 Elixir 裡 sum type 是用 `|` 這個符號來分隔。而 product type 就是用 tuple 語法了。來個範例：

```elixir
defmodule Card do
  # 自定義的型別用 @type
  # 四種 atom 中的一種
  @type suit() :: :clubs | :diamonds | :hearts | :spades

  # 2 到 10 的數字或是四種 atom 中的一種
  @type rank() :: 2..10 | :jack | :queen | :king | :ace

  # product type 用 {}
  # t 表示 Remote type。這個會變成 Card module 本身的 type，
  # 可以用 Card 或是 Card.t() 來指涉這個型別
  @type t :: {rank(), suit()}

  # 標注函式型別用 spec
  # 接收 list of cards, 回傳 card
  @spec deal([Card]) :: Card
  # 同一個模組下也可以直接用 t 表示，改成這樣：
  # @spec deal([t]) :: t
  def deal(cards) do
    # not implement yet
  end
end
```

## 比較有用/有趣的內建 type

數字的話有 `neg_integer()`、`non_neg_integer()` 跟 `pos_integer()` 可以用。

高階函式可以用 `(type1 -> type2)` 等箭號系列當做參數或是回傳值的型別標注。

有 `nonempty_list` 表示不為空的串列，跟 `maybe_improper_list`，用來表示中間階段，其結尾還不是 `[]` 的 list，那麼就有延伸的 `nonempty_improper_list`、`nonempty_maybe_improper_list`

在 map 的部份可以做出非常細緻的定義，需要有什麼 key，對應的值的型別是什麼，還有可以有 optional 的選項。這些就請看文件了。

`mfa` 代表 `{module, funciton_name, arity}` 的 tuple，這個在做 meta-programming 的時候蠻好用的。

## 其它的標註屬性

`@typep` 用來表示這個自定義的型別只在目前的 module 中可見，而 `@opaque` 則是外界看得到這個型別，但是無法知道裡面的結構。

而 `@callback` 跟 `@macrocallback` 則是在操作 Behaviour 的時候使用的，常見的情況就是在實作 GenServer 或其它的 Behaviour 時，標註 `@callback` 就會幫你檢查是否所需要的 callback 都有妥善的依規格實作。

## Success typing 是什麼

我們來寫一個 compare 的例子，給兩張牌，回傳第一張跟第二張相比的大小。

```elixir
@spec compare(Card, Card) :: :gt | :eq | :lt
def compare(_c1, _c2) do
  "opps"
end
```

在無視輸入直接回傳一個錯誤的型別， 如果你的編輯器有裝 language server protocol，那麼就會跳出有問題的提示：

<img src="uploads/2022/47762f8538.png" alt="Wrong spec" title="spec_wrong.png" border="0" width="598" height="128" />

或是你也可以在 project 中安裝 [dialyxir](https://github.com/jeremyjh/dialyxir)，這是 Erlang 內建的型別檢查工具 dialyzer (唸 di-a-lai-zer) 的 wrapper，按其說明 compile 並執行，就會開心的看到如下的錯誤訊息：

<img src="uploads/2022/9c692aa581.png" alt="Dialyzer error" title="dialyzer_error.png" border="0" width="599" height="339" />

那麼把型別改成正確的回傳就沒問題了：

<img src="uploads/2022/df28e3b443.png" alt="Type correct" title="type_correct.png" border="0" width="581" height="242" />

那如果不是固定的值，而是計算的結果呢？回傳 `1 + 1`，一樣可以看到型別錯誤的提示。

<img src="uploads/2022/e256aaed6c.png" alt="Calc type error" title="calc_type_error.png" border="0" width="597" height="180" />

不過我們高興的太早了。如果我們這樣寫的話， success typing 會認為這段程式碼是 _合法的_。

<img src="uploads/2022/4a2bd0026c.png" alt="wat" title="type_wat.png" border="0" width="566" height="211" />

原因是因為雖然"我們"知道這段程式碼只會回傳 "wat" 字串，但是 Elixir 不知道。在型別檢查階段，只能確認 `Enum.random/1` 函式的回傳型別是 `any()`，所以 dialyzer 覺得呼叫 `Enum.random/1` 回傳 `:eq | :gt | :lt` 其中一個的機率不為零，所以就放行了…這段程式碼只接收了 list of string 的這個事實，要到編譯階段才會知道，但那時型別標注都已經被移掉了。

看到這裡應該就可以理解為什麼 Elixir / Erlang dev 一直以來沒有非常認真的看待 type 的原因了。

## 還有一些其它的

不過只要是會長期維護的專案，我個人的習慣還是都會加上 dialyxir 並設到 CI 裡。經驗上我還是有好幾次在修改了程式碼後，unit test 通過但是型別檢查噴了錯誤訊息救到我的案例出現。

而在社群的關注下， José Valim 在 ElixirConf EU 2022 講了很久的 typing 的議題，也宣布了有想要朝 gradual typing 進行認真的研究的方向。在上個月也在官網發了文章把 talk 的內容匯整起來：

[https://elixir-lang.org/blog/2022/10/05/my-future-with-elixir-set-theoretic-types/](https://elixir-lang.org/blog/2022/10/05/my-future-with-elixir-set-theoretic-types)

不過官方目前的態度是不知道這個研究會產生什麼結果，所以也只能等著看看了…
