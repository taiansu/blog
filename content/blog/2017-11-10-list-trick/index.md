---
layout: post
title: "List 操作小技巧"
date: 2017-11-10 19:10
comments: true
tags: [學程式, 函數式編程, Elixir]
image: /assets/post_img/list-trick-compress.jpg
image2: /assets/post_img/list-trick-mobile-compress.jpg
---

最近寫 Elixir 時，有個慣用的 functional 小手法，順手記錄一下。

## 1. 無差別包裝 List
當處理的對象可能是 `nil`， `list`，或是單個元素時，可以直接將它們包裝成單層的 list 進行後續操作。

Elixir 提供了 `List.wrap` 讓你直接將 `nil` 及 單個元素包裝成 list。對於原本就是 list 的對象則直接回傳：

```elixir
# Elixir
List.wrap(nil)    # => []
List.wrap(1)      # => [1]
List.wrap([2, 3]) # => [2, 3]
```

值得一提的是包裝 `nil` 會回傳空的 list，這對稍後要介紹的連續技起了重要的作用。

Ruby 則可以用 `Array()`

```ruby
# Ruby
Array(nil)    # => []
Array(1)      # => [1]
Array([2, 3]) # => [2, 3]
```

在 JavaScript 裡就得要自己拼了，以 `Ramda` 為例：
```js
let wrap = R.compose(R.filter(R.identity), R.unnest, R.of)

wrap(null)    // => []
wrap(1)       // => [1]
wrap([2, 3])  // => [2, 3]
```

這裡用 `R.unnest` 而非
`R.flatten`，是因為它不會把串列全部攤平至只剩一層。這個特性在你想要處理的「元素」本身就是一個陣列時會排上用場。


## 2. 攤開 `map` 的結果。

`flat_map` 可以將 map 的結果攤開到外層串列中。這個看範例會比較好懂：

```elixir
[1, 2, 3]
|> Enum.flat_map(fn x -> [x, x] end)

# => [1, 1, 2, 2, 3, 3]
```

flat_map 是函數式語言/函式庫基本的操作之一，應該都找得到。`Ramda` 裡叫 `R.chain`。

## 3. 連續技：優雅的消失

結合上面兩個函式，先把含有 `nil` 的集合 `wrap` 成一個個的串列，再用 `flat_map` 或 `flatten` 攤開。這個時候就會發現 `nil` 在操作過程中直接消失了，不需要 `filter`，更不用 `if/else` 判斷。例如：

```elixir
class = %{
  teacher: %{name: "John", age: 40},
  assistant: nil,
  students: [%{name: "Amber", age: 20}, %{name: "William", age: 22}]
}

class
|> Map.values
|> Enum.flat_map(&List.wrap/1)

# => [%{age: 20, name: "Amber"}, %{age: 22, name: "William"}, %{age: 40, name: "John"}]
```

實際應用時，通常會直接將上層集合傳到 `flat_map` 裡，並將處理的函式拿出來另外宣告，這樣可以用 pattern matching 對上層結構做更細緻的處理。

Happy hacking!
