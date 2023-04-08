---
layout: default
title: HTML と CSS を使ってデザインしてみよう
permalink: design
---

# HTML & CSS を使ってデザインしてみよう

*Created by Alex Liao, [@alexliao](http://bannka.com/alex), Translated by Hiroshi SHIBATA [@hsbt](http://twitter.com/hsbt)

アプリケーションは完成しましたが、まだ scaffold で自動生成した状態です。いくつかのデザインを追加してよく見かける Web サイトのようにしてみましょう。このチュートリアルが終わった時に、あなたのアプリケーションは[この](http://railsgirlsapp.herokuapp.com/ideas)ようになるはずです。

## *1.*アプリケーションのレイアウトを適用してみよう

最初に bootstrap.min.css を使って簡単なデザインをあなたのアプリケーションに適用してみましょう。

`app/assets/stylesheets/application.css` を開いて、以下の行を

{% highlight html %}
body { padding-top: 100px; }
{% endhighlight %}

下のように置きかえます。

{% highlight html %}
body { padding-top: 60px; }
{% endhighlight %}

最後に `app/assets/stylesheets/scaffolds.scss` を削除します。これは Rails が標準で作成するファイルで私達にはもう必要の無いものです。

ここまで来たら、[http://localhost:3000/ideas](http://localhost:3000/ideas)をリロードしてみましょう。何かが変わったことが確認出来ると思いますが、格好良くするためにはまだやることがありそうです。

## *2.*ナビゲーションを良くしよう

"idea" はアプリケーションの中で重要なものなので、"New Idea"ボタンはナビゲーションバーに常に表示するようにしてみましょう。

`app/views/layouts/application.html.erb`を開いて以下の行の下に

{% highlight erb %}
<li class="active"><a href="/ideas">Ideas</a></li>
{% endhighlight %}

下の行を追加します。

{% highlight erb %}
<li><%= link_to 'New Idea', new_idea_path %></li>
{% endhighlight %}

**コーチへ**: 何故 a タグではなく link_to を使うのか説明しましょう

## *3.*アイデアリストをデザインしましょう

さあ、idea リストのページを本格的にする時がきました。そのためにはまずテーブルで作られているレイアウトを div タグで置きかえてみましょう。

**コーチへ**: Table と Div について簡単に話してみましょう

`app/views/ideas/index.html.erb` を開いて以下の内容に置きかえます。

{% highlight erb %}
<h1>Listing ideas</h1>

<% @ideas.in_groups_of(3) do |group| %>
  <div class="row">
    <% group.compact.each do |idea| %>
      <div class="col-md-4">
        <%= image_tag idea.picture_url, width: '100%' if idea.picture.present? %>
        <h4><%= link_to idea.name, idea %></h4>
        <%= idea.description %>
      </div>
    <% end %>
  </div>
<% end %>

<br />
{% endhighlight %}

**コーチへ**: 新しく書いたコードを1行ずつ解説しましょう。Bootstrap の 12 grids レイアウトについても簡単に説明しましょう。

ページをリロードしてみましょう! ナイスな idea リストのページが見えるはずです。さらに "New Idea" ボタンをクリックすると、文章や写真と一緒に idea を追加することができます。このページはコンテンツをより良くするためのページです。モダンな Web デザインの基本はコンテンツによって飾り付けられるということがあります。

## *4.*idea の詳細ページをデザインしてみましょう。

idea のタイトルをクリックすると、idea の詳細画面を見ることができます。今はまだ Rails によって作られた scaffold ページのままです。さあ、これをもっとよくしてみましょう。

`app/views/ideas/show.html.erb` をテキストエディタで開いて、以下の内容で全てを置きかえます。

{% highlight erb %}
<p id="notice"><%= notice %></p>

<div class="row">
  <div class="col-md-9">
    <%= image_tag(@idea.picture_url, width: '100%') if @idea.picture.present? %>
  </div>

  <div class="col-md-3">
    <p><b>Name: </b><%= @idea.name %></p>
    <p><b>Description: </b><%= @idea.description %></p>
    <p>
      <%= link_to 'Edit', edit_idea_path(@idea) %> |
      <%= link_to 'Back', ideas_path %>
      <%= button_to 'Destroy', idea_path(@idea), form: { data: { turbo_confirm: "Are you sure?" } }, method: :delete %>
    </p>
  </div>
</div>
{% endhighlight %}

**コーチへ**: 新しいコードを1行ずつ説明してみましょう。

## 次のステップは何?

* 学んだことを活かして新しい idea を登録するフォームをデザインしましょう
* あなたの望むようにページをデザインしてみましょう
* 他のガイドを読んで Rails の技術について学びましょう
