---
layout: main_guide
title: アプリに新しいページを追加しよう
description: "Railsアプリにページを追加するために、コントローラを生成し、ルーティングを変更しましょう。"
permalink: new-page
---

# アプリに新しいページを追加しよう

{% include main-guide-intro.html %}

アプリに開発者(あなたです！)の情報を表示できるようにページを追加してみましょう。

## 新しいページを生成しよう

ターミナル上で以下のコマンドを実行します。

{% highlight sh %}
rails generate controller pages about
{% endhighlight %}

このコマンドはプロジェクトの `app/views` 以下に `/pages` へのアクセスに対応するための新しいディレクトリを追加します。そこに `about.html.erb` という名前のページが作られます。

`app/views/pages/about.html.erb` ファイルを開きましょう。以下の例のようにHTMLの中に自分に関する情報を追加してください。

{% highlight erb %}
<h1>About me</h1>
<p>Hello there! I am YOUR NAME HERE and this is my amazing app!</p>
{% endhighlight %}

また、先ほどの `rails generate` コマンドを実行したことで、以下のシンプルなルーティングも `config/routes.rb` に追加されます。この設定は、ブラウザからそのURLにアクセスしたときにどのページを表示させるかをRailsに指示しています。

{% highlight ruby %}
get "pages/about"
{% endhighlight %}

新たに作成したaboutページを見るには、ブラウザで <http://localhost:3000/pages/about>（またはプレビューURLに`/pages/about`を追加）にアクセスしてください。あなたが作成した新しいページが表示されるはずです！

{% coach %}
少しだけルーティングについて話をしましょう。Railsが認識するルーティングを `config/routes.rb` ファイルでどのように定義するのでしょうか。アプリ内のすべてのページがこのファイルにルーティングを持つ必要があり、そうでない場合Railsは各ページどのように表示すればよいのかわからないことを説明しましょう。
{% endcoach %}

## ナビゲーションバーにリンクを追加しよう
新しく作成したページが機能することがわかったので、次はナビゲーションバーにリンクを作成して、サイトを訪れた人が該当のページへアクセスできるようにしましょう。そうすることで、そのページの存在を推測して自分で探そうとする必要がなくなります。

テキストエディタで`app/views/layouts/application.html.erb`を開き、以下のHTMLの行の下に追加していきます。

{% highlight erb %}
<li class="nav-item">
  <a class="nav-link <%= 'active' if current_page?(controller: 'ideas') %>" href="/ideas">Ideas</a>
</li>
{% endhighlight %}

新しいページにリンクするためのHTMLを以下のように追加します。

{% highlight erb %}
<li class="nav-item">
  <a class="nav-link <%= 'active' if current_page?(controller: 'pages', action: 'about') %>" href="/pages/about">About</a>
</li>
{% endhighlight %}

ブラウザのページを更新し、新しく作成したリンクをクリックして、動作するかどうかを確認しましょう！これで、1つの統一されたナビゲーションバーから、アプリのideaページとaboutページを行き来できるようになりました。

## 変更点の詳細について

ナビゲーションに新しい `nav item` を追加することで、Bootstrapでスタイルされたナビゲーションバーに新しいリンクが表示されました。このリンクは、新しく追加されたaboutページを指しています。

このリンクは、`a` 要素というリンクのためのHTMLを使うことによって作られます。`href` プロパティを使用して、ブラウザにリンクする場所を指示します（この場合、`/pages/about`）。 `<a ... href="/pages/about">About</a>` リンクの間にある「About」のテキストが、ブラウザを通してページを見る人のためのラベルとして表示されます。

`li` タグに囲まれた中央の `class` プロパティは、リンクがどのように表示されるべきかを示すために使用しています。現在滞在しているページの場合 `class` プロパティに `active` が適用され、現在アクセスしていないページの他のリンクよりも明るい色で表示されます。

各ページが現在滞在されていてアクティブかどうかをチェックするために、Railsは `current_page?` というヘルパーを提供しています。この条件は、例えば滞在しているページがaboutページだった場合に  `controller: 'pages', action: 'about'` と記述されている箇所に一致するため「true」になります。
`controller` と書かれている部分はアプリの `/pages` パス内のすべてのエントリポイントであり、`action` は特定のページ、つまり 今回の例では"about" であることを示しています。

{% coach %}
上記で触れた内容は、HTMLの仕組みと、ERBがブラウザに表示されるHTMLをどのように変更できるかについて、より技術的に詳しく説明しています。もし不明な点があれば、補足説明をお願いします。HTMLとERBのコードを変更することで、ブラウザーに表示されるページがどのように変化するか、デモしてください。
{% endcoach %}

アプリに新しいページを追加しナビゲーションバーを変更する方法を学んだため、 同じように [新しいホームページ](/new-homepage) (次のガイド) をあなたのアプリに追加することが可能です。
