---
layout: default
title: HTML と CSS を使ってデザインを追加しよう
permalink: design-html-css
---

## *1.*header をデザインしよう

`app/assets/stylesheets/application.css` の最後に以下のコードを追加してください。：

{% highlight css %}
.navbar {
  min-height: 38px;
  background-color: #f55e55;
}
{% endhighlight %}

では、ページを更新して変更を確認しましょう。
それから、ヘッダーの色やフォントをいろいろ変えて、試してみましょう。
[http://color.uisdc.com/](http://color.uisdc.com/) では、色のリファレンスを見ることができます。

**コーチより：** `display` プロパティ、そして inline と block 要素について話してみましょう。

次に、これらの行をコードの一番下に追加します。：

{% highlight css %}
.navbar a.brand { font-size: 18px; }
.navbar a.brand:hover {
  color: #fff;
  background-color: transparent;
  text-decoration: none;
}
{% endhighlight %}

**コーチより：** link が持つ、4つの状態について説明してください。


## *2.*table をデザインしよう

table により磨きをかけるために、twitter [Bootstrap](http://www.bootcss.com/) を使います。
この行を `app/views/ideas/index.html.erb` から見つけて、以下のように置き換えてください。：

{% highlight html %}
<table>
{% endhighlight %}

↓

{% highlight html %}
<table class="table">
{% endhighlight %}

以下のコードを使って、画像のサイズを調整しましょう。

{% highlight erb %}
<%= image_tag(idea.picture_url, width: 600) if idea.picture.present? %>
{% endhighlight %}

width を変更してみて、何が起こるか見てみましょう。

`app/assets/stylesheets/ideas.css.scss` の最後に以下のコードを追加しましょう。：

{% highlight css %}
.container a:hover {
  color: #f55e55;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0);
}
{% endhighlight %}

[http://subtlepatterns.com/](http://subtlepatterns.com/) のいくつかのパターンを参考に、`background-image` プロパティを使って、背景のスタイルを追加してみましょう。


## *3.*footer にスタイルを追加しよう

`app/assets/stylesheets/application.css` の最後にこのコードを追加しましょう：

{% highlight css %}
footer {
  background-color: #ebebeb;
  padding: 30px 0;
}
{% endhighlight %}

`footer` にもっとスタイルを追加してみましょう。それから、位置も調整してみましょう。


## *4.*button にスタイルを追加しよう

[http://localhost:3000/ideas/new](http://localhost:3000/ideas/new) を開いて、`Create Idea` ボタンを見つけてください。

`app/assets/stylesheets/ideas.css.scss` にこれらのコードを追加しましょう。

{% highlight css %}
.container input[type="submit"] {
   height: 30px;
   font-size: 13px;
   background-color: #f55e55;
   border: none;
   color: #fff;
 }
{% endhighlight %}

**コーチより：** css の `border` の使い方を説明してください。そして、角を丸くしたり、影や色をつけたりというように、ボタンのスタイルを変えてみましょう。
