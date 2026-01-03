---
layout: default
title: アプリにバックエンドを追加しよう(管理画面)
permalink: backend-with-active-admin
---

# アプリにバックエンドを追加しよう(管理画面)

*Created by [Rasmus Kjellberg](https://www.rasmuskjellberg.se) / 翻訳者: Nana Matsuoka*

**このガイドは [アプリ開発ガイド](/app)に沿って、Rails Girls appをすでに構築していることを前提としています。**

Active AdminはRuby on Railsのプラグインであり、管理画面のインターフェイスを生成します。このプラグインによって一般的なビジネスアプリケーションのパターンが抽象化され、開発者は、見た目がよく、洗練されたインターフェイスを非常に少ない労力で実装することができます。Active Adminについて、詳しくは[こちら](http://activeadmin.info/)をご覧ください。

## 「Active Admin」gemを追加
`Gemfile`を開き、以下の行を追加します。

{% highlight ruby %}
gem 'devise'
gem 'activeadmin', github: 'activeadmin'
gem 'inherited_resources', github: 'activeadmin/inherited_resources'
{% endhighlight %}
gemをインストールするために、以下のコマンドを実行します。
{% highlight sh %}
$ bundle install
{% endhighlight %}

bundleの更新後、以下のコマンドでインストーラーを実行します。
{% highlight sh %}
$ rails generate active_admin:install
{% endhighlight %}

このインストーラーの実行によって、Active Adminで使用されるデフォルトを設定するための初期設定ファイルと、すべての管理設定を行うための新たなフォルダがapp/admin下に生成されます。

データベースをマイグレートし、サーバーを起動します。
{% highlight sh %}
$ rake db:migrate
$ rails server
{% endhighlight %}

## 最初の管理者アカウントの作成
Railsコンソールを開き、`AdminUser`モデルに紐づく新規ユーザーを作成します。
{% highlight sh %}
$ rails console
irb(main):001:0> AdminUser.create(:email => 'admin@railsgirls.com', :password => 'password123', :password_confirmation => 'password123')
{% endhighlight %}

以下のような表示がされるはずです。
{% highlight sh %}
# (0.3ms)  begin transaction
# SQL (0.4ms)  INSERT INTO "admin_users" ...
# (0.9ms)  commit transaction
{% endhighlight %}

`exit`とコマンドを打つことで、簡単にコンソールセッションを終了できます。
{% highlight sh %}
irb(main):002:0> exit
{% endhighlight %}

## 管理画面へのアクセス
 [http://localhost:3000/admin](http://localhost:3000/admin) にアクセスし、先ほど作成した認証情報でログインします。

見てください！新しいActive Adminダッシュボードにアクセスできました。

## バックエンドに「Ideas」を追加
`Idea`モデルを Active Admin に登録するためには、以下を実行します。
{% highlight sh %}
$ rails generate active_admin:resource Idea
{% endhighlight %}
管理画面を更新すると、ナビゲーションに[Ideas](http://localhost:3000/admin/ideas)が表示されます。

*「Idea」を任意のモデルに置き換えて、そのモデルを Active Admin に登録することもできます。*

### ストロングパラメータの設定
モデルを更新する際に、**ActiveModel::ForbiddenAttributesError in Admin::IdeasController#update** というエラーが発生するのを防ぐため、[permit_params](http://activeadmin.info/docs/2-resource-customization.html) メソッドを使用して、変更可能な属性を定義する必要があります。

 `app/admin/idea.rb` ファイルを開き、 `:name`、`:description`、`:picture` を `permit_params` に追加します。
{% highlight ruby %}
ActiveAdmin.register Idea do
  permit_params :name, :description, :picture
end
{% endhighlight %}

## ユーザーの "new"、"edit"、 "destroy" を削除する
管理者でないユーザーによる更新を防止したい場合には、ルーティングファイルを編集し、"index"と"show"のみを許可することで簡単にこの問題を解決することができます。`config/route.rb`に`only: [:show, :index]`を追加します。
{% highlight ruby %}
resources :ideas, only: [:show, :index]
{% endhighlight %}

**フロントエンドコードから、次のような、使用できなくなったリンクを削除するのを忘れないでください。** `<%= link_to 'New Idea', new_idea_path %>`, `<%= link_to 'Edit', edit_idea_path(idea) %>`, `<%= link_to 'Destroy', idea, method: :delete, data: { confirm: 'Are you sure?' } %>`

さあ見てください！新しい管理画面からアイデアを管理できるようになりました！

## 次は?

* BlogやCommentsといった別のリソースを管理者に追加してみましょう。
