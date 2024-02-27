---
layout: default
title: Gravatarでプロフィール写真を追加する
permalink: gravatar
---

# Gravatarでプロフィール写真を追加する

*Created by Catherine Jones*

このガイドは、すでに [RailsGirls アプリ・チュートリアル](/app) と [Deviseによる認証を追加してみよう](/devise) でアプリを作った方を対象にしています。

### 重要

Gravatarにあなたのメールアドレスを登録する必要があります。まだ登録を済ませていない方はこちらで登録をしてください。 [gravatar.com](http://en.gravatar.com/).

## *1.*Gravtastic gem を追加する

Gemfileを開いて、 `devise` の下に次の一行を追加します。

{% highlight erb %}
gem 'gravtastic'
{% endhighlight %}

ターミナルで、次のコマンドを実行してください。

{% highlight sh %}
bundle
{% endhighlight %}

これでgravastic gemのインストールがされます。この時、rails serverをリスタートするのを忘れないで下さい。

## *2.*Gravatarをセットアップする。

`app/models/user.rb` を開いて、最初の行の下に、次の二行を追加します。

{% highlight ruby %}
include Gravtastic
gravtastic
{% endhighlight %}

## *3.*Gravatarを設定する。

`app/views/layouts/application.html.erb` を開いて、

{% highlight erb %}
<% if user_signed_in? %>
{% endhighlight %}

の固まり中の

{% highlight erb %}
<% else %>
{% endhighlight %}

の直前に下記の一行を追加してください。

{% highlight erb %}
<%= image_tag current_user.gravatar_url %>
{% endhighlight %}

それでは、あなたのアプリをブラウザで開いて、Gravatarに登録したメールアドレスでログインしてみてください。あなたのGravatarアイコンが見られるはずです。
