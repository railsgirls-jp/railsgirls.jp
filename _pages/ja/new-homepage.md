---
layout: main_guide
title: 新しいホーム画面を追加しよう
description: "あなたのアプリのホーム画面をカスタマイズしましょう。"
permalink: new-homepage
---

# 新しいホーム画面を追加しよう

{% include main-guide-intro.html %}

このガイドでは、新たに別のページを追加します。追加したページは新しいホーム画面になります。<http://localhost:3000> にアクセスしてアプリを開いた時に最初に表示されるページです。Railsのコントローラ、ビュー、ルーティングがどのように機能するかを知っている場合は、このガイドを読み飛ばしてかまいません。

前回のガイドで、「pages」コントローラはすでに生成されているため、再度コントローラの生成を行う必要はありません。もしやろうとした場合はRailsに止められます。今回は、手動でビューのページを追加する必要があります。

## 新しいビューを追加しよう

それではまず、新しいページを独自に追加しましょう。ターミナルで以下のコマンドを実行し、ページのコンテンツを表示するための新たな「ビュー」ファイルを追加します。

<div class="os-specific">
  <div class="mac nix">
{% highlight sh %}
touch app/views/pages/homepage.html.erb
{% endhighlight %}
  </div>
  <div class="win">
{% highlight sh %}
ni app/views/pages/homepage.html.erb
{% endhighlight %}
  </div>
</div>

次に、新しく作成した`app/views/pages/homepage.html.erb`ファイルをテキストエディタで開きましょう。

そこに以下のようなコンテンツを追加して、ファイルを保存します。

{% highlight erb %}
<div class="px-4 py-5 my-5 text-center">
  <h1 class="display-5 fw-bold">The ideas app</h1>
  <div class="col-lg-6 mx-auto">
    <p class="lead mb-4">Welcome to my ideas app!</p>
  </div>
</div>
{% endhighlight %}

## ルーティングを設定しよう

追加したページをいつ表示するかをRailsに指示するために、テキストエディタで`config/routes.rb`ファイルを開き、以下の箇所を編集します。

{% highlight ruby %}
root to: redirect("/ideas")
{% endhighlight %}

上記を以下に変更して、ファイルを保存します。

{% highlight ruby %}
root "pages#homepage"
{% endhighlight %}

アプリのルートパスである<http://localhost:3000>にアクセスすると、新しいホーム画面が表示されるはずです！

## ナビゲーションバーを更新しよう

最後に、ナビゲーションバーから新しいルートページにアクセスできるようにするために、`app/views/layouts/application.html.erb`ファイルをテキストエディタで開いてください。
以下の行の上に

{% highlight erb %}
<li class="nav-item">
  <a class="nav-link <%= 'active' if current_page?(controller: 'ideas') %>" href="/ideas">Ideas</a>
</li>
{% endhighlight %}

以下のリンクを新たに追加し、ファイルを保存します。

{% highlight erb %}
<li class="nav-item">
  <a class="nav-link <%= 'active' if current_page?(controller: 'pages', action: 'homepage') %>" href="/">Home</a>
</li>
{% endhighlight %}

ブラウザでページを更新し、「The ideas app」のリンクをクリックすると、新しいホーム画面が表示されます。ナビゲーションバーにあるすべてのリンクを試してみてください。思ったとおりのページにたどり着けますか？
