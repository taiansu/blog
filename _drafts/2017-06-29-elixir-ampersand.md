---
layout: post
title: Elixir 的 Pattern Matching (I)
date: 2017-03-22 00:00
comments: true
tags: [programming, Elixir]
image:
image2:
---



## 1. 等號 `=` 的意義

而 Pattern matching 的基本概念，就是等號 `=` 在程式中並非做為"指派變數"來使用。Functional
programming 的 "functional" 應該作為 "Mathmatical function" 理解。所以用簡單的數學公式來看

$$
f(0) = 1
$$

並非將 $f(0)$ 指派為 $1$ ，而是當函式 $f(x) = y$ 的 $x$ 為 $0$ 時，會得出 $1$
的值。等號的兩邊是，well，**相等**的。

