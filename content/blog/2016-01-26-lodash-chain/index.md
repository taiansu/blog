---
layout: post
title: "Pipe of JavaScript: _.chain()"
date: 2016-01-26 02:35
comments: true
tags: [學程式, 函數式編程, JavaScript]
image: /assets/post_img/2016-01-26-lodash-chain/coffee-machine-compress.png
image2: /assets/post_img/2016-01-26-lodash-chain/coffee-machine-mobile-compress.png
---

> Update: 後來發現這個解法有一些缺點。目前大多用 Ramda 的 `pipe` 或 `compose` 來處理。不然就等 tc39
上的 proposal 吧。

---

不知道從什麼時候開始，愈來愈喜歡用 functional 的寫法來處理問題。在看完 [JavaScript
Allonge](https://leanpub.com/javascriptallongesix) 之後更是一發不可收拾。上次的 [Elixir 文章](/2014-07-26-a_sip_of_elixir/)提到了愉快的 `|>` Pipe operator。一直想著怎麼 JavaScript 沒有類似的東西，但試過各種關鍵字就是找不到。

直到前陣子因[工作需要](#1)，認真的翻了 Lodash 文件，才發現真是踏破鐵鞋無覓處，那 function 就是接下來要介紹的 `_.chain()` 及 `_()`。找了一下中文世界似乎沒有什麼說明，寫個小心得看看是不是真的只有我 Lag 了 XD

先從問題開始，手邊有如下的資料結構：

```js
const poData =
  [
    { poNumber: 'FA1234-1', designName: 'A',,,, },
    { poNumber: 'FA1234-5', designName: 'B',,,, },
    { poNumber: 'FB2234-1', designName: 'C',,,, },
    { poNumber: 'FC3141-1', designName: 'D',,,, },
  ]
```

想要拿到不重複的 `poNumber` 的前半段。

```js
['FA1234', 'FB2234', 'FC3141']
```

函數式的分解動作解法如下：

```js
const poNumbers     = _.map(poData, 'poNumber')
const poNumberParts = _.map(poNumbers, num => num.split('-')[0])
const result        = _.unique(poNumberParts)

// => ['FA1234', 'FB2234', 'FC3141']
```

但其實我們不需要中間那些臨時變數，所以可以寫成這種 Wirte only 風格來累積仇恨值：

```js
const result = _.unique(_.map(_.map(poData, 'poNumber'), num => num.split('-')[0]))
```

縮排一下，看起來有點像 Lisp 了。但問題是執行順序是由內到外的，相當反直覺。
```js
const result = _.unique(
                  _.map(
                    _.map(poData, 'poNumber'),
                    num => num.split('-')[0]
                  )
                )
```

我們想要的，其實就是把函式執行的結果，當成呼叫下一個函數時的第一個參數。
而 Lodash 的 `_.chain()` 的功能正是如此：

```js
const result = _.chain(poData)
                .map('poNumber')
                .map(num => num.split('-')[0])
                .unique()
                .value()
```

由於 `_.chain()` 是 lazy evaluation，所以要在最後方加上 `.value()` 才會開始調用。否則只會回傳一個未調用的嵌套函式。 Lazy evaluation 的好處是上例中的兩個 `_.map` 及一個 `_.unique`，在實際執行時陣列只會遍歷一次，效能可能會比原先的寫法好一點。

另外 Lodash 還提供了 `_()`，如果在 chaining 過程中出現了 `_.reduce()`，`_.merge()`
等等會處理成單一結果，或是會回傳 primitive value 的函式調用，就會自動 unwrap。

```js
const data = [
  {name: 'A', usdPrice: 10},
  {name: 'B', usdPrice: 20},
  {name: 'C', usdPrice: 30},
]

const twdTotal = _(data)
                .map('usdPrice')
                .map(num => num * 31)
                .reduce(_.add)

 // 呼叫了 _.reduce() ，所以不需要呼叫 _.value() 就會回傳數值
 // 這是個很假的範例不過你知道我意思。
```


要注意雖然這個寫法看起來也是*一路點下去*，但是他的思路跟運作機制都與 jQuery 那種回傳 `self` 以繼續在同一個(變形過的) 物件上操作方法的 fluent style 是完全不同的。這種 chaining call 的運作方式是回傳一個用後方函式包裹前方函式的函式，讓你可以繼續包下去或調用。這概念及用法與 Rx.js 的 Observable 非常類似。

另外 underscore 也有 `_.chain()`，沒有仔細看但是印象中用法雷同。

<hr className="my-4" />

* 即便是離開的資訊圈到南洋島國上做印刷，還是要處理傳產的 Excel 惡夢。反正沒有人要看 code，索性變本加厲的用上了 Rx.js。
* 呼叫函式 => call the function，函式調用 => function invocation。兩者同義，依行文流暢擇用。
* 最近繼續唸 Elixir/Erlang，OTP 好有趣啊。

