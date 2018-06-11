---
layout: post
title: "Let's talk about meta and meta-programming"
date: 2013-06-28 17:49
comments: true
tags: [學程式, "meta programming", Ruby]
---

>「我的語言的界限，就是我的世界的界限。」  -- Ludwig Wittgenstein

最近在讀 meta-programming 的東西，翻到一些網路上的爭論。想到幾年前，一個通曉多國語言的日本朋友問我：「meta-programming 裡的 meta 這個字在台灣怎麼翻?」，那時我是麼回的：「有時候翻中介，有時候翻後設，有時就乾脆不翻了。」

我認為 meta 的翻譯，就是爭論的來源。

無論是把 "meta-programming" 翻成「中介編程」，還是把 "meta-fiction" 翻成「後設小說」，在字面上都只是讓我更困惑而己。meta 這個字其實很有趣，基本上就是「關於 X 的 X」。舉幾個例子:

* 卡爾維諾的「[如果在冬夜，一個旅人](http://www.books.com.tw/exep/prod/booksfile.php?item=0010089497)」，是本講述一些人在讀小說的過程的小說，這叫 meta-fiction。
* 「我們手邊的使用者資料正確性有多高」這個數字，本身也是一個資料。所謂 meta-data，就是是關於資料的資料(data about data)。

所以你現在一眼看到「[六個尋找作者的劇中人](http://zh.wikipedia.org/wiki/%E8%B7%AF%E4%BC%8A%E5%90%89%C2%B7%E7%9A%AE%E5%85%B0%E5%BE%B7%E5%A8%84)」這個劇本，還有「[Design of design](http://www.books.com.tw/exep/prod/booksfile.php?item=0010518492)」，就知道它們一付 meta 樣。

---

回頭來看 meta-programming ，幫我們產生/修改程式的程式只是 meta-programming 的其中一部份而己。若用「關於程式的程式」來理解，「將程式碼本身當做資料在操作的程式」才是 meta-programming 的全貌。來個最近學到的超無用程式範例：

{% highlight ruby %}
class Suprise < (rand < 0.5 ? Hash : Array)
end

sup = Surprise.new
sup[0] = 'wow!' 
p sup #可能是陣列 ["wow!"]，也可能是Hash { 0 => "wow!" }
{% endhighlight %}

第一行的後半段，我們將 Hash 或是 Array 這兩個類別當做資料在操作，`Surprise`各有 50% 的機會繼承 `Hash` 或是 `Array`。我認為這是不產生/修改程式碼的 meta-programming 好範例。另外提一下，如果你在 production code 裡用了這個技巧，千萬不要說是我教你的。

看一下 JavaScript 這個對 meta-programming 非常友善的語言，由於物件跟 Hash 是同一種東西，因此我們把使用 `["string"]` 的形式動態的從物件中調值視為理所當然。在其它的語言中，這件事並非總是這麼簡單。

Ruby 還可以輕鬆的用 `send()` 解決:

{% highlight ruby %}
obj.send(:method_name)
{% endhighlight %}

在 Java 裡就得大費周章的使用 [reflaction](http://java.sun.com/docs/books/tutorial/reflect/index.html):

{% highlight java %}
MyClass.class.getMethod("methodName").invoke(someArgs)
{% endhighlight %}

再來看看 JavaScript 頗受壞評的 `eval`:

{% highlight js %}
eval("function magic(){ alert('rabbit!'); }");
magic();
{% endhighlight %}

所以當資料與程式碼的界限開始模糊的時候，你知道你已經跨進 meta-programming 的界限裡了。你也該知道，這一段程式碼要是出錯了，在 debug 時可能沒那麼容易。

---

那時我回問了我朋友:「那你覺得有什麼比較好的翻法嗎?」朋友說：「我覺得翻成"元編程"跟"元資料"蠻不錯的。」
想了想，我也這麼覺得。
