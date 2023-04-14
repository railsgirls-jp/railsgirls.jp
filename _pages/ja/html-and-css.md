---
layout: main_guide
title: HTMLとCSSを使ってアプリをスタイリングしよう
description: "Bootstrapを導入し、HTMLとCSSであなたのアプリの見た目を変更しましょう"
permalink: html-and-css
---

# HTMLとCSSを使ってアプリをスタイリングしよう

{% include main-guide-intro.html %}

現在のアプリは、白地に黒文字のシンプルな状態で、見た目が良いとは言えません。HTMLとCSSを使って、この点を改善しましょう！

## HTMLとは?

HTML（HyperText Markup Language）は、アプリのコンテンツの構造を作るために使います。ウェブサイト上の見出し、リスト、テーブル、リンクなどが何であるかをブラウザに伝える役割を担っています。[前のガイド](/app)で生成されたファイルもHTMLで構成されており、さらに拡張するためにRubyのコードを追加しています。

`app/views/ideas/index.html`ファイルを開くと、以下が表示されるでしょう。例えばこのファイルの `<div>` タグで始まる部分はHTMLタグの開始を表し、スラッシュ記号で始まる部分 `</div>` はHTMLタグの終了を表します。このHTMLタグに対して `style`、`id`、`class` などのあらゆるプロパティを追加することができます。

{% highlight erb %}
<h1>Ideas</h1>

<div id="ideas">
  <% @ideas.each do |idea| %>
    <%= render idea %>
  <% end %>
</div>
{% endhighlight %}

また、ファイル内には `<%`、`<%=`、`%>` というコードで示される、特殊な部分があります。これはHTMLによく似ていますが、そうではありません。この部分はRubyのコードとして実行され、あなたがアプリのデータベースに追加したデータ（今回の場合はひとつ前のガイドで作成したideaアプリに対するデータ）を、動的にHTMLに表示させるためのものです。

{% coach %}
HTMLとRailsの関係について話しましょう。

- HTMLとは何かをもう少し説明して、いくつかの例（このウェブサイトのソースコードなど）を挙げてみましょう。
- Railsのビューのどの部分がHTMLでしょうか、また、Embedded Ruby（ERB）とは何でしょうか？
- Model View Controllerとは何でしょうか、また、どのような関係性でしょうか？
    - モデルとコントローラは、HTMLビューを生成する役割を担っています。
{% endcoach %}

## CSSとは?

CSS（Cascading Style Sheets）を利用すると、HTMLがどのように見えるか、要素にどんなテキストや背景色が必要か、どんなフォントを使うか、どんなサイズか、ページ内のどこにあるかなどを指定することができます。

このガイドでは、アプリのスタイルを決めるために自分でCSSを記述するのではなく、[Bootstrap](Bootstrap)というフレームワークを導入します。Bootstrapは、CSSのフレームワークを提供し、あなたのアプリにスタイル、デザインを適用します。HTMLに適用できる多くのCSSクラスが用意されているため、手軽に導入することができます。

CSSについてもっと知りたい方は、このワークショップの後、[CSSのチュートリアル](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started)をご覧になることをお勧めします。

[Bootstrap]: https://getbootstrap.com

{% coach %}
HTML、CSS、Railsの関係について話しましょう。

- Bootstrapはどのように動作し、どのようにアプリのページをスタイリングするのでしょうか？
- [Bootstrapの例](https://getbootstrap.com/docs/5.2/examples/)をいくつか簡単に紹介し、Bootstrapのようなフレームワークを使うことで何が実現できるかを紹介しましょう。
{% endcoach %}

## アプリのスタイリングに役立つBootstrapを導入しよう

Bootstrapはいくつかの異なるパーツから構成されていますが、最初に使用するのはCSSです。そのためには、アプリのHTMLに対して何行かのコードを追加する必要があります。具体的には、レイアウトのファイルに対してです。レイアウトファイルは、Railsのすべてのビューに対して共通のレイアウトパーツを提供します。これにより、すべてのページで同じ基本レイアウトとCSSが読み込まれるようになります。

テキストエディターで `app/views/layouts/application.html.erb` ファイルを開きます

{% highlight erb %}
<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
{% endhighlight %}

上記が記述されている1行前に次のタグを追記してください。

{% highlight erb %}
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
{% endhighlight %}

これは、インターネット上のサーバーからBootstrapを読み込んでいます。そのため、使用する前にローカルにインストールする必要がありません。

そして、この部分、

{% highlight erb %}
<%= yield %>
{% endhighlight %}

これを次のように置き換えてください。

{% highlight erb %}
<div class="container">
  <%= yield %>
</div>
{% endhighlight %}

ブラウザでアプリを更新しましょう。アプリの見た目が少し良くなり、コンテンツが前面中央に表示されています。あなたのアプリには、BootstrapのCSSを使ったスタイリングが反映されています。

## ナビゲーションバーを追加しよう

ユーザーインターフェース（UI）がほとんどないWebサイトでは、迷子になりがちです。ナビゲーションバーとフッターをレイアウトに追加して、よりアプリのような外観にし、ページを探せるようにしましょう。
同じファイルの`<body>`の直後に以下を追加してください。これにより、アプリにナビゲーションバーが追加されます。

{% highlight erb %}
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">The idea app</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link <%= 'active' if current_page?(controller: 'ideas') %>" href="/ideas">Ideas</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
{% endhighlight %}

さらに、ファイル末尾の `</body>` の直前に以下を追加してください。`<footer></fotter>` 部分により、「Rails Girls」というフッターと現在の年が追加され、`<script></script>` 部分によってナビゲーションバーを機能させるために必要なBootstrap JavaScriptを読み込んでいます。

{% highlight erb %}
<footer class="mt-5 text-center">
  <div class="container">
    Rails Girls <%= Time.now.year %>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
{% endhighlight %}

ファイルがきちんと保存されたことを確認して、何が変わったのかを見るためにブラウザを更新してみましょう。

## さらにスタイリングを追加しよう！

***このステップはオプションです。*** 今後のガイドでは、より多くのスタイリングを更新していきます。次のステップに進みたい場合は、下のリストで次のガイドを開いてください。

あなたがすでにCSSをある程度知っている場合、テキストエディタで`app/assets/stylesheets/application.css`ファイルを開いてHTMLとCSSを編集すると、アプリをさらにスタイリングすることが可能です。また、アプリのスタイリングにBootstrapを使用する方法をさらに得たい場合は、[Bootstrap documentation](https://getbootstrap.com/docs/5.2/getting-started/introduction/)を参照してみましょう。