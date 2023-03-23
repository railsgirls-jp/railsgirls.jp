---
layout: main_guide
title: Rails Girls インストール・レシピ
permalink: install
---

# Rails Girls インストール・レシピ

<span class="muted">クッキングタイム: 5分 (作業時間) / 15-30分 (待ち時間)</span>

{% include main-guide-intro.html %}

To build apps and other things with Ruby on Rails, we need to setup some software and the developer environment for your computer. Make sure you're familiar with [the tools you'll need for these guides](/tools) before continuing. From there we'll guide you through the steps needed to prepare for the workshop, and while doing so give you a bit of background info on what we're doing.

Don't worry too much about the installation steps and understand everything about them. These are the required steps to get through to get to the real programming part of the workshop.

These setup guides assume no prior knowledge. That's easier said than done. Things that may seem obvious to us might be _abracadabra_ to you. If this is the case, please: let your event organizers know. We can use your feedback to improve these guides!

Please follow the instructions for your Operating System from the list below. If you run into any problems, don't panic. Check the [known errors section](#possible-errors-during-installation) or inform the organizers/coaches at the event and we can solve it together.

- [macOS 用セットアップ](/install/macos)
- [Windows 用セットアップ](/install/windows)
- [Windows 用セットアップ（WSL）](/install/windows-wsl)
- [Linux 用セットアップ](/install/linux)
- Alternative installation methods. Use these if the above guides do not work.
    - [Setup on a Virtual Machine](/install/virtual-machine)
    - [Using the Replit Cloud Service - No Installation Required](/install/replit)
    - [GitHub Codespaces を使う](/install/codespaces)
    - [AWS Cloud9 を使う](/install/cloud9)

*コーチの方へ*:
インストール中に問題が発生した場合、この [Troubleshooting](https://github.com/railsgirls-jp/railsgirls-jp.github.io/wiki/Troubleshooting)  のページを参考にして下さい。

## [出るかもしれないエラー](possible-errors-during-installation)

### Gem::RemoteFetcher エラー

`rails new railsgirls` や `gem update rails` を実行すると下記のようなエラーが出るかもしれません:

{% highlight sh %}
Gem::RemoteFetcher::FetchError: SSL_connect returned=1 errno=0 state=SSLv3 read
server certificate B: certificate verify failed (https://rubygems.org/gems/i18n-0.6.11.gem)
{% endhighlight %}

これは Rubygems のバージョンが古く、更新が必要であることを意味していますので、まず Rubygems のバージョンをチェックしましょう。

{% highlight sh %}
gem -v
{% endhighlight %}

もし `3.0.3` より古いバージョンだったら、以下の手順で更新する必要があります:

[ruby-gems-update gem](https://rubygems.org/downloads/rubygems-update-3.0.3.gem) をダウンロードし、それを `c:\rubygems-update-3.0.3.gem` として保存して実行してください:

{% highlight sh %}
gem install --local c:\\rubygems-update-3.0.3.gem
update_rubygems --no-document
gem uninstall rubygems-update -x
{% endhighlight %}

Rubygems のバージョンをチェックしましょう。

{% highlight sh %}
gem -v
{% endhighlight %}

バージョンが `3.0.3` より大きいことを確かめてください。
もし失敗していたらやり直してください。

続いて、bundler gem も更新が必要となる場合があります。まず `bundle` のバージョンをチェックしましょう。

{% highlight sh %}
bundle -v
{% endhighlight %}

もし `1.17.2` より古いバージョンだったら、以下の手順で更新する必要があります:

{% highlight sh %}
gem update bundler --no-document
{% endhighlight %}

`bundle` のバージョンをチェックしましょう。

{% highlight sh %}
bundle -v
{% endhighlight %}

バージョンが `1.17.2` より大きいことを確かめてください。
もし失敗していたらやり直してください。

### During bundle install

The `Gem::RemoteFetcher::FetchError: SSL_connect` can also occur during the `bundle install` stage when creating a new rails app.

The error will make mention of [this RailsApps guide](https://railsapps.github.io/openssl-certificate-verify-failed.html). What is relevant for Windows users at this point is [this GitHub gist](https://gist.github.com/867550). The described manual way has proven to be successful to solve the `bundle install` error.

### 'x64_mingw' is not a valid platform エラー

`rails server` を実行すると以下のようなエラーが出ることがあります:

{% highlight sh %}
'x64_mingw' is not a valid platform
{% endhighlight %}

もし RailsInstaller を実行した後でこのエラーが出たときには、`Gemfile` というファイルをちょっとだけ編集する必要があります:

そのファイルの最後の方に下記のような行があるはずです。
もしなければ付け加えましょう:

{% highlight sh %}
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
{% endhighlight %}

このように `:x64_mingw` と書かれていたら、 `:x64_mingw` の部分を削除してください。
つまり上の行を下記のように変更するわけです:

{% highlight sh %}
gem 'tzinfo-data', platforms: [:mingw, :mswin]
{% endhighlight %}

ファイルを編集し終わったら、再びコマンドプロンプトで `bundle update` を実行してみてください。

### The sqlite3 gem failed to install

When running `rails new myapp` the `sqlite3` gem may fail to install. When this happens, first close the Windows Command Prompt app. Then re-open the Windows Command Prompt.

Next, install the `sqlite3` gem separately from the `rails` gem by running the following command:

{% highlight sh %}
gem install sqlite3
{% endhighlight %}

If this succeeds, remove the `myapp` directory the rails installer created and return to the installation instructions, to run `rails new myapp` again.
