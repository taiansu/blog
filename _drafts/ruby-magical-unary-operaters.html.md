---
title: 'Ruby magical unary operaters: * and &'
# date: TBD When publishing
tags: Ruby, Programming
---

之前跟幾個朋友聊到 Ruby 裡 block、lambda 的用法。想想來寫點筆記。

### n 元運算子

在 `3 + 4` 這段程式碼中，`+` 這個運算子 (operator) 需要兩個運算元 (operand)，如本例中的 3 跟 4。因此我們把這種需要兩個運算元的運算子稱為_二元運算子_。

其它的運算子包括多種程式語言都有實作的_三元運算子_ `?:`。

``` ruby
like_this_food = if tasty
                   'yes'
                 else
                   'no'
                 end
```

上面這段運算式可以改寫成底下這一行。

``` ruby
like_this_food = tasty ? 'yes' : 'no'
```
