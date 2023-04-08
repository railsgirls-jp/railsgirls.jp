---
layout: default
title: Rails Girls アプリ・チュートリアル
permalink: app
---

# Rails Girls アプリ・チュートリアル

*Created by Vesa Vänskä, [@vesan](https://twitter.com/vesan)*

**まず、Railsがインストールされていることを確認してください。** [**もしくはこちらのリンクを見てインストールしてください。**](/install)

## ツールを知る

### <i class="icon-text-editor">&nbsp;</i> テキストエディタ

[Visual Studio Code](https://code.visualstudio.com/), [Sublime Text](http://www.sublimetext.com), Vim や Emacs は、テキストエディタの例です。コードを書いたりファイルを編集したりすることができます。

### <i class="icon-prompt">&nbsp;</i> ターミナル (Windows の場合はコマンドプロンプト)

rails serverを起動したりコマンドを実行したりするものです。

### <i class="icon-browser">&nbsp;</i> Webブラウザ (Firefox, Safari, Chrome)

アプリケーションを表示するためのものです。

## *1.*アプリケーションを作る

*railsgirls* という名前の Rails アプリを作っていきます。

まず、Terminal を開いてください。

* macOS: Spotlightで *Terminal* と入力して出てきた Terminal をクリックしてください。
* Windows(WSLの方向け): スタートメニューをクリックして、すべてのプログラムから *Ubuntu* を探し、クリックしてください。(みつからない場合は、「プログラムとファイルの検索」へ *Ubuntu* を入力し検索してください。)
  * WSL上の `/mnt/c` ディレクトリは、Windows上の `Cドライブ` にあたります。*/mnt/c* に移動してから以降のコマンドを入力してください。
* Windows(WSLが使えない方向け): スタートメニューをクリックして、すべてのプログラムから *Rubyx.x.x-x64 with MSYS2* を探し、*Start Command Prompt with Ruby*をクリックしてください。(みつからない場合は、「プログラムとファイルの検索」へ *Start Command Prompt with Ruby* を入力し検索してください。)
* Linux (Ubuntu/Fedora): Dashホームで *Terminal* を探して、*Terminal* をクリックしてください。
* クラウドサービス(Nitrousなど): 作成したアカウントでログインし、box が起動した状態で IDE 画面へ移動します。(詳細は [インストール・レシピ](/install#using-a-cloud-service) を参照してください。) ターミナルはブラウザの下部に表示されます。

そして、Terminal上で次のコマンドを入力します:

{% highlight sh %}
mkdir projects
cd projects
rails new railsgirls
cd railsgirls
rails server
{% endhighlight %}

自分のパソコン上のブラウザで <http://localhost:3000> にアクセスしてください。(Nitorous.IOなどのクラウドサービスの場合は、```rails server -b 0.0.0.0```を実行してサーバを起動し直した後でURLをアドレス欄に入力する代わりに、メニューから 'preview' - 'port 3000' を選んでください。詳細は [インストール・レシピ](/install#using-a-cloud-service) を参照してください。)

Railsロゴの画面が表示されれば、さきほど作ったアプリは正しく動作しています。

Terminal 上で CTRL-C（CTRL(Control)キーとCを同時に押す)を実行してサーバを終了します。(WindowsでCTRL-Cで終了しない場合は、CTRL-PAUSEを試してください。)

**Coachより:** それぞれのコマンドが何なのか説明してみましょう。何が生成されましたか？そしてサーバーは何をしますか？


## *2.*Idea の scaffold をする

Rails の scaffold 機能を使って、list, add, remove, edit, view を生成します。これが Rails アプリの最初の一歩です。
ここでは ideas という名前で作ります。

**Coachより:** scaffold とはなんでしょう？ (コマンドの説明をしてください。1. ただのコマンド, 2. モデル名でDBテーブルと関係があるもの;命名規約, 3. 属性や型) また、migration 機能が何で、なぜ必要なのか。

{% highlight sh %}
rails generate scaffold idea name:string description:text picture:string
{% endhighlight %}

scaffold は新しいファイルをプロジェクトのディレクトリに追加しますが、意図したように動作させるためには以下の 2 つのコマンドを実行してデータベースの更新と Rails server プロセスをリスタートする必要があります。

{% highlight sh %}
rails db:migrate
rails server
{% endhighlight %}

ブラウザで [http://localhost:3000/ideas](http://localhost:3000/ideas) にアクセスしてください。(Nitrous のようなクラウドサービスの場合は、```rails server -b 0.0.0.0```を実行してサーバを起動し直してメニューから 'preview' - 'port 3000' を選び、アドレス欄の末尾に '/ideas' を加えてアクセスしてください。詳細は [インストール・レシピ](/install#using-a-cloud-service) を参照してください。)

いろいろクリックしてみたりしたら、 CTRL-C を押して、サーバを終了します。(WindowsでCTRL-Cで終了しない場合は、CTRL-PAUSEを試してください。)

## *3.*デザインする

**Coachより:** HTML と Railsの関係について話してみましょう。views のどの部分が HTML で、どこが Embedded Ruby (ERB)ですか？どうやってこれらが MVC (モデルとコントローラが、動的に HTML や views を生成するロジックを管理しているもの) と関連づけられていますか？

そのままのデザインはイケてないので、何かやってみましょう。Twitter Bootstrapフレームワークを使うと、ホント簡単に、いい感じのスタイルに変えられます。

テキストエディタで `app/views/layouts/application.html.erb` (Windowsの場合  `app¥views¥layouts¥application.html.erb`) を開くと、次の行があります。

{% highlight erb %}
<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
{% endhighlight %}

この1行前に次のタグを追記してください。

{% highlight erb %}
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
{% endhighlight %}

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

次に、ナビゲーションバーとフッターをレイアウトに追加してみましょう。同じファイルの`<body>`の直後に以下を追加してください。

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

さらに、`</body>` の直前に以下を追加してください。

{% highlight erb %}
<footer class="mt-5 text-center">
  <div class="container">
    Rails Girls <%= Time.now.year %>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
{% endhighlight %}

ここで、ideasの一覧のスタイルも変更してみましょう。`app/assets/stylesheets/application.css` を開いて、コードの一番下に次のcssを追加しましょう。


{% highlight css %}
#ideas > div {
  border-top: 1px solid #c0c0c0;
  margin-top: 30px;
  padding-top: 30px;
}
{% endhighlight %}

ファイルがきちんと保存されたことを確認して、何が変わったのかを見るためにブラウザを更新してみましょう。
さらに、HTMLとCSSに変更を加えることもできます。

**Coachより:** CSSとレイアウトについてちょっと話をしてください。

## *4.*写真アップロード機能を追加する

Rails にファイルをアップロードする機能を追加するには、ライブラリをインストールする必要があります。

プロジェクトディレクトリ内の `Gemfile` を開いて、この行

{% highlight ruby %}
gem "sqlite3"
{% endhighlight %}

の直後に、次の一行を追加します。

{% highlight ruby %}
gem "carrierwave"
{% endhighlight %}

**Coachより:** 何のライブラリがあって、なぜ便利なのかを説明してください。オープンソースソフトウェアが何なのかも説明してください。

サーバーを終了するためには、`CTRL-C`を押します。

Terminal で、次のコマンドを実行してください:

{% highlight sh %}
bundle
{% endhighlight %}

そうすると、次のコマンドでアップロードを実行するコードを生成できます:

{% highlight sh %}
rails generate uploader Picture
{% endhighlight %}

それでは、Railsのサーバーを起動してみましょう。

**ノート**: 人によっては、コマンドを入力する用のTerminalとは別のTerminalでRailsのサーバを動かしているかもしれません。
もしそうなら、**Railsのサーバープロセスを再起動する**必要があります。

`app/models/idea.rb` を開いて、次の行

{% highlight ruby %}
class Idea < ApplicationRecord
{% endhighlight %}

の直後に、

{% highlight ruby %}
mount_uploader :picture, PictureUploader
{% endhighlight %}

を追加します。さらに、`app/views/ideas/_form.html.erb` を開いて次のように編集します。

{% highlight erb %}
<%= form.text_field :picture %>
{% endhighlight %}

&nbsp;&nbsp;&#8595;

{% highlight erb %}
<%= form.file_field :picture %>
{% endhighlight %}

場合によっては、 *TypeError: can't cast ActionDispatch::Http::UploadedFile to string* というエラーが起きることもあります。エラーになった場合は、 `app/views/ideas/_form.html.erb` の

{% highlight erb %}
<%= form_with(model: idea) do |form| %>
{% endhighlight %}

上記のコードを、以下のように変更してみてください。

{% highlight erb %}
<%= form_with(model: idea, html: {multipart: true}) do |form| %>
{% endhighlight %}

画像をアップロードするとわかりますが、これだけでは見栄えのいいものではありません。ファイルのpathだけを表示してるので、これもいじってみましょう。

`app/views/ideas/_idea.html.erb` (`app/views/ideas/show.html.erb` で呼び出している部分テンプレート) を開いて編集します。

{% highlight erb %}
<%= idea.picture %>
{% endhighlight %}

&nbsp;&nbsp;&#8595;

{% highlight erb %}
<%= image_tag(idea.picture_url, width: 600) if idea.picture.present? %>
{% endhighlight %}


**Coachより:** HTML についてちょっと話してください。


## *5.*routes を調整する

<http://localhost:3000> を開いてみてください(クラウドサービスの場合は preview してください)。まだデフォルトページが見えると思います。ideas ページにリダイレクトするようにしましょう。

`config/routes.rb` を開いて、最初の行の次に以下のコードを追記してください:

{% highlight ruby %}
root to: redirect('/ideas')
{% endhighlight %}

ルートパス(<http://localhost:3000/> またはクラウドサービスの場合は preview )をブラウザで表示して変更点を確認しましょう。

**Coachより:** routes について話してください。

## アプリにページを追加する

アプリに開発者(あなたです！)の情報を表示できるようにページを追加してみましょう。

{% highlight sh %}
rails generate controller pages info
{% endhighlight %}

このコマンドはプロジェクトの `app/views` 以下に `/pages` へのアクセスに対応するための新しいディレクトリを追加します。そこに `info.html.erb` という名前のあなたの情報のためのページが作られます。

また、以下のシンプルなルーティングも routes.rb に追加されます。

{% highlight ruby %}
get "pages/info"
{% endhighlight %}

それでは、プロジェクトの `app/views/pages/info.html.erb` をテキストエディタで開いてあなたの情報を HTML で追記しましょう。その後はブラウザで [http://localhost:3000/pages/info](http://localhost:3000/pages/info) を開いて(またはクラウドサービスでは preview してアドレス欄の末尾に '/pages/info' を加えてアクセスして) 作成したページを確認してみましょう。

## 次は？

* HTML や CSS を使ってデザインを追加しましょう。
* アイデアの素晴らしさ評価値の項目を追加しましょう。
* CoffeeScript (or JavaScript) を使って動きをつけてみましょう。
* 写真のロードを早くするために、適切な写真のリサイズ機能を追加しましょう。


## その他の手引き

* Guide 0: [Handy cheatsheet for Ruby, Rails, console etc.](https://github.com/PragTob/rails-beginner-cheatsheet)
* Guide 1: [Add commenting by Janika Liiv](/commenting)
* Guide 2: [Put your app online with Heroku by Terence Lee](/heroku) / [Put your app online with OpenShift by Katie Miller](/openshift) / [Put your app online with Shelly Cloud](/shellycloud) / [Put your app online with anynines](/anynines) / [Put your app online with Trucker.io](/trucker)
* Guide 3: [Create thumbnail images for the uploads by Miha Filej](/thumbnails)
* Guide 4: [Add design using HTML &amp; CSS by Alex Liao](/design)
* Guide 5: [Add Authentication (user accounts) with Devise by Piotr Steininger](/devise)
* Guide 6: [Adding profile pictures with Gravatar](/gravatar)
* Guide 7: [Test your app with RSpec](/testing-rspec)
* Guide 8: [Continuous Deployment with Travis-CI](/continuous-travis) / [Continuous Deployment with Codeship](/continuous)
* Guide 9: [Go through additional explanations for the App by Lucy Bain](https://github.com/lbain/railsgirls)
* Guide 10: [Adding a back-end with Active Admin](/backend-with-active-admin)
