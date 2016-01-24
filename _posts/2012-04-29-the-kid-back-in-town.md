---
layout: post
title: "The kid (back) in town."
date: 2012-04-29 03:35
comments: true
tags: Programming
---

Hello, world of blog. Again.

I know, it's been a pretty while.

{% highlight ruby%}
def char_to_block(sentence_ary, &block)
  sentence_ary.each do |sentence|
    sentence.split(//).each do |char|
     block.call(char)
    end
    puts ""
  end
end

if __FILE__ == $0
  sentence = [
    "Hello word, again. Here's the kid back in town.",
    "I know, it's been a pretty while.", 
    "I know."
  ]
  char_to_block(sentence) do |char|
    sleep(0.1)
    print char
  end
end
{% endhighlight %}
