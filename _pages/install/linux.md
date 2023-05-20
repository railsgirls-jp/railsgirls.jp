---
layout: main_guide
title: Setup on Linux
description: "Install Ruby and Rails on your Linux computer and get prepared for the Rails Girls workshop."
permalink: install/linux
---

# Linux 用セットアップ

{% include main-guide-intro.html %}

Ruby on Railsの開発環境をインストールするためには、ただ、以下の行をコピーしてLinuxディストリビューション(Ubuntu または Fedora)に貼り付けてEnterを押すだけです。スクリーンに飛び交うテキストをお楽しみください。インストールにはかなり時間がかかります。作業を始める前に飲み物をとることをおすすめします。

<div class="help-notice">作業を続ける前に、<a href="/tools">本ガイドに必要なツール</a>をよく理解してください。</div>

## _1._ 依存関係のインストール

### Ubuntuの場合

Curlをインストールしてください。これは次のステップでスクリプトをインストールするのに必要です。

{% highlight sh %}
sudo apt-get update
sudo apt-get install curl
{% endhighlight %}

## _2._ Railsをインストール

### Ubuntuの場合

次のコマンドを実行して、Ruby on Railsをコンピュータへ自動的にインストールします。

{% highlight sh %}
bash < <(curl -sL https://raw.github.com/railsgirls/installation-scripts/master/rails-install-ubuntu.sh)
{% endhighlight %}

### Fedoraの場合

{% highlight sh %}
bash < <(curl -sL https://raw.github.com/railsgirls/installation-scripts/master/rails-install-fedora.sh)
{% endhighlight %}

## _3._ 開発環境の確認

アプリケーション生成コマンド（以下のコマンド）を実行して、全てが動作していることを確認します。

{% highlight sh %}
rails new myapp
{% endhighlight %}

カレントディレクトリをアプリケーションに移動し、

{% highlight sh %}
cd myapp
{% endhighlight %}

Railsサーバーを起動します。

{% highlight sh %}
rails server
{% endhighlight %}

ブラウザで<http://localhost:3000> を確認します. Railsのロゴが表示されるはずです。

もし、ガイドの途中で何らかの不具合が起こりうまく続けられなかったとして、問題ありません！　ワークショップオーガナイザーへ連絡して、不具合を教えてください。ほとんどのワークショップではその日の夜に対応します。そうでなくても、1営業日中に回答し、あなたの手助けをします。

ブラウザにRailsのロゴが表示されたなら、Ruby on Railsのプログラミングのセットアップは完了しました。おめでとうございます！

もし本ワークショップの前に準備をしているなら、ワークショップ当日までガイドを続ける必要はありません。それではまた！

{% coach %}
もしその場にコーチがいるなら、インストール出来たかどうかの検証を手助けできます。それにはscaffoldコマンドの使用し、その後生成したページにデータのインプットを行います。ワークショップの手順に従っている間、テスト アプリ「myapp」を削除して、間違ったフォルダーで作業している人がいないことを確認します。
{% endcoach %}
