---
layout: main_guide
title: Rails Girls on DigitalOcean
description: "このガイドに沿ってDigitalOceanであなたのアプリをデプロイしよう"
permalink: digitalocean
---

# DigitalOceanであなたのアプリをオンラインにあげよう

*Created by [Colin Alston](https://github.com/calston)*

## 本番用データベースを変更しよう

ローカル環境では、あなたのアプリはデータを保存するためのデータベースとしてSQLiteを使用しています。DigitalOceanのデプロイでは、別のデータベースを使用する方が簡単です。DigitalOceanでデプロイするために、本番用のデータベースをPostgreSQLを使用するように変更していきましょう。

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

## アカウントを作成しよう

[https://www.digitalocean.com/go/app-platform](https://www.digitalocean.com/go/app-platform) にアクセスして60日間の無料体験に申し込みましょう。

![Trial page](/images/digitalocean/1.png)

Githubを使ってサインアップし、アカウントを連携させます。

![Github Authorization](/images/digitalocean/githuboauth.png)

クレジットカードの登録が必要ですが、DigitalOceanを初めて利用される方には、200ドル分のクレジットが与えられます。

![Complete signup](/images/digitalocean/2.png)

## アプリケーションを作成しよう

`Deploy a web application` をクリックして準備を始めましょう。

![Deploy a web application](/images/digitalocean/create-app-1.png)

"Deploy your web app" を選んで既存のGitHubリポジトリを追加します。

![Deply source](/images/digitalocean/create-app-2.png)

DigitalOceanがあなたのリポジトリを読み取ることを許可します。

![Authorize DigitalOcean](/images/digitalocean/create-app-3.png)

あなたのアプリケーションのリポジトリを選択します。

![Choose repo](/images/digitalocean/create-app-4.png)
![Choose branch](/images/digitalocean/create-app-5.png)

`Next` をクリックし、`Edit Plan` をクリックして適切なリソースの利用を確認します。今回は、基本プランと最小のコンテナサイズから始めますが、これで十分でしょう。

![Container size](/images/digitalocean/create-app-7.png)

`Next` をクリックして最後まで進みましょう。もう何も変更する必要はありません。

![Environment](/images/digitalocean/create-app-8.png)
![Region](/images/digitalocean/create-app-9.png)

## あなたのRailsアプリケーションをデプロイしよう

アプリケーションがビルドされるのを待ちます。その間、プロセスのリアルタイムのログを見ることができます。

![Build](/images/digitalocean/building.png)

全てがうまくいけば、アプリケーションが利用できるようになりますが、アプリケーションの初期化とデータベースの追加が必要です。

![Deployment](/images/digitalocean/deploy.png)

`Create` と `Create/Attach Database` をクリックしてPostgreSQLのデータベースに接続しましょう。

![Database](/images/digitalocean/database.png)

アプリケーションに対して、自動的にデータベースの認証情報が設定されます。

## データベースを設定しよう
これで `Console` 上でアプリケーションコンテナにアクセスし、データベースを設定することができます。

`rails db:migrate` とターミナルに入力してエンターを押します。 Railsのschemaでデータベースがセットアップされているのが確認できるはずです。

![Migrate](/images/digitalocean/migrate.png)

すべてがうまくいくと、ライブサーバーに接続する `Live App` ボタンをクリックすることができるでしょう。

![Tada](/images/digitalocean/fin.png)

## まとめ

これで、あなたのRailsアプリはDigitalOceanのクラウド上で動作するようになりました。変更をGitHubにプッシュすれば、しばらくして自動的にライブURLに反映されます。このURLを共有すれば、友達にあなたのアプリを自慢できます！

無料クレジットの期限に注意し、不要になったらアプリを削除することを忘れないようにしましょう。
