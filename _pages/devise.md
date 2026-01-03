---
layout: guide
title: Deviseによる認証を追加してみよう
permalink: devise
---

# Deviseによる認証を追加してみよう

*Created by Piotr Steininger, [@polishprince](https://twitter.com/polishprince). Updated by Ernesto Jimenez, [@ernesto_jimenez](https://twitter.com/ernesto_jimenez)*, and [Hasan Diwan](https://units.d8u.us/twitter?src`=railsgirlsGuide)*

*Updated by Ernesto Jimenez, [@ernesto_jimenez](https://twitter.com/ernesto_jimenez)*

**このガイドは、すでに [ Rails Girls アプリ・チュートリアル ](/app) でアプリを作った方を対象にしています。**

## *1.* devise gem を追加

gem を追加するには、以下のコマンドを実行します。

{% highlight sh %}
bundle add devise
bundle install
{% endhighlight %}

**Rails のサーバーを再起動するのを忘れずに!**

## *2.* アプリに devise をセットアップ

ターミナルで以下のコマンドを実行します。

{% highlight sh %}
rails g devise:install
{% endhighlight %}

## *3.* Devise の環境設定

environments ファイルにデフォルトの url オプションを定義します。
`config/environments/development.rb` を開いて次の行を追加しましょう。

{% highlight ruby %}
config.action_mailer.default_url_options = { host: "localhost", port: 3000 }
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

{% highlight erb %}
<p id="notice"><%= notice %></p>
{% endhighlight %}

の行を削除します。

同じように `app/views/comments/show.html.erb` についても削除を行います。これらの `notice` 行は `app/views/layouts/application.html.erb` ファイルに同じ行を追加したので、必要ありません。

## *4.* User モデルを作成

User モデルを作るために生成用のスクリプトを実行します。

{% highlight sh %}
rails g devise user
rails db:migrate
{% endhighlight %}

{% coach %}
生成された User モデルについて説明をしてください。フィールドとは何ですか？
{% endcoach %}

## *5.* 最初のユーザーを作成

これで最初のユーザーを作成する準備がすべて整いました。Devise がアカウントの作成、ログイン、ログアウトなどに関するすべてのコードやルーティングを生成してくれています。

Rails のサーバーが起動している事を確認したら、[http://localhost:3000/users/sign_up](http://localhost:3000/users/sign_up) をブラウザで開いてユーザーを作成してください。

## *6.* サインアップとログインリンクの追加

あと、やらなければいけないことは、ユーザーがログインできる適切なリンク、または案内をナビゲーションバー右上のコーナーに追加することです。
そのために、 `app/views/layouts/application.html.erb` を開いて、

{% highlight erb %}
<p class="navbar-text float-right">
<% if user_signed_in? %>
  Logged in as <strong><%= current_user.email %></strong>.
  <%= link_to "Edit profile", edit_user_registration_path, class: "navbar-link" %> |
  <%= link_to "Logout", destroy_user_session_path, data: { turbo_method: :delete }, class: "navbar-link"  %>
<% else %>
  <%= link_to "Sign up", new_user_registration_path, class: "navbar-link"  %> |
  <%= link_to "Login", new_user_session_path, class: "navbar-link"  %>
<% end %>
</p>
{% endhighlight %}

これらを、次の行の上に追加します。

{% highlight erb %}
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link" href="/ideas">Ideas</a>
    </li>
    ...
  </ul>
{% endhighlight %}

最後にログインしていない時に登録した内容を確認できないようにします。
`app/controllers/application_controller.rb` を開いて次の行を追加しましょう。

{% highlight ruby %}
  before_action :authenticate_user!
{% endhighlight %}

`class ApplicationController < ActionController::Base` と書かれているところの次の行に追加してください。

ブラウザを開いてログインやログアウトを試してみてください。

{% coach %}
`user_signed_in?` や `current_user` ヘルパーについて話してみてください。どうしてそれらのヘルパーは便利なのでしょうか？
{% endcoach %}

## 次は？

* User モデルにその他の項目も追加しましょう。
* users と ideas 間のリレーションを追加しましょう。
* それぞれ自分の ideas だけ編集と自分のコメントだけ削除できるように users に制限をかけましょう。
* ロールやパーミッションを使うように拡張しましょう。（CanCan のような人気の認証 gem も使ってみてください。）
