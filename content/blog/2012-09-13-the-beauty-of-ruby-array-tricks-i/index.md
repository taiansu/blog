---
title: "The beauty of Ruby: Array Tricks"
date: 2012-09-13 00:36
published: true
comments: true
tags: [學程式, Ruby]
---

首先呢, 有兩個陣列...

```ruby
ary1 = ["ruby", "coffeescript", "haskell", "lisp"]
ary2 = ["ruby", "python", "javascript", "lisp"]
```

大家都有, 沒什麼好說的

```ruby
ary1.concat(ary2)
 => ["ruby", "coffeescript", "haskell", "lisp",
      "ruby", "python", "javascript", "lisp"]

ary1 + ary2
 => ["ruby", "coffeescript", "haskell", "lisp",
     "ruby", "python", "javascript", "lisp"]
```
差異在於 `.concat` 會影響 ary1, `+` 不會.

---
*連續技:*

```ruby
ary1 << "clojure" << "perl" << "scala"
  => ["ruby", "coffeescript", "haskell", "lisp",
       "clojure", "perl", "scala"]
```

原理是因為`<<`會回傳加入新元素後的陣列.

---
有趣的來了

* 聯集(Union)

```ruby
ary1 | ary2
 => ["ruby", "coffeescript", "haskell", "lisp",
     "python", "javascript"]
 ```

* 交集(Intersection)

```ruby
ary1 & ary2
 => ["ruby", "lisp"]
{% endhighlight %}

* 差集(Difference)

```ruby
ary1 - ary2
 => ["coffeescript", "haskell"]

ary2 - ary1
 => ["python", "javascript"]
 ```
