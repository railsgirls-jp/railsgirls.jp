---
layout: main_guide
title: Rails Girls インストール・レシピ
permalink: install
---

# Rails Girls インストール・レシピ

<span class="muted">クッキングタイム: 5分 (作業時間) / 15-30分 (待ち時間)</span>

{% include main-guide-intro.html %}

Ruby on Rails でアプリや他のものを作るために、いくつかソフトウェアや開発環境をあなたのコンピュータにセットアップする必要があります。先に進む前に、[このガイドで必要になるツール](/tools) についてよく理解しておいてください。それを元にワークショップの準備に必要な手順をガイドします。この手順の中でやっていることの背景についても少し説明します。

インストールの手順についてはあまり気せずに理解してください。これらは、ワークショップで重要なプログラミングする部分にたどり着くための手段なのですから。

これらのセットアップガイドは予備知識がないことを前提にしています。でもそれは「言うは易く行うは難し」です。私たちにとっては明らかに思えることでも、あなたにとっては呪文のように感じるかもしれません。そんなときはイベントのオーガナイザーに知らせてください。あなたのフィードバックで、このガイドを改善することができるのです！

一覧にある、あなたのオペレーティングシステムに合った手順に従ってください。何か問題に遭遇しても、慌てないでください。[知られているエラーの節](#possible-errors-during-installation) を確認するか、イベントのオーガナイザーやコーチたちに知らせてください。一緒に解決しましょう。

- [Mac 用セットアップ](/install/macos)
- [Windows 用セットアップ](/install/windows)
- [Windows 用セットアップ（WSL）](/install/windows-wsl)
- [Linux 用セットアップ](/install/linux)
- その他のインストール方法です。上記のガイドでうまくいかなかったら取り組んでみましょう。
    - [仮想マシンにセットアップする](/install/virtual-machine)
    - [クラウドサービス Replit を使う - 何もインストールする必要はありません](/install/replit)
    - [GitHub Codespaces を使う](/install/codespaces)
    - [AWS Cloud9 を使う](/install/cloud9)

{% coach %}
インストール中に問題が発生した場合、この [Troubleshooting](https://github.com/railsgirls-jp/railsgirls-jp.github.io/wiki/Troubleshooting) のページを参考にしてください。
{% endcoach %}

## インストール中に起こりうるエラー

### Gem::RemoteFetcher エラー

`rails new railsgirls` や `gem update rails` を実行すると以下のようなエラーが発生するかもしれません:

{% highlight sh %}
Gem::RemoteFetcher::FetchError: SSL_connect returned=1 errno=0 state=SSLv3 read
server certificate B: certificate verify failed (https://rubygems.org/gems/i18n-0.6.11.gem)
{% endhighlight %}

これは Rubygems のバージョンが古く、手動で更新する必要があることを意味しています。まずは Rubygems のバージョンを確認しましょう。

{% highlight sh %}
gem -v
{% endhighlight %}

もし `3.0.3` より古いバージョンだった場合、以下の手順で更新する必要があります:

まず [ruby-gems-update gem](https://rubygems.org/downloads/rubygems-update-3.0.3.gem) をダウンロードし、それを `c:\rubygems-update-3.0.3.gem` として保存して、以下を実行してください:

{% highlight sh %}
gem install --local c:\\rubygems-update-3.0.3.gem
{% endhighlight %}

{% highlight sh %}
update_rubygems --no-document
{% endhighlight %}

{% highlight sh %}
gem uninstall rubygems-update -x
{% endhighlight %}

Rubygems のバージョンをチェックしましょう。

{% highlight sh %}
gem -v
{% endhighlight %}

バージョンが `3.0.3` 以上であることを確かめてください。もし失敗していたらやり直してください。

まだ、問題が起きているようならば、いつでも [rubygems.org](https://rubygems.org/pages/download) で最新の rubygems を見つけられます。**GEM** をクリックすると最新のバージョンが手に入ります。

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

### bundle install 実行中にエラーが発生する

新しくアプリを作るとき、`bundle install` 実行中に `Gem::RemoteFetcher::FetchError: SSL_connect` も発生するかもしれません。

[この RailsApps ガイド](https://railsapps.github.io/openssl-certificate-verify-failed.html) で、エラーについて説明されています。現時点で Windows のユーザに関係があるのは [この GitHub の gist](https://gist.github.com/867550) です。説明されている方法で `bundle install` のエラーが解決することが示されています。

### エラー 'x64_mingw' is not a valid platform が発生する

`rails server` を実行すると以下のようなエラーが出ることがあります:

{% highlight sh %}
'x64_mingw' is not a valid platform
{% endhighlight %}

もし RailsInstaller を実行した後でこのエラーが出たときには、`Gemfile` というファイルを少しだけ編集する必要があります:

そのファイルの最後の方を確認してください。おそらく最終行の1つとして以下のような行があるはずです。

{% highlight sh %}
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
{% endhighlight %}

この行に `:x64_mingw` と書かれていたら、`:x64_mingw` の部分を削除してください。
最終的に以下のようになるはずです:

{% highlight sh %}
gem 'tzinfo-data', platforms: [:mingw, :mswin]
{% endhighlight %}

ファイルを編集し終わったら、再びコマンドプロンプトで `bundle update` を実行してみてください。

### sqlite3 gem のインストールに失敗する

`rails new myapp` を実行しているときに、gem `sqlite3` のインストールに失敗するかもしれません。そのときは、まず、Windows のコマンドプロンプトを閉じてください。そして Windows のコマンドプロンプトを再度起動してください。

次に、以下のコマンドを実行して `sqlite3` を `rails` とは別にインストールします。

{% highlight sh %}
gem install sqlite3
{% endhighlight %}

うまくいけば、railsインストーラーが作成したディレクトリ `myapp` を削除し、インストール手順に戻って、再度 `rails new myapp` を実行してください。
