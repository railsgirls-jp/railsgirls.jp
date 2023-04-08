---
layout: default
title: Devise で認証機能を追加
permalink: devise
---

# Devise で認証機能を追加

*Created by Piotr Steininger, [@polishprince](https://twitter.com/polishprince)*

*Updated by Ernesto Jimenez, [@ernesto_jimenez](https://twitter.com/ernesto_jimenez)*

** このガイドは、すでに [ Rails Girls アプリ・チュートリアル ](/app) でアプリを作った方を対象にしています。 **



## *1.*devise gem を追加

アプリの `Gemfile` を開いて、次の行を追加します。

{% highlight ruby %}
gem 'devise'
{% endhighlight %}

そして、ターミナルもしくはコマンドプロンプト(Windows用)を開いてアプリのディレクトリへ移動し、次のコマンドを実行しましょう。

{% highlight sh %}
bundle
{% endhighlight %}

gem のインストールができました。Rails のサーバーを再起動するのを忘れずに!


## *2.*アプリに devise をセットアップ

次は、先ほどのディレクトリでこのコマンドを実行しましょう。

{% highlight sh %}
rails generate devise:install
{% endhighlight %}

## *3.*Devise の環境設定

environments ファイルにデフォルトの url オプションを定義します。
`config/environments/development.rb` を開いて次の行を追加しましょう。

{% highlight ruby %}
config.action_mailer.default_url_options = { host: 'localhost:3000' }
{% endhighlight %}

`end` と書かれているところの前に追加してください。

さらに `app/views/layouts/application.html.erb` を開いて、

{% highlight erb %}
<% if notice %>
  <p class="alert alert-success"><%= notice %></p>
<% end %>
<% if alert %>
  <p class="alert alert-danger"><%= alert %></p>
<% end %>
{% endhighlight %}

これらを、次の行の上に追加します。

{% highlight ruby %}
   <%= yield %>
{% endhighlight %}

また、 `app/views/ideas/show.html.erb` を開いて、

{% highlight ruby %}
<p id="notice"><%= notice %></p>
{% endhighlight %}

を削除します。

同じように `app/views/comments/show.html.erb` についても削除を行います。これらの `notice` 行は `app/views/layouts/application.html.erb` ファイルに同じ行を追加したので、必要ありません。

## *4.*User model をセットアップ

User model を作るために bundled generator script を使います。

{% highlight sh %}
rails generate devise user
rails db:migrate
{% endhighlight %}

**Coachより:** 生成された User モデルについて説明をしてください。フィールドとは何ですか？

## *5.*ユーザーを作成

これでユーザを作成する準備がすべて整いました。Devise がアカウントの作成、ログイン、ログアウトなどに関するすべてのコードやルーティングを生成してくれています。

Rails のサーバーが起動している事を確認したら、[http://localhost:3000/users/sign_up](http://localhost:3000/users/sign_up) をブラウザで開いてユーザーを作成してください。

## *6.*サインアップとログインリンクの追加

あと、やらなければいけないことは、ユーザーがログインできる適切なリンク、または案内をナビゲーションバー右上のコーナーに追加することです。
そのために、 `app/views/layouts/application.html.erb` を開いて、

{% highlight erb %}
<p class="navbar-text pull-right">
  <% if user_signed_in? %>
    Logged in as <strong><%= current_user.email %></strong>.
    <%= link_to 'Edit profile', edit_user_registration_path, class: 'navbar-link' %> |
    <%= link_to "Logout", destroy_user_session_path, method: :delete, class: 'navbar-link'  %>
  <% else %>
    <%= link_to "Sign up", new_user_registration_path, class: 'navbar-link'  %> |
    <%= link_to "Login", new_user_session_path, class: 'navbar-link'  %>
  <% end %>
</p>
{% endhighlight %}

これらを、次の行の上に追加します。

{% highlight erb %}
<ul class="nav navbar-nav">
  <li class="active"><a href="/ideas">Ideas</a></li>
</ul>
{% endhighlight %}

最後にログインしていない時に登録した内容を確認できないようにします。
`app/controllers/application_controller.rb` を開いて次の行を追加しましょう。

{% highlight ruby %}
  before_action :authenticate_user!
{% endhighlight %}

`end` と書かれているところの前に追加してください。

ブラウザを開いてログインやログアウトを試してみてください。

**Coachより:** `user_signed_in?` や `current_user` ヘルパーについて話してみてください。何が便利だったでしょうか？

## 次は？

* User model のその他の項目も追加しましょう。
* users と ideas 間のリレーションを追加しましょう。
* それぞれ自分の ideas だけ編集と自分のコメントだけ削除できるように users に制限をかけましょう。
* ロールやパーミッションを使うように拡張しましょう。（ CanCan のような人気の認証 gem も使ってみてください。）


