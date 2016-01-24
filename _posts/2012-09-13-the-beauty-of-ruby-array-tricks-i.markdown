---
layout: post
title: "The beauty of Ruby: Array Tricks Part I"
date: 2012-09-13 00:36
comments: true
tags: Programming, Ruby
---

首先呢, 有兩個陣列...

{% highlight ruby %}
ary1 = ["ruby", "coffeescript", "haskell", "lisp"]
ary2 = ["ruby", "python", "javascript", "lisp"]
{% endhighlight %}

大家都有, 沒什麼好說的

{% highlight ruby %}
ary1.concat(ary2)
 => ["ruby", "coffeescript", "haskell", "lisp",
      "ruby", "python", "javascript", "lisp"]

ary1 + ary2
 => ["ruby", "coffeescript", "haskell", "lisp",
     "ruby", "python", "javascript", "lisp"]
{% endhighlight %}
差異在於 `.concat` 會影響 ary1, `+` 不會.

---
*連續技:*

{% highlight ruby %}
ary1 << "clojure" << "perl" << "scala"
  => ["ruby", "coffeescript", "haskell", "lisp",
       "clojure", "perl", "scala"]
{% endhighlight %}
原理是因為`<<`會回傳加入新元素後的陣列.

---
有趣的來了

* 聯集(Union)

{% highlight ruby %}
ary1 | ary2
 => ["ruby", "coffeescript", "haskell", "lisp",
     "python", "javascript"]
{% endhighlight %}

* 交集(Intersection)

{% highlight ruby %}
ary1 & ary2
 => ["ruby", "lisp"]
{% endhighlight %}

* 差集(Difference)

{% highlight ruby %}
ary1 - ary2
 => ["coffeescript", "haskell"]

ary2 - ary1
 => ["python", "javascript"]
{% endhighlight %}
