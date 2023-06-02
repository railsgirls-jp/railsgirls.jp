---
layout: main_guide
title: はじめてのアプリを作る
permalink: app
---

# はじめてのアプリを作る

*Created by Vesa Vänskä, [@vesan](https://twitter.com/vesan)*

{% include main-guide-intro.html %}

ワークショップへようこそ！ワークショップ当日は、このガイドから始めます。インストールでうまく行かないことがありましたか？もしそうであれば、まずはコーチに相談しましょう。

## コーチからのサポート

以下のボックスが表示されているようなら、コーチに読んでもらい、必要に応じて助けてもらいましょう。

{% coach %}
コーチの皆さん 👋 今日はサポートしてくれて本当にありがとうございます！
{% endcoach %}

## Rubyについて学ぼう

この先のガイドで新しいアプリを作っていくことになります。そのためにRuby on Railsというフレームワークを使っていきます。Railsはプログラミング言語Rubyで作られています。今まで、まったくRubyでプログラムを書いたことがないのであれば、Rubyがどのように動くのかを知るために、[Rails GirlsのためのRubyのガイド](/ruby-intro) を読みましょう。あるいは、先に進む前にちょっと高度な [try.ruby-lang.org](https://try.ruby-lang.org/) というコースに取り組んでみましょう。

## アプリケーションを作る

このガイドではRuby on Railsというフレームワークを使って *railsgirls* という名前のアプリを作っていきます。

まず、Terminal を開いて、以下のコマンドを入力してください。

<div class="os-specific">
  <div class="mac nix">
{% highlight sh %}
mkdir projects
{% endhighlight %}

    <div>
<code>projects</code> ディレクトリが作られたことを確認してみましょう。ディレクトリに含まれるものを一覧で表示する <code>ls</code> というコマンドがあります。このコマンドを実行し、<code>projects</code> が表示されることを確認してください。ここで、今いるディレクトリを <code>projects</code> に変更するため、次のコマンドを実行します:</p>
    </div>

{% highlight sh %}
cd projects
{% endhighlight %}

    <div>
<p><code>ls</code> をもう一度実行すると、空のディレクトリ、あるいはフォルダにいることがわかります。次に <code>railsgirls</code> という名前の新しいアプリを作るために以下のコマンドを実行します:</p>
    </div>

{% highlight sh %}
rails new railsgirls
{% endhighlight %}

    <div>
<p>このコマンドは <code>railsgirls</code> というフォルダの中に新しいアプリを作ります。このため、また以下のコマンドを実行して、ディレクトリをRailsアプリの中に変更します:</p>
    </div>

{% highlight sh %}
cd railsgirls
{% endhighlight %}

    <div>
<p>ディレクトリの中で <code>ls</code> を実行すると、<code>app</code> や <code>config</code> といったフォルダが表示されるはずです. そして以下のコマンドでRailsアプリを起動できます:</p>
    </div>

{% highlight sh %}
rails server
{% endhighlight %}
  </div>

  <div class="win">
{% highlight sh %}
mkdir projects
{% endhighlight %}

    <div>
<code>projects</code> ディレクトリが作られたことを確認してみましょう。ディレクトリに含まれるものを一覧で表示する <code>dir</code> というコマンドがあります。このコマンドを実行し、<code>projects</code> が表示されることを確認してください。ここで、今いるディレクトリを <code>projects</code> に変更するため、次のコマンドを実行します:</p>
    </div>

{% highlight sh %}
cd projects
{% endhighlight %}

    <div>
<p><code>dir</code> をもう一度実行すると、空のディレクトリ、あるいはフォルダにいることがわかります。次に <code>railsgirls</code> という名前の新しいアプリを作るために以下のコマンドを実行します:</p>
    </div>

{% highlight sh %}
rails new railsgirls
{% endhighlight %}

    <div>
<p>このコマンドは <code>railsgirls</code> というフォルダの中に新しいアプリを作ります。このため、また以下のコマンドを実行して、ディレクトリをRailsアプリの中に変更します:</p>
    </div>

{% highlight sh %}
cd railsgirls
{% endhighlight %}

    <div>
<p>ディレクトリの中で <code>dir</code> を実行すると、<code>app</code> や <code>config</code> といったフォルダが表示されるはずです. そして以下のコマンドでRailsアプリを起動できます:</p>
    </div>

{% highlight sh %}
rails server
{% endhighlight %}
  </div>
</div>

自分のパソコン上のブラウザで <http://localhost:3000> にアクセスしてください。リンクをクリックすると新しいタブが開き、アドレスバーに `localhost:3000` と表示されます。クラウドサービスを使っている場合は(例 Replit)、代わりにプレビュー機能を使ってください(詳細は [インストールガイド](/install/replit) を参照してください)。

Railsロゴの画面が表示されれば、さきほど作ったアプリは正しく動作しています。`rails new` ジェネレーターは、始めるのに必要なアプリのコードをたくさん生成しましたが、このワークショップの残りの中で変更していきます。

ターミナルのウィンドウにコマンドプロンプトが見当たらないことに注意してください。なぜならRailsサーバが起動しているからです。コマンドプロンプトはこのように表示されますが、あなたのノートパソコンでは違っているかもしれません。

<div class="os-specific">
  <div class="mac nix">
{% highlight sh %}
$
{% endhighlight %}
  </div>
  <div class="win">
{% highlight sh %}
>
{% endhighlight %}
  </div>
</div>

コマンドプロンプトが表示されていないときは、新しいコマンドは実行できません。`cd` や他のコマンドを実行しようとしても動作しません。同じターミナルウィンドウで、Railsサーバを止めたり、通常のコマンドプロンプトに戻す場合は、Terminalで Commandキーを押しながら、Cを押して( <kbd>Ctrl</kbd>+<kbd>C</kbd> )、Railsサーバを終了します。

{% coach %}
- それぞれのコマンドが何をするのか明確になっているか確認してください。 `cd`, `dir`/`ls`, `mkdir`
- `rails new` によって何が生成されるのか簡潔に説明してください
- `rails server`コマンドが何をするのか、なぜそれが必要なのかを簡単に説明してください
- どうやってサーバを止めるのか簡潔に説明してください

Resources: Guide to the Guide [creating the application](https://guides.railsgirls.com/guide-to-the-guide#1_create_the_application), Rails Guides [rails new](https://guides.rubyonrails.org/getting_started.html#creating-the-blog-application)

{% endcoach %}

## Idea の scaffold を作る

今あなたは自分のアプリを持っています。でも、このアプリはまだ何もしません。Railsのロゴを表示するだけです。

次に、一覧を表示したり、追加、削除、編集、閲覧できるようにするための出発点(この場合は *ideas* の出発点)を作るために、Railsのscaffoldという機能を使います。
次のコマンドをターミナルで実行してください:

{% highlight sh %}
rails generate scaffold idea name:string description:text picture:string
{% endhighlight %}

{% coach %}
- Railsのscaffoldが何なのか説明してください。どのようにしてアプリのパーツを素早く作るのを助けてくれるのでしょうか？
- `rails generate scaffold` というコマンドと、それがどのように動くのかを簡潔に説明してください。引数は何を意味しているのでしょうか？
    - モデル名の引数は何ですか？
    - `name:string` を使ってデータベースのフィールドをどう指定したのでしょうか？その部分は何を意味しているのでしょうか？

Resource: Guide to the guide [scaffolding](https://guides.railsgirls.com/guide-to-the-guide#2_create_idea_scaffold)
{% endcoach %}

scaffold は新しいファイルをプロジェクトのディレクトリに追加しますが、きちんと動作させるためには、他の2つのコマンドを実行して、データベースを更新し、サーバを再起動する必要があります。

{% highlight sh %}
rails db:migrate
rails server
{% endhighlight %}

{% coach %}
データベースマイグレーションとはなんでしょうか？なぜ、それが必要なのでしょうか？

Resource: Guide to the guide [scaffolding](https://guides.railsgirls.com/guide-to-the-guide#2_create_idea_scaffold) or Rails Beginner [rails commands](https://www.pragtob.info/rails-beginner-cheatsheet#rails-commands)
{% endcoach %}

ブラウザで [http://localhost:3000/ideas](http://localhost:3000/ideas) にアクセスしてください。(Replit のような)クラウドサービスを使っている場合は、代わりにプレビュー用のURLの末尾に `/ideas` を加える必要があります(詳細は [インストールガイド](/install/replit) 参照)。

いろいろクリックしてみたり、これらの少ないコマンドラインのコマンドを実行して得られたものをテストしてみましょう。新しいアイデアを作ったり、閲覧、編集、削除(破壊)できるはずです。

## routesを調整する

[http://localhost:3000](http://localhost:3000) (あるいはプレビュー用のURL) にアクセスしてください。Railsのロゴしかないページが表示されると思います。ideas ページにリダイレクトするようにしましょう。

ファイル `config/routes.rb` をテキストエディタで開いてください。最初の行の次に以下のコードを追記し、保存してください:

{% highlight ruby %}
root to: redirect("/ideas")
{% endhighlight %}

ルートパス([http://localhost:3000](http://localhost:3000) あるいはプレビュー用のURL)をブラウザで表示して変更点を確認しましょう。ルートパスにアクセスするとideasの一覧ページが表示されるはずです。ブラウザのアドレスバーにあるラベルは、自動的に [http://localhost:3000/ideas](http://localhost:3000/ideas) に変わるはずです。

## 次は？

はじめてのアプリを作りました！おめでとうございます！

ここから、HTMLとCSSでデザインを改善し、ページを追加し、画像をアップロードできるようにし、あなたのアプリを他の人も見れるようにインターネットに公開し、コードを他の人にシェアし、コメントを残せるようにするなど、このアプリに取り組み続けていきます。

このガイドで行った手順について、コーチと話してみましょう。手順について質問はありませんか？次のガイドに進む前に質問しておきましょう。
