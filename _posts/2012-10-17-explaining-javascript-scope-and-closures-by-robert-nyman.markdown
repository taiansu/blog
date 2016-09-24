---
layout: post
title: "Robert Nyman: 解釋 JavaScript 的 scope 及 closures"
date: 2012-10-17 23:23
comments: true
tags: [programming, JavaScript]
---

當發現我沒辦法向別人清楚的解釋一件事的時候，就會有一種「其實我自己也沒有弄的非常清楚」的認知。前陣子想解釋 JavaScript 裡的 closures 以慘敗收場。網路上翻到一篇文章看了之後有點「啊原來是這樣」。細讀之餘就順手翻譯一下，也許有人能用得上。

Closure 中文常翻成'閉包',不過這種看了也不會更懂的專有名詞，就留著不翻了…而 Scope 是變數的'作用域'或是'有效範圍'，依上下文需要翻或不翻。Rebort Nyman 在 2008 寫了原文，請往 [Original Post](http://robertnyman.com/2008/10/09/explaining-javascript-scope-and-closures/) 找。

-----


#背景
有許多的文章試著解釋 scope 及 closures ，但基本上我得說他們大多數都沒辦法解釋的非常清楚。此外其中一部份的作者預設每個人都開發過15種以上的其它語言，但依我的經驗來說，寫 JavaScript 的人通常具備的是 HTML 及 CSS 的背景，而非 C 或是 Java。(譯注: 在 Node.js 及 Ajax 興起的今天，也許這情況有點改變。)

因此本文謙遜的目標，是想讓大家都能領會到 scope 跟 closure 是什麼，它們如何運作的，以及該如何妥善的運用它們。在閱讀本文之前，你得先有一些變數及函式的基礎知識。


##Scope
Scope 代表變數及函式能夠被存取的範圍，以及它們在什麼樣的文本中被執行。一般來說，變數及函式可以定義在全域範圍或是區域範圍中。變數有所謂的'函式作用域'，而函式也有像是變數一樣的作用域。


###Global Scope (全域範圍)
當某個東西是全域的，代表它在你程式碼的任何地方都可以被存取，看一下以下的範例:

如果在瀏覽器執行底下的程式碼，`monkey` 及 `greetVisitor` 這兩個變數的存取範圍會是 `window`。因此所有跑在同一個頁面下的程式都能存取這兩個變數。(譯注: 我把程式碼放到 JsFiddle 中，並依需要調整及註解，你可以按下 Result 來看結果。)


<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/DRvkJ/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

###Local Scope (區域範圍)
與全域範圍相反，local scope 是只宣告在程式碼的某一個區域中，也只能在這個區域中存取的東西。例如函式內部就是這些區域的一種。舉例來說：

<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/QBZVc/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

如果你看一下上面的代碼，`saying` 這個變數只能在 `talkDirty` 函式內部存取。在函式的外面，它根本就沒有被定義。特別要注意的是，如果你在第二行沒有用關鍵字 `var` 來定義 `saying`，那它會自動變成全域變數。

這也代表如果你有巢狀的函式時，內層的函式能夠讀到在外部函式裡所定義的變數及函式:

<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/8PjVS/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


如你所見，內層函式 `capitalizeName` 不需要傳入任何參數，但是它就能夠存取定義在外部函式 `saveName` 中的 `firstName` 這個參數。再用一個例子讓我們把事情弄的更清楚一點：

<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/qYwfm/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


如你所見，兩個內層函式都可以存取外部函式的 `siblings` 陣列，而兩個同級的內層函式也可以彼此存取(如本例中 `joinSiblingNames` 去存取 `siblingCount`)。然而定義在 `siblingCount` 函式中的 `siblingsLength` 變數，只能在該函式內部使用，這就是它的變數範圍。

---

##Closures
現在你應該比較了解什麼是變數範圍了，我們把 closures 加進來看。Closures 是一種將變數設為特定內容來運作的表達式，通常是函式。說的簡單一點，當內層函式存取了外部函式的變數，就會產生 closure(\* 請看 <a href="#note">note</a> )。舉例來說：

<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/MMLaA/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

哇，*哇*!剛剛發生什麼事了? 我們一步步拆來看:


1. 當呼叫 add 函式時，它會回傳一個函式。
2. 那個回傳的函式封閉它的內文，並記憶封閉時`x`參數的值。(也就是上述程式碼中的 5)
3. 我們把回傳的函式指定到 add5 變數上，它會一直記得它建構當時 x 的值。
4. 而這個 add5 變數代表一個會*永遠*把傳入參數加 5 的函式。
5. 這就表示當我們呼叫 add5 時，傳入參數 3，它就會把 5 跟 3 相加，然後回傳 8。


因此在 JavaScript 的世界中，這個 add5 函式實際上看起來像這樣：


{% highlight js %}
function add5(y){
  return 5 + y;
}
{% endhighlight %}
<hr id="note" />

###Note

 在[一段討論](https://www.facebook.com/groups/programmerMagazine/permalink/863376383679079)之後，我想更正成：

Closure 會在底下兩個條件為真時產生：

 1. 內部的函式存取了外部函式的變數。
 2. 內部函式能被外界直接調用。

---

##惡名昭彰的迴圈難題
你有沒有遇過試著用某些迴圈，把 i 指定成變數值，卻發現全部都回傳最後一個值的情況?

###不正確的參照
我們來看看這個壞掉的範例，它會建立五個元素，把 `i` 設成顯示文字。再為每個元素綁定一個 onclick 事件，按下去後會 alert 這個元素的 `i` 值。也就是說會 alert 顯示文字的值。然後再把元素加到 document body 裡:

<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/uf4ey/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

每個元素都顯示了正常的文字，也就是 "Link 0"，"Link 1" 等等。但不管我們按下哪一個，都會 alert 數字 "5"。真要命，*為什麼會這樣？* 原因是這個 `i` 的值在每一次迴圈處理都會加 1，而既然 onclick 事件還沒被觸發，只是綁定到元素的事件上，i 的值會一直累加上去。（譯註：可以按 Result）


因此這段迴圈一直循環到 `i` 變成 5，`addLinks` 函式結束。然後呢，不管哪一個 onclick 事件被觸發，它都會拿到 `i` 變數最後的那個值。

###正確的參照
而你應該做的，是建立一個 closure，這樣當你在把 `i` 綁定到事件上時，它會取得當下的那個值。像這樣：

<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/NRQDr/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



用這段程式時，如果你按下第一個元素，它會 alert`0`，第二個元素會 alert`1`，依此類推，像是你看到上一段程式碼時期望的運作方式。這裡的解法是綁定 onclick 事件的那個內層函式創造了一個參照 `num` 參數,也就是 `i` 當時的值的 closure。


而那個函式會把該數值閉鎖，安全的藏起來。等到觸發 `onclick` 事件時，能夠回傳對應的正確數值。

---

##Self-invoking functions
Self-invoking functions 是一種立刻執行，並建構自己的 closure 的函式。看一下這個範例：

<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/ntCmL/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

好嘛，所以那個`dog`變數只能在內文裡存取。有什麼了不起啊，就是個藏起來的狗…但是朋友，這就是它真正有趣的地方。這解決了我們上面迴圈的狀況，而且這也是[Yahoo JavaScript Module Pattern](http://yuiblog.com/blog/2007/06/12/module-pattern/) 的基礎。

---

##Yahoo JavaScript Module Pattern
這個 pattern 基本上是用一個 self-invoking function 來建立一個 closure，從而讓 JavaScript 物件能夠有公開及私有的函數跟屬性。像這個簡單的例子:

<iframe width="100%" height="300" src="http://jsfiddle.net/taiansu/X43Bk/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

這樣作的美好之處，在於從此你可以自己決定物件上的哪些東西要公開(以及可以被複寫)，而那些是私有的，不能存取而且不能被更改。上面的 `name` 變數在函式外部看不到，但是能夠用 getName 函式取值及用 setName 函式設值。因為這兩個函式是建立了 closure 並參照了 `name` 變數。

---

##結論
我誠摯的希望在看完這篇之後，無論是新手或有經驗的程序員，都能夠清楚的領會 scope 及 closures 在 JavaScript 實際上是怎麼運作的。歡迎各種問題及回應，而如果你的建議夠重要，我會把它加到我的文章裡。


Happy coding!

(原文完)

---

延伸閱讀：

* Mozilla developer network 上的 [JavaScript Guide > Closures](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Closures).

* 聽說這本 [JavaScript Allonge](https://leanpub.com/javascript-allonge) (英文)的 Closure 部份講的很好。我買了但是還沒看。
