---
layout: post
title: Elixir 的 & 運算子
date: 2017-08-23 00:00
comments: true
tags: [programming, Elixir]
image: /assets/post_img/elixir-ampersand/snow.jpg
image2: /assets/post_img/elixir-ampersand/snow-mobile.jpg
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
Enum.map([:a, :b, :c], &Atom.to_string/1)

#=> ["a", "b", "c"]
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

這種情況就是 `&` 運算子派上用場的另一個地方，順帶一提，也是最多人感到困惑的用法。

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

上例中，`&1` 是匿名函式接收到的第一個參數，可以推導出多個參數也是可以的。
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
first_elem = &elem(&1, 1)
first_elem.({1, 2, 3})
#=> 1
```

大概就是這樣了。Happy hacking!

---

Photo by <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@aaronburden?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Aaron Burden"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title></title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">Aaron Burden</span></a>
