---
title: "Setup Rails on Mountain Lion"
date: 2012-10-04 10:37
published: true
comments: true
tags: [programming, "env setup"]
---

A humble (\*caught) guide for helping setup Rails environment on Mountain Lion with rbenv.

## Install Xcode and it's friends...
First we need Xcode's Command Line Tools for install copies of the core command line tools and system headers into system folders.

If you don't need Xcode, you can download "Command Line Tools for Mountain Lion" from [Apple developer site](https://developer.apple.com/downloads/index.action) and install that, it's free but need an registed apple developer account. You can save about 4GB diskspace for doing so. Otherwise follow the steps below:

1. Download and install Xcode from App Store first.

1. Open Xcode, press <kbd>Xcode</kbd> -> <kbd>preferences</kbd> on the menu bar.

1. Switch to <kbd>Downloads</kbd> -> <kbd>Components</kbd> section,

1. <kbd>install</kbd> "Command Line Tools".

---

## Install Homebrew

We choose **Homebrew** as our package manager, just like *apt* or *yum* for linux. After this step, you can use `brew install something` to install lots of useful tools, e.g.,  MySql, imagemagick and Node.js. Then we use Homebrew to install *apple-gcc* for compile ruby from the source, *Git* for up-to-date version control.

Open Terminal, paste this command beneath than <kbd>Enter</kbd>

```bash
ruby -e "$(curl -fsSkL raw.github.com/mxcl/homebrew/go)"
{% endhighlight %}

---

## Essential components

* Execute each command followed:

```bash
brew install git
{% endhighlight %}

* Optional

```bash
brew install mysql imagemagick
{% endhighlight %}

---

## rbenv with Shell configs

Then we use *rbenv* and *ruby-build* for install multiple ruby version. But if you're kind of RVM's guy, just skip this section and go for it.

```bash
brew install rbenv ruby-build
{% endhighlight %}

After install the rbenv, we need to adjust our shell config to execute rbenv while system boot up.

* In Terminal, execute each commands followed. (**Note**: if you're using *ZSH*, execute the ZSH part instead.)

BASH:

```bash
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile && source ~/.bash_profile
```

ZSH:

```bash
echo 'if which rbenv > /dev/null; then eval "$(rbenv init - zsh)"; fi' >> ~/.zshenv; source ~/.zshenv
```

---

## Install Ruby
Whoa, the goal is just few steps far. Let's install all the ruby versions we need. Aren't we struggle all the way, just for that?  Cross the fingers, guys.

* In Terminal, execute each commands followed.

```bash
rbenv install 2.0.0-p247; rbenv rehash; rbenv global 2.0.0-p247
```

* Optional: If you need Ruby Enterprise Edition, execute the commands followed.

**Replace `;` wich `&&` in bash**
## Install Apple GCC
* In Terminal, execute each commands followed.

```bash
sudo chown -R `whoami` /usr/local && brew update && brew tap homebrew/dupes && brew install apple-gcc42
```

---

## If you need Ruby Enterprise Edition

* install [XQuartz](http://xquartz.macosforge.org/landing/) first.

```bash
CPPFLAGS=-I/opt/X11/include \
CC=/usr/local/bin/gcc-4.2 \
rbenv install ree-1.8.7-2012.02; rbenv rehash
```

### Install important gems
Finally, it's done! Buy yourself a drink, you worth it! At the end let's install some gems and prepare for the party on Rails!

* In Terminal, execute each commands followed.

```bash
gem install bundler rails
```
