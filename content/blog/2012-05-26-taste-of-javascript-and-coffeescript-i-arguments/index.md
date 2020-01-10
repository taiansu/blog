---
title: "JavaScript vs CoffeeScript 1: arguments"
date: 2012-05-26 16:51
published: true
comments: true
tags: [學程式, CoffeeScript]
---

> Update: 嗯… 當 2018 ES6 普及後， coffeescript 變成要花費心思去移掉的東西了…

---

當 JavaScript 的函式宣告時，其括號中定義的參數並不是限制，而是方便存取引數物件的變數名稱捷徑。在呼叫時傳入但沒有宣告的引數， 我們可以用 `arguments[i]` 來操作該參數。

> 無論一個 JavaScript 的函式如何宣告，呼叫該函式時，都可以傳入任意數量的引數。


如同底下的範例，我們先宣告一個有兩個參數的函式 `f`，接著依序用 1 到 3 個引數來呼叫這個函式。

```js
var f = function(a, b){
    var args = Array.prototype.slice.call(arguments);
    console.log("arguments: " +  args.join(","));

    for(var i = 0; i < arguments.length; i++){
        console.log(i.toString() + ": " + arguments[i]);
    }
}

f("ruby");
//"ruby"
//"0: ruby"
f("ruby", "coffeescript");
/*
"ruby","coffeescript"
"0: ruby"
"1: coffeescript"
*/
f("ruby", "coffeescript", "lisp");
/*
"ruby","coffeescript", "lisp"
"0: ruby"
"1: coffeescript"
"2: lisp"
*/
```

雖然 `arguments` 的行為看起來很像陣列，但其實它是一個特殊的物件。缺乏了許多陣列會有的行為，物件型別也不屬於 Array。如果要像陣列一樣使用 `join()` 來組裝字串，必需要像上例第二行一樣，用 `Array.prototype.splice.call(arguments)` 先轉成一個值陣列。

> 在 CoffeeScript 中，則習慣用 Splats 來宣告一個可變的參數陣列。

在 CoffeeScript 裡，除了直接操作 `arguments` 之外，更偏好使用類似 Ruby 的 splats，宣告一個可取得任意數量引數值的變數，用陣列的方式來進行處理。

```coffeescript
f = (a, b, c...) ->
  console.log "arguments: #{a}, #{b}, #{c}".replace(/, $/,"")
  for arg, i in arguments
    console.log "#{i}: #{arg}"

f "ruby"
#"ruby"
#"0: ruby"
f "ruby", "coffeescript"
###
"ruby","coffeescript"
"0: ruby"
"1: coffeescript"
###
f "ruby", "coffeescript", "lisp"
###
"ruby","coffeescript", "lisp"
"0: ruby"
"1: coffeescript"
"2: lisp"
###
```

在第一行宣告 `c...` 參數之後，呼叫此函式時，多餘的引數會被存成一個真正的陣列，在函式中就可以用 `c` 操作此陣列。由於 CoffeeScript 內建了許多方便的陣列操作方式，像是第三行中的 `for...in` ，同時取得陣列索引及值。若是引數少於三個，則 `c` 會是一個空陣列。

編譯出來的 JavaScript 長成這個樣子：

```js
var f,
  __slice = [].slice;

f = function() {
  var a, arg, b, c, i, _i, _len, _results;
  a = arguments[0],
  b = arguments[1],
  c = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
  console.log(("arguments: " + a + ", " + b + ", " + c).replace(/, $/, ""));
  _results = [];
  for (i = _i = 0, _len = arguments.length; _i < _len; i = ++_i) {
    arg = arguments[i];
    _results.push(console.log("" + i + ": " + arg));
  }
  return _results;
};

f("ruby");
f("ruby", "coffeescript");
f("ruby", "coffeescript", "lisp");
```

在第 6 行中，可以看到 CoffeeScript 處理 splats 陣列的方式。第 9 行的迴圈宣告中，CoffeeScript 用 `i` 及 `__i` 宣告了索引值及迴圈次數兩個異名同值變數。而第 13 行的部份顯示 CoffeeScript 的總是會以最後一個運算式的結果做為函式回傳值，若是迴圈運算，則會回傳一個陣列。
