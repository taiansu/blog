---
title: "RubyMotion: iOS app in Ruby"
date: 2012-05-10 01:12
published: true
comments: true
tags: [學程式, Ruby]
---

故事是這樣的，2007 年的某個時刻，Apple 公司的 Laurent Sansonetti 公佈了 MacRuby，一個 Object-C 執行期的開源動態解析器。能夠用 Ruby 直接操作 Cocoa API。稍稍的降低了開發 OS X 桌面程式的痛苦程度。當然 Ruby 社群們殷殷期盼的,就是能夠在 iOS 上如法泡製。


五年後的現在，Laurent 剛剛從工作了七年的 Apple 愉快的(?)離職了幾個月,發表了橫空出世的新作品: <a href="http://www.rubymotion.com/">RubyMotion</a>。

除了能將 Ruby 語言編譯成 iOS native byte code 外,不依賴 Xcode IDE，改用 Ruby 界習慣的 Rake 模式建立及開發。令人更加驚豔的是能在終端機中直接與模擬器互動，即時修改 => 測試: 

<iframe width="560" height="315" src="http://www.youtube.com/embed/rejYKzLglSE" frameborder="0" allowfullscreen></iframe>

Pragmatic Studio 更破天荒的錄製了<a href="http://pragmaticstudio.com/screencasts/rubymotion"> 50 分鐘的基礎教學</a>。這影片就是本篇的重點了。

目前擁有的優勢:

>1. Ruby，Ruby，Ruby。
1. 可以用自己習慣的editor，習慣的rake，習慣的SourceControl。
1. 提供了連Xcode都沒有的即時修改模式。
1. Ruby社群等很久了…

可能會阻止你的點:

>1. 商業軟體: USD<strike>199</strike>149,即使早鳥價也不太輕鬆。
1. 沒有 OpenSource。
1. 你還是得學會 Cocoa...
1. 把 View 寫在 controller 裡，沒有拖拉界面的 GUI (聽說有人送 Patch 了…)
1. 市面上有經營一段時間的 Titanium(JavaScript)，及即將發佈的 MobiRuby 兩個免費解決方案。

<del>有閒情逸致的話，再來比較 Titanium 及 RubyMotion的優劣囉。</del>
