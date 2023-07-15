---
layout: guide
title: Touristic Autism-friendly Spots App
permalink: touristic-autism_intro
---

# 自閉症に優しい観光地のアプリを作ろう

*Created by Myriam Leggieri, [@iammyr](https://twitter.com/iammyr) Translated by Satomi Nishiyama, [nyancat3](https://github.com/nyancat3)*
*for [Rails Girls Galway](https://github.com/RailsGirlsGalway)*

このガイドでは**次のシナリオを想定して**RailsGirlsガイドの基礎的なものをいくつか統合、適用し、そして拡張します: 自閉症に優しいかどうかという観点から、観光地を説明、表示、コメント、そして評価できるようにします。このアプリケーションは、自閉症の成人を旅行中にサポートするために、 [Galway Autism Partnership](https://galwayautismpartnership.com/) からリクエストされたアプリです。

今回の拡張には以下の**新しい特徴**が含まれています。

* TDDで開発するためのガイド
* 評価機能
* 認証ユーザー（デバイス経由）の権限設定

このガイドでは、[Ruby on Rails Tutorial](https://www.railstutorial.org/book)、[はじめてのアプリを作る](/app)、そして [CarrierWave を使ってサムネイルを作ってみよう](/thumbnails)、[Devise で認証機能を追加](/devise)、[HTML & CSS を使ってデザインしてみよう](/design)、[OpenShiftでアプリを公開する](/openshift/)、[コメント機能を追加しよう](/commenting) のチュートリアルといった基礎的なガイドを統合、適用しています。



### [*0.* インストール](/install)

**まずは、RailsとGitがインストールされていることを確認してください。** [**インストールガイド**](/install)や、[**Pro GitのGitインストールの章**](https://www.git-scm.com/book/en/Getting-Started-Installing-Git)に従ってセットアップをしましょう。次に、ターミナルに以下を入力してGitHubを設定します。

{% highlight sh %}
git config --global user.name "Your Name"
git config --global user.email your.email@example.com
{% endhighlight %}

<p>これは初回のみ必要な、GitHubのセットアップ手順です。</p>

もしGitHubアカウントをまだ持っていない場合は、[GitHubの無料アカウント](https://github.com/signup/free)へサインアップしてください。


### [*1.* 基本的なWEBアプリケーション](/touristic-autism_basic-app)

### [*2.* Gitによるバージョン管理](/touristic-autism_git)

### [*3.* モデリング](/touristic-autism_resource-modeling)

### [*4.* 評価機能](/touristic-autism_resource-rating)

### [*5.* デザイン](/touristic-autism_design)

### [*6.* 画像のアップロードとサムネイル](/touristic-autism_image-upload)

**オプション - 上級Rails Girls向け:**

### [*7.* 継続的デプロイ](/touristic-autism_continuous-deployment)

### [*8.* 継続的テストとインテグレーション](/touristic-autism_static-pages-tdd)




## 追加ガイド

* Guide 0: [Ruby、Rails、コンソール、テキストエディターについての便利なチートシート](https://www.pragtob.info/rails-beginner-cheatsheet/)
* Guide 1: [Heroku に Rails アプリを deploy しよう by Terence Lee](/heroku) / [OpenShiftでアプリを公開する by Katie Miller](/openshift) / [anyninesを使用してインターネットに公開しよう!](/anynines) / [Put your app online with Trucker.io](/trucker)
* Guide 2: [Gravatarでプロフィール写真を追加する](/gravatar)
* Guide 3: [Lucy Bainによるアプリの追加説明を見る](https://github.com/lbain/railsgirls)


# 付録

## 変更を元に戻す

Railsには、ミスからの復旧を助けてくれる機能がいくつかあります。

例えば、コントローラの名前を変更すると決めたとしましょう。コントローラを生成するとき、Railsはコントローラファイル自体よりも多くのファイルを作成するため、生成を取り消すことはそのファイル一式を削除することを意味します。Railsでは、これをrails destroyで実現できます。具体的には、これらの2つのコマンドは互いを取り消し合うことになります。

{% highlight sh %}
rails generate controller FooBars baz quux
rails destroy  controller FooBars baz quux
{% endhighlight %}

同様に、次のコマンドでモデルを生成した後で、

{% highlight sh %}
rails generate model Foo bar:string baz:integer
{% endhighlight %}

次のコマンドによりモデル生成を取り消すことができます。

{% highlight sh %}
rails destroy model Foo
{% endhighlight %}

次のコマンドにより、マイグレーションがデータベースの状態を変更します。

{% highlight sh %}
rails db:migrate
{% endhighlight %}

次のコマンドにより、マイグレーションを1段階取り消すことができます。

{% highlight sh %}
rake db:rollback
{% endhighlight %}

全てを取り消して最初の状態に戻すには、次のコマンドを使えます。

{% highlight sh %}
rails db:migrate VERSION=0
{% endhighlight %}

ご想像の通り、0の代わりに他の数字を代入すると、そのバージョン番号までマイグレーションされます。このバージョン番号は、マイグレーションを実行順に並べたときの番号です。

データベースからテーブルを削除するには、次のコマンドを入力します。

{% highlight sh %}
rails console
{% endhighlight %}

そして次のコマンドを入力してください。

{% highlight ruby %}
ActiveRecord::Migration.drop_table(:<table-name>)
{% endhighlight %}

次のコマンドを入力することで、データベースを直接閲覧できます (sqlite3の場合は ".quit " を入力すると終了します) 。

{% highlight sh %}
rails db
{% endhighlight %}
