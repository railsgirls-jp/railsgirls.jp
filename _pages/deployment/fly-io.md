---
layout: main_guide
title: Fly.ioであなたのアプリをオンラインにあげよう
description: "このガイドに従って、アプリをFly.ioにデプロイしてましょう。"
permalink: deployment/fly-io
---

# Fly.ioであなたのアプリをオンラインにあげよう

*翻訳者: Mai Muta, [@maimux2x](https://twitter.com/maimux2x)*

このガイドでは、作成したアプリを[Fly.io](https://fly.io/)にデプロイして、オンラインで誰でも利用できるようにします。このガイドの後、友人や家族とリンクを共有し、このワークショップで作成したものを見せることができるようになります。

Fly.ioで小さなアプリを1つだけデプロイする場合、無料で利用が可能ですが、いくつかの制限があります。

{% coach %}
Fly.ioに導入するメリットと従来のサーバーとの比較について話してみましょう。
{% endcoach %}

## 本番用データベースを変更しよう

ローカル環境では、あなたのアプリはデータを保存するためのデータベースとしてSQLiteを使用しています。Fly.ioのデプロイでは、別のデータベースを使用する方が簡単です。Fly.ioでデプロイするために、本番用のデータベースをPostgreSQLを使用するように変更していきましょう。

### pg gemをインストールしよう

テキストエディタで`Gemfile`ファイルを開き、以下の行を

{% highlight ruby %}
gem "sqlite3"
{% endhighlight %}

以下に変更します。

{% highlight ruby %}
group :development do
  gem "sqlite3"
end
group :production do
  gem "pg"
end
{% endhighlight %}

次に、以下のコマンドを実行し、新しいデータベースgemをセットアップします。

{% highlight sh %}
bundle install --without production
{% endhighlight %}

### データベースの設定を更新しよう

続いて、本番環境のデータベース構成を変更する必要があります。

{% coach %}
Railsの複数ある環境が何かを説明しましょう。`Production` とは何でしょうか？
{% endcoach %}

テキストエディタで `config/database.yml` ファイルを開きましょう。ファイル内の以下の行を

{% highlight yaml %}
production:
  <<: *default
  database: db/production.sqlite3
{% endhighlight %}

以下のように変更します。

{% highlight yaml %}
production:
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  database: railsgirls_production
  username: railsgirls
  password: <%= ENV["RAILSGIRLS_DATABASE_PASSWORD"] %>
{% endhighlight %}

新しいコミットを作成し、Git に変更を保存します。デプロイするために、これらの変更をGitに保存されているアプリに対して更新する必要があります。

{% highlight sh %}
git add .
git commit -m "Use PostgreSQL as the production database"
{% endhighlight %}

## Fly.ioのアカウントを作成しよう

Fly.ioの[サインアップページ](https://fly.io/app/sign-up)にアクセスし、フォームに必要事項を入力して、新規ユーザーアカウントを作成しましょう。

次の画面で、「Try Fly.io for free」リンクをクリックします。Fly.ioを無料で利用するためにクレジットカードを入力する必要はありません。

## Fly.io CLIをインストールしよう

Fly.ioでアプリをデプロイするには、Fly.io CLIというターミナルアプリのツールを使用する必要があります。

この[Fly.ioのドキュメントページ](https://fly.io/docs/hands-on/install-flyctl/)のインストール手順に従ってインストールをしてください。Fly.io CLIのインストールが完了したら、このガイドの続きを進めていきましょう。

## Fly.io CLIにログインしよう

以下のコマンドを実行して、Fly.ioのユーザーアカウントをあなたのパソコン環境に反映させ、ターミナルアプリでFly.ioを使用してアプリをデプロイします。

{% highlight sh %}
flyctl auth login
{% endhighlight %}

ブラウザ上に新しいタブまたはウィンドウが表示されます。先ほど作成したFly.ioのユーザーアカウントでログインするか、「Continue as ...」で始まるボタンをクリックします。これでFly.ioにCLIでログインしたことになります。

## デプロイのためにアプリの設定をしよう

以下のコマンドを実行し、アプリに必要な設定を行い、デプロイを実行します。

{% highlight sh %}
fly launch
{% endhighlight %}

質問の回答を求められるため、以下を入力または選択してください。

- Choose an app name:
    - `railsgirls-yourname` を入力し、Enterを押します。
    - "yourname"の部分はあなたの名前かニックネームに変更しましょう。
- Choose a region for deployment:
    - 矢印キーで自分に一番近い地域を選び、次に <kbd>Enter</kbd> を押しましょう。
- Would you like to set up a Postgresql database now?
    - <kbd>y</kbd> を入力して <kbd>Enter</kbd> を押しましょう。
- Select configuration:
    - リストの中から"Development"を選択しましょう。 
- Would you like to set up an Upstash Redis database now?:
    - <kbd>n</kbd> を入力して <kbd>Enter</kbd> を押しましょう。

これで、アプリがFly.ioでデプロイができるように設定が完了しました。デプロイする前に、これらの変更をコミットする必要があります。以下のコマンドで変更をコミットしましょう。

{% highlight sh %}
git add .
git commit -m "Configure for Fly.io deployment"
{% endhighlight %}

## デプロイを実行しよう

以下のコマンドを実行するとデプロイが行われます。
アプリに新しい変更を加え、今後その変更をデプロイしたい場合も、同様です。

{% highlight sh %}
fly deploy
{% endhighlight %}

アプリのデプロイが完了するまでに必要なステップの結果がターミナル上にたくさんのテキストとして出力されていると思います。出力が完了するまで待機しましょう。デプロイが完了すると「v0 deployed successfully」と表示されるはずです。

## デプロイされたアプリを見てみよう

これで、あなたのアプリは今、デプロイがされました。これはつまり、他の人たちがオンラインでアプリを見ることが可能であることを意味します。実際にアプリを見るために、以下のコマンドを実行して、ブラウザで開いてみましょう。

{% highlight sh %}
fly open
{% endhighlight %}

最初のアプリのデプロイが完了しました！おめでとうございます！ブラウザのアドレスバーに表示されたリンクを共有して他の人たちにも見てもらいましょう！

---

Fly.ioでデプロイを実行したため、他のサービスにアプリをデプロイする必要はありません。次の番号のガイドに進みましょう。
