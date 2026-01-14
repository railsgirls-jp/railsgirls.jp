---
layout: main_guide
title: Setup on Linux
description: "Install Ruby and Rails on your Linux computer and get prepared for the Rails Girls workshop."
permalink: install/linux
---

# Linux 用セットアップ

*翻訳者: kyokucho1989, [@kyokucho1989](https://twitter.com/kyokucho_1989)*

{% include main-guide-intro.html %}

Ruby on Railsの開発環境をインストールするためには、ただ、あなたが使っているLinuxディストリビューション(Ubuntu または Fedora)向けの以下の行をコピーし、貼り付けてEnterを押すだけです。スクリーンに飛び交うテキストをお楽しみください。インストールにはかなり時間がかかります。作業を始める前に飲み物をとることをおすすめします。

<div class="help-notice">作業を続ける前に、<a href="/tools">本ガイドに必要なツール</a>をよく理解してください。</div>

## _1._ 依存関係のインストールをしよう

### Ubuntuの場合

Curlをインストールしてください。これは次のステップでインストールスクリプトを実行するのに必要です。

{% highlight sh %}
sudo apt-get update
sudo apt-get install curl
{% endhighlight %}

## _2._ Railsをインストールしよう

### Ubuntuの場合

次のコマンドを実行して、Ruby on Railsをコンピュータへ自動的にインストールします。

{% highlight sh %}
bash < <(curl -sL https://raw.github.com/railsgirls/installation-scripts/master/rails-install-ubuntu.sh)
{% endhighlight %}

### Fedoraの場合

{% highlight sh %}
bash < <(curl -sL https://raw.github.com/railsgirls/installation-scripts/master/rails-install-fedora.sh)
{% endhighlight %}

## _3._ 開発環境を確認しよう

以下のアプリケーション生成コマンドを実行して、全てが動作していることを確認します。

{% highlight sh %}
rails new railsgirlsapp
{% endhighlight %}

アプリケーションのディレクトリに移動し、

{% highlight sh %}
cd railsgirlsapp
{% endhighlight %}

Railsサーバーを起動します。

{% highlight sh %}
rails server
{% endhighlight %}

ブラウザで<http://localhost:3000> にアクセスしましょう。Rails のロゴが表示されるはずです。

このガイドに取り組んでいる間に問題にぶつかって進められなくなったとしても、問題ありません！ワークショップのオーガナイザーたちに声をかけて、どんな問題が起きているのか伝えてください。ワークショップによっては、夕方からセットアップのための時間を設けていますし、そうでなくても、ワークショップの日に助けてくれます。

ブラウザに Rails のロゴが表示されたら、これで Ruby on Rails を使ってプログラミングする準備ができたことになります。おめでとうございます！

ワークショップの準備ができました。ワークショップの前に準備するのであれば、ワークショップ当日までこれ以上ガイドを進める必要はありません。ワークショップでお会いしましょう！

{% coach %}
コーチがいるのであれば、コーチと一緒に scaffold コマンドを実行し、生成された画面でデータを入力して、すべて機能していることを確認することで、インストールできたことを確認するのを手伝ってくれます。この後のワークショップの手順に従いながら、テスト用のアプリ myapp を削除し、誰も間違ったフォルダで作業していないことを疑いのないものにしてください。
{% endcoach %}
