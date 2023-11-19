---
layout: guide
title: Rails Girls on Passenger
permalink: passenger
---

# Phusion Passengerでスムーズに開発しよう

*作成者： Floor Drees, [@floordrees](https://twitter.com/floordrees)*
*翻訳者: Mai Muta, [@maimux2x](https://twitter.com/maimux2x)*

### そのためのアプリケーションサーバー

このまま続ける前に [GitHubに自分のアプリをPushする][github-guide] のガイドを確認しておきましょう。

以下は、Passengerを使ったアプリの開発（機能を追加し、実際に動くかどうかをチェックすること）をスムーズにするためのガイドです。Ruby on Railsフレームワークには、`rails server` コマンドでアクセスできる組み込みのサーバーツールが提供されています。「rails server」自体はアプリケーションサーバーではなく、単なる小さなラッパーで、アプリをアプリケーションサーバーで起動させるものです。「rails server」を本番環境（他の人がアクセスしてアプリを使用できる場所）では使用しません。Passengerなどのアプリケーションサーバーを使用します。

{% coach %}
Passengerはオープンソースのアプリケーションサーバーです。 それはHTTPリクエストを処理し、プロセスとリソースを管理し、管理、モニタリング、および問題の診断を可能にします。 大手の開発者向けには、エンタープライズエディションもあります。
{% endcoach %}

[github-guide]: /github

### アプリの準備をしよう

#### Passenger gem をインストールします

あなたのアプリのGemfileを開いて `passenger` を追加します。

{% highlight ruby %}
gem "passenger"
{% endhighlight %}

PassengerをGemfileに追加することで、`rails server` はPumaに代わってPassengerを起動します。
以下の行を削除すると（もしもGemfileに存在する場合）、Phusion Passengerチームから仮想ボーナスポイントがもらえます。

{% highlight ruby %}
gem "unicorn"
gem "thin"
gem "puma"
{% endhighlight %}

`bundle inatall` を実行してあなたが使用するgemを更新します。

ターミナルには次のように表示されるでしょう。

{% highlight sh %}
bundle install
...
Installing passenger x.x.x
...
Your bundle is complete!
{% endhighlight %}

NginxとApacheはwebサーバーです。 それらはHTTPトランザクションの処理と静的ファイルの提供を行います。アプリケーションサーバーは、RubyアプリがHTTPで通信することを可能にします。Rubyのアプリケーション（そしてRailsのようなフレームワーク）自体はHTTP通信ができません。よくある本番環境の構成では、ウェブサーバーとしてNginxまたはApache、アプリケーションサーバーとしてPassenger、リリースの自動化ツールとしてCapistranoが使用されます。PassengerはNginxまたはApacheと統合し、アプリケーションとそのリソースを管理します。

{% coach %}
gemのバージョンを指定する必要がある場合もあります。
`gem "passenger", ">= 5.0.25", require: "phusion_passenger/rack_handler"`
{% endcoach %}

#### 動作の確認をしましょう

以下のコマンドでPassengerサーバーを実行します。

{% highlight sh %}
bundle exec passenger start
{% endhighlight %}

Passengerが<http://0.0.0.0:3000/>上であなたのアプリを提供しています。
アプリを少し使ってから、`bundle exec passenger-status` を実行してアクティビティを確認してみてください。

<!-- 原文にある以下は英語のジョークであるため翻訳にあたっては訳出していません。
Big (friendly, promised!) brother is watching you. -->

サーバーを停止する方法は２つあります。 一つ目はターミナルでCtrl-Cを押します。二つ目は以下のように新しいターミナルウィンドウで `passenger stop` を実行します。

{% highlight sh %}
cd /path-to-your-app
bundle exec passenger stop
{% endhighlight %}

最初のターミナルに切り替えると、Passengerが確かに停止していることが確認できるはずです。

Passengerはクラッシュしたプロセスを再起動し、トラフィックをプロセス間で負荷分散し、トラフィックの増減に応じてプロセスを増やしたり、減らしたりして、より多くのトラフィックを処理したり、リソースを節約したりします。これはすべて自動的に処理され、コードで何かを指定する必要はありません！ 今はあまり意味がないかもしれませんが、将来の開発者は私たちに感謝するでしょう。

今後のために、`passenger-config restart-app`コマンドを使ってアプリケーションを再起動することができます。Passengerを停止して起動するのに2回コマンドを実行しなければいけないことと比べると、これは便利です。

#### tmp/always_restart.txt

Passenger は `tmp/always_restart.txt` というマジックファイルもサポートしています。このファイルを使うと、Passenger はリクエストのたびにアプリケーションを再起動します。こうすることで、再起動コマンドを頻繁に実行する必要がなくなります。

このメカニズムを有効にするには以下のようにファイルを作成します。

{% highlight sh %}
mkdir -p tmp
touch tmp/always_restart.txt
{% endhighlight %}

このメカニズムを無効にするには以下のようにファイルを削除します。

{% highlight sh %}
rm tmp/always_restart.txt
{% endhighlight %}

{% coach %}
時々、carrierwave gemが問題を起こすことがあリます。`environment.rb` ファイルに `require 'carrierwave/orm/activerecord'` を追加すると、問題が解消されることがよくあります。
{% endcoach %}


### アプリをデプロイしましょう

#### アプリのホスティング

ホスト（インフラ）を選択し、[アプリをオンラインに公開するためのガイドに従う][passenger-guide]前に、これまでの変更をコミットしましょう。

{% highlight sh %}
git add .
git commit -m "add passenger"
git push
{% endhighlight %}

ここからは[Herokuガイド][heroku-guide]に従うこともできます。

[passenger-guide]: https://www.phusionpassenger.com/library/walkthroughs/deploy/ruby/
[heroku-guide]: /heroku

#### トラブルシューティング

ターミナルで `passenger --help` コマンドを使って、利用可能なすべてのコマンドとその機能を参照することができます。 多くのコマンド（例: `passenger start`）には多くの「サブコマンド」があります。たとえば、 `passenger start --help` を実行して、「start」コマンドのすべてのアドオンを表示できます。

迷いましたか？ Phusion Passengerには初心者向けのガイドを含む詳細なドキュメンテーションがあります。
 [Passenger Guide][passenger-documentation]

難航していますか？ コーチと一緒に[Passengerのトラブルシューティングガイド][troubleshooting-guide]を進めてみてください。

[passenger-documentation]: https://www.phusionpassenger.com/library/
[troubleshooting-guide]: https://www.phusionpassenger.com/library/admin/nginx/troubleshooting/ruby/
