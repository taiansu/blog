---
layout: post
title: Elixir 的 & 運算子
date: 2017-08-23 00:00
comments: true
tags: [學程式, 函數式編程, Elixir]
image: /assets/post\_img/elixir-ampersand-compress.jpg
image2: /assets/post\_img/elixir-ampersand-mobile-compress.jpg
---

在跟朋友討論 Elixir 的過程中，發現常會需要解釋 `&` 運算子的用法，決定寫篇完整的來科普一下。

因為特殊符號很難 google 到正確的結果，`&` 在官方文件中的稱呼是 capture operator。它最主要的作用，就是補獲或是生成匿名函式。

## Eta conversion

在 JavaScript 中，具名函式也是一級公民，可以直接傳遞。所以遇到在 lambda 中將接收到的參數原封不動傳給具名函式，並回傳其結果的情況下，可以直接傳遞具名函式。這在數學上叫 Eta conversion。講起來很拗口，看範例就很直覺：

```js
[-1, -2, 3].map(i => Math.abs(i))

// 等同於

[-1, -2, 3].map(Math.abs)
```

但在 Elixir 中，具名函式不加括號視同零參數的呼叫，因此我們需要有辦法將具名函式轉換成 lambda。這就是 `&` 的第一個用法。在轉換其它 module 的函式 (正式名稱叫 _remote function_) 時，語法是 `&Module.function/arity`，記得斜線後要帶上參數的個數。

```elixir
Enum.map([:a, :b, :c], fn a -> Atom.to_string(a) end)

# 等同於

Enum.map([:a, :b, :c], &Atom.to_string/1)

#=> ["a", "b", "c"]

# 不能這樣寫
Enum.map([:a, :b, :c], Atom.to_string)

# 因為上一句會被解析成這樣：
Enum.map([:a, :b, :c], Atom.to_string())
```

當然轉換 local fucntion 或 imported function 也沒問題，不加 Module 名稱就可以。

```elixir
def double(i), do: i * 2

Enum.map([1, 2, 3], &double/1)

#=> [2, 4, 6]
```

順帶一提，用 `&` 補獲/生成的函式不一定要寫在高階函式中，也可以另外指派給變數。由於被轉換成 lambda 了，所以呼叫時要用 `.()`。

```elixir
f = &Kernel.is_atom/1

f.(:atom) #=> true
```

## 匿名函式

Elixir/Erlang 裡，匿名函式的宣告比較冗長。因此遇到函式本體很短的情況下會覺得麻煩。

```elixir
Enum.map([1, 2, 3], fn i -> i * 2 end)
```

這種情況就是 `&` 運算子派上用場的另一個地方，這也是最多人感到困惑的用法。

```elixir
Enum.map([1, 2, 3], &(&1 * 2))
#=> [2, 4, 6]
```

換句話說，`fn i -> i * 2 end` 跟 `&(&1 * 2)` 是一樣的意思。

## 生成 List 或 Tuple
若用 `[]` 或 `{}` 代替圓括號，呼叫後的結果會分別是 `List` 及 `Tuple`

```elixir
l = &[&1, &2]
l.(1, 2)
#=> [1, 2]

t = &{&1, &2}
t.(1, 2)
#=> {1, 2}
```

## 更多參數及使用判準

`&1` 是匿名函式接收到的第一個參數，多個參數也是可以的，就是 `&2`、`&3` 遞增下去。
```elixir
fn = &(&1 + &2 + &3)

fn.(1, 2, 3) #=> 6
```

不過濫用 `&()` 語法的話，程式很容易就會變得難讀。個人的判準是內部超過 10 個字元，或是有三個以上的運算子，就寧願用 `fn -> end` 來宣告了。

那麼要做出 Haskell 的 [identity](https://www.haskell.org/hoogle/?hoogle=id) 就簡單了： `&(&1)`。
```elixir
Enum.group_by(["a", "b", "c", "a", "b"], &(&1))

# => %{"a" => ["a", "a"], "b" => ["b", "b"], "c" => ["c"]}
```

## Partial application

綜合上面兩個語法，有種文件上沒寫清楚，很少人提，卻相當有用的用法。送了 PR 但還沒併進去。用 `&1` 及 `&Module.function` 作出 partially applied 的 remote function：

```elixir
take_five = &Enum.take(&1, 5)
take_five.(1..100)

# => [1, 2, 3, 4, 5]
```

local function 也是一樣的:
```elixir
first_elem = &elem(&1, 0)
first_elem.({1, 2, 3})
#=> 1
```

大概就是這樣了。Happy hacking!
