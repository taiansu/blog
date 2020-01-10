---
title: "JavaScript vs Coffeescript 2: splats"
date: 2012-06-19 23:10
published: true
comments: true
tags: [學程式, CoffeeScript]
---

> Update: 嗯… 當 2018 ES6 普及後， coffeescript 變成要花費心思去移掉的東西了…

---

  [上一篇](/201205/taste-of-javascript-and-coffeescript-i-arguments/)提到呼叫 JavaScript 函式的引數可以是任意值，但是當函式需要超過三個引數時，由於不像強型別語言有型別及引數個數的檢查，在呼叫時要注意順序是很麻煩的事。實務上常會使用物件來處理大量引數的需求。

> 在 JavaScript 中，常使用物件來處理大量參數的需求


```js
function showName(name){
  console.log(name.first + " " + name["last"] + " "+ name["middle"]);
}

showName({"last"  : "Lee",
          "first" : "John"})

//John Lee undefined
```

如範例中所示，我們先宣告函式的參數為 `name`，由於我們預期傳進來的會是一個物件，所以在函式內部用 `.` 或是 `[]` 取得物件的屬性。

呼叫此函數時，我們直接傳進一個物件實字(object literal)，物件中屬性的順序可以任意調換。如果有缺少的屬性，在函式中就會拿到 `undefined`。

在 CoffeeScript 中，有一種叫 destructuring object function parameters 的語法:

```coffeescript
motorcycle = ({ brand, year } = { brand: 'Unknown', year: "1999" }) ->
  alert "brand: #{brand}, year: #{year}"

motorcycle()
#brand: 'Unknown', year: "1999"

motorcycle year:"2005", brand:"YAMAHA"
#brand: 'YAMAHA', year: 2005
```

在第 1 行函式宣告的括號中，用物件實字語法指定屬性，並加上一個預設的物件。呼叫函式時，若沒有傳入任何物件，就會以預設的物件處理。若要傳入引數，也可以不照順序。但是若只傳了部份的引數，其它未定義的屬性一樣會取得 `undefined` 值。另外它跟上面 JavaScript 的慣例一樣，會違反 Law of Demeter，讓函式定義與呼叫耦合。而上一篇介紹過的 Splats，可以更靈活的解決這個問題。

> CoffeeScript 的 Splats 可以用在函式宣告及函式呼叫上，運作方式就跟你夢想中的一樣。

而 CoffeeScript 的 Splats 相當漂亮的解決了這個問題。Splats 不只能放在函式宣告的結尾，也可以放在你想像得到的任何地方。

```coffeescript
#Section I
run_from_killer = (survivors..., victim)->
  console.log "dead: #{victim}, survive: #{survivors}"


run_from_killer "John"
#dead: John, survive:
run_from_killer "John","Bob","Alex","Sam"
#dead: Sam, survive: John,Bob,Alex


#Section II
fruit = (first, middle..., last) ->
   console.log "first: #{first}, last: #{last}, middle: #{middle}"

fruit "apple", "banana"
#first: apple, last: banana, middle:

fruit "apple", "banana", "coconut", "dragon fruit"
#first: apple, last: dragon fruit, middle: banana,coconut

#Section III
my_cargo = ["cherry","pear","papaya","orange","mango"]

fruit my_cargo...
#first: cherry, last: mango, middle: pear,papaya,orange
#first: apple, last: dragon fruit, middle: banana,coconut
```

在 `Section I` 裡，我們宣告最後一個引數為 victim，其它的為 survivors。在第 6 行只用一個參數呼叫時，survivors 是空的陣列, 由於是空的陣列，所以不會有 `undefined` 值。而在第 8 行用多個參數呼叫時，最後一個參數會被指派為 victim，其它的屬於 survivors 這個陣列。

在 `Section II` 裡，把 splats 擺在中間，跑出來的結果，就如同你猜的那樣。它會將第一個跟最後一個引數對應到 `first` 及 `last` 變數上。其它的放在 `middle` 陣列中。若呼叫時只傳了一個引數，則 `last` 是 `undefined`，而 `middle` 則一樣是空陣列。

除了拿來當函式宣告外，splats 也可以用來呼叫函式。如同 `Section III` 所示範的，宣告 `my_cargo` 陣列後，在呼叫函式時傳入 `my_cargo...`，就像是你把陣列的元素拆開再傳進去一樣。

> CoffeeScript Splats 的局限  
>* 每個函式只能定義一組 Splats 引數  
>* Splats 引數不能用 `=` 指派預設值(但可以在函式內處理)  
