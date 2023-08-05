---
layout: main_guide
title: HTML と CSS を使ってアイデアのページをデザインしてみよう
description: "Bootstrap を使ってアイデアのページをデザインし、アプリをもっと美しくしてみよう。"
permalink: design
---

# HTML と CSS を使ってアイデアのページをデザインしてみよう

*Originally created by Alex Liao, @alexliao / Translated by Hiroshi SHIBATA [@hsbt](http://twitter.com/hsbt), Goh Matsumoto [@urimaro](http://twitter.com/urimaro)*

{% include main-guide-intro.html %}

## アイデアの一覧をデザインしよう

Rails のデフォルトの scaffold で、画面をとても速く構築して、アプリを動くようにしてくれます。一方、デザインは改善の余地があります。このために、もう一度 [Bootstrap](https://getbootstrap.com/docs/5.2/) を使います。独自のコンポーネントやスタイリッシュなリンク、ボタンを作るために既存の Bootstrap のクラスを使います。

`app/views/ideas/index.html.erb` をテキストエディタで開いて、以下の内容ですべてを置き換えます。

{% highlight erb %}
<p style="color: green"><%= notice %></p>

<h1>Ideas</h1>
<%= link_to "Add a new idea", new_idea_path, class: "btn btn-primary mb-3" %>

<div class="list-group w-auto">
  <% @ideas.each do |idea| %>
    <%= render idea %>
  <% end %>
</div>
{% endhighlight %}

これだけで必要なデザインがすべてそろう訳ではありませんが、あっという間に、すべてのアイデアを素敵な一覧で表示できるようになります。画面上部に、「Add a new idea」というラベルの新しい青いボタンが表示されます。

`app/views/ideas/_idea.html.erb` をテキストエディタで開いて、以下の内容ですべてを置き換えます。

{% highlight erb %}
<div id="<%= dom_id idea %>" class="list-group-item list-group-item-action d-flex gap-3 py-3">
  <div class="d-flex flex-column gap-2 w-100">
    <h2><%= link_to idea.name, idea_path(idea) %></h2>
    <p><%= idea.description %></p>
    <small class="opacity-50 text-nowrap">Last updated <%= time_ago_in_words idea.updated_at %></small>
  </div>
  <%= image_tag(idea.picture_url, width: 150, height: 150, class: "img-thumbnail flex-shrink-0") if idea.picture? %>
</div>
{% endhighlight %}

これにより、一覧の各アイデアには、詳細画面へのリンクになった名前が表示され、最終更新日時、アイデアの説明、アップロードした画像のサムネイルが表示されます。

<http://localhost:3000/ideas> を表示して、アイデアアプリの新しいデザインを確認してみましょう。

{% coach %}
1行ずつデザインの仕組みを説明しましょう。HTMLとは何か、CSSとは何か、どの部分が Bootstrap なのか。
{% endcoach %}

## 詳細画面をデザインしよう

アイデアのタイトルをクリックすると、アイデアの詳細画面を見ることができます。部分的にRails によって作られた scaffold ページが使われたままになっていて、今はちょっと壊れたように見えるかもしれません。さあ、これをもっとよくしてみましょう。

`app/views/ideas/show.html.erb` をテキストエディタで開いて、以下の内容ですべてを置き換えます。

{% highlight erb %}
<p style="color: green"><%= notice %></p>

<div id="<%= dom_id @idea %>" class="d-flex gap-3 py-3">
  <div class="d-flex flex-column gap-2 w-100">
    <h1><%= @idea.name %></h1>
    <p><%= @idea.description %></p>
    <small class="opacity-50 text-nowrap">Last updated <%= time_ago_in_words @idea.updated_at %></small>
  </div>
  <%= image_tag(@idea.picture_url, width: 150, height: 150, class: "img-thumbnail flex-shrink-0") if @idea.picture? %>
</div>

<div class="d-flex gap-3 py-3">
  <%= link_to "Edit this idea", edit_idea_path(@idea), class: "btn btn-primary" %>
  <%= link_to "Back to ideas", ideas_path, class: "btn btn-outline-secondary" %>
  <%= button_to "Destroy this idea", @idea, method: :delete, class: "btn btn-danger", form: { data: { turbo_confirm: "Are you sure?" } } %>
</div>
{% endhighlight %}

アイデアの一覧画面と同じように、新しいページはずっとよく見えるはずです。また、アイデアに対して行える操作は、アイデアの詳細の下にわかりやすいボタンで表示されます。

{% coach %}
1行ずつデザインの仕組みを説明しましょう。HTMLとは何か、CSSとは何か、どの部分が Bootstrap なのか。
{% endcoach %}

## 参考資料

ページをデザインするのに使った Bootstrap のコンポーネントは以下のとおりです。より深く学ぶためにドキュメント確認してみましょう。

- [Bootstrap list groups](https://getbootstrap.com/docs/5.2/components/list-group/)
- [Bootstrap buttons](https://getbootstrap.com/docs/5.2/components/buttons/)
- [Bootstrap images](https://getbootstrap.com/docs/5.2/content/images/)

## 次は？

目を引くようなデザインやスタイルでしたか？あなたの内なるデザイナーを解き放ち、より多くのページをデザインしたいですか？

* `app/views/ideas/_form.html.erb` にあるアイデアを登録するフォームをデザインするために新しい知識を使ってみましょう。
* お好みで他のページももっとデザインしてみましょう。
