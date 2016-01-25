---
title: Let's talk about Vim
# date: TBD When publishing
tags: Programming, tools
---

**Real Programmer [from [xkcd](http://xkcd.com/378/)]**

<a href="http://xkcd.com/378/"><img src="https://lh3.googleusercontent.com/-Nl_bwOr6e14/VASRbJ_XNWI/AAAAAAAAAgQ/KbvNCeDy5O0/w1480-h812-no/real_programmers_zhtw.jpg"></a>

我是這樣看的，你就姑且聽之吧。



我自己是被 [vgod](http://blog.vgod.tw/2009/12/08/vim-cheat-sheet-for-programmers/?variant=zh-tw) 洗來學的。先 clone 了他的 vimrc，在 Windows 上裝了 gVim 也是玩的。一直到要看了 gary b 的 destroy all software 的幾個 vim 教學之後，才慢慢抓到 Vim 的醍醐味。


We started a first prototype with Backbone and as the project got bigger, expanded to Chaplin with d3.js. Some time ago, we started to use React and liked it so much that we ended up with a pure Flux-React implementation.

The reasons to use React were primarily the performance gains and the simplifying "render everything" approach. Interestingly, after strictly implementing the Flux architecture, our application was a lot easier to understand than the Backbone / Chaplin versions.

This seems strange, since you could argue that React is only a "View" solution, and Flux doesn't really add anything new, besides slapping on a new name to a couple of known concepts.

So what gives...?

Well, Backbone an Chaplin are a fine toolset, however, they give you a lot of freedom. This is in my opinion desirable. However, with freedom comes responsibility. And it turns out that its quite easy to be unresponsible, if nobody tells you how things should be done (something that Flux does).
