---
layout: default
title: Rails Girls Diary tutorial
permalink: diary-app
---

# Ruby on Railsで初めての日記アプリを作る

*Created by Piotr Szotkowski ([chastell](http://chastell.net)) and Tomasz Stachewicz ([tomash](http://tomash.wrug.eu/about.html))* / *翻訳者 Shuto Nakano([shoooout](https://github.com/shoooout))*

RailsというRubyのWeb開発フレームワークを使って簡単な投票アプリを1から作成します。最初のアプリケーションは何にするか考えてみましょう。例えば、ToDoリストや日記など、何らかのコレクションを含むシンプルなものが理想です。ここでは日記をベースにしたアプリケーションを作成します。

__COACH__: この初心者向けチュートリアルの背景については、 [こちら](http://dotclass.org/rails-girls-warsaw-programme/)をご覧ください。


**Railsがインストールされていることを確認してください。** セットアップ方法は[**インストールガイド**](/install) に従ってください。


## ツールについて知る

<div class="indent" markdown="1">

<h3><i class="icon-text-editor">&nbsp;</i></h3>

### テキストエディタ

* [Visual Studio Code](https://code.visualstudio.com/)、[Sublime Text](http://www.sublimetext.com)、Vim、Emacsなどのテキストエディタは、コードを書いたりファイルを編集することができます。

<h3><i class="icon-prompt">&nbsp;</i></h3>

### ターミナル (Windowsのコマンドプロンプト)

* Railsサーバーを起動したり、コマンドを実行する場所です。

<h3><i class="icon-browser">&nbsp;</i></h3>

### Webブラウザ

* Firefox、Safari、ChromeなどのWebブラウザで、作成したアプリケーションを閲覧できます。

__COACH__: インストールを補助してください。テキストエディタが正しく設定されているか確認してください（例：エンコーディングがUTF-8であるか）。

</div>

### 重要事項

使用しているオペレーティングシステムに適した説明を選ぶことが重要です。Windowsコンピュータ上で実行するコマンドは、MacやLinuxのものとは少し異なります。クラウドサービス(例: nitrous)を使用している場合は、WindowsコンピューターであってもLinuxコマンドを実行する必要があります。

## HTML

### ファイルとフォルダ

新しく作成したディレクトリ（フォルダ）の中に`index.html`を作成してください。そして、そのファイルをエディタとブラウザで開いてください。

__COACH__: ローカルファイルはブラウザで開くことができ、URLが通常とは異なることを説明してください。

### HTMLの雛形

`index.html`に以下の記述を追加し、HTMLの雛形を作成します:

{% highlight erb %}
<!doctype html>
<html>
  <head>
    <title>My Little Webapp: Coding Is Magic</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://rawgithub.com/krzysztofbialek/Rails-Girls-Warsaw-App/master/style.css" />
  </head>
  <body>
  </body>
</html>
{% endhighlight %}

__COACH__: `<head>`と`<body>`のHTMLの主な2つのパーツについて説明してください。`<title>`と、必要であれば`<meta>`、`<link>`、`<script>`について簡単に説明してください。参加者が希望が無ければ、BootstrapがあるのでCSSについては省略できます。

### 最初に表示される内容

`<body>`と`</body>`の間にHTMLを追加します(内容は自由に調整してください):

{% highlight erb %}
<h1>My Rails Girls Diary</h1>
<div>
  <h2>Submitted a Rails Girls application</h2>
    <p>1.02.2014</p>
    <p>Just submitted an application to a Rails Girls workshop. Can’t wait to see whether I’ll get in!</p>
    <h2>Got in!</h2>
    <p>15.02.2014</p>
    <p>Received an email that my application got accepted! I’ll be at a RG workshop next week!</p>
  <h2>The first day starts…</h2>
    <p>22.02.2014</p>
    <p>Today is the first day of the Rails Girls workshop. My coach is quite strange but it seems we all have Rails installed now and can start learning.</p>
</div>
{% endhighlight %}

これらがあなたの最初の3つの日記です。繰り返しの構成や、タグが違うとどのように表示されるのかに注目してください。

__COACH__: HTMLタグとその意味について簡単に説明してください。

### HTMLを追加する

先ほど`index.html`に追加したものの前後どちらかに以下を追加する（これも好みで調整してください）:

{% highlight erb %}
<div>
  <h1>My favourite websites</h1>
  <ul>
    <li><a href="http://railsgirls.com">Rails Girls</a></li>
    <li><a href="https://en.wikibooks.org/wiki/Ruby_Programming">Wikibooks</a></li>
    <li><a href="http://guides.rubyonrails.org">Ruby on Rails Guides</a></li>
  </ul>
</div>
<img src="https://railsgirls.com/images/rg-warsaw.png" />
{% endhighlight %}

これはHTMLの順序なしリストで、各項目には他ページへのハイパーテキスト参照（URL）をもつリンクが貼られています。その後に画像を含む段落があり、画像のソースは指定されたURLにあります。

__COACH__: Webの仕組みと、HTMLの要素や属性について簡単に説明してください。

CSSが適用された、ベースとなるアプリのレポジトリへのリンクは[こちら](https://github.com/krzysztofbialek/Rails-Girls-Warsaw-App)です。

## Railsを使う

__COACH__: もし参加者がWindowsを使用している場合、これより先をベースにしてNitrous.IOを使用することを検討してください。

### Railsアプリケーションを新規作成

ターミナル（Windowsではコマンドプロンプト）を開き、アプリを作成するディレクトリに`cd`コマンドで移動し、`rails new diary`を実行します。（新しいRailsアプリケーションの作成には時間がかかることがあります。）`cd diary`を実行し、作成されたアプリケーションのディレクトリに移動します。

__COACH__: コマンドを実行してディレクトリを移動する方法について説明してください。

### サーバーを起動する

`diary`ディレクトリで`rails server`を実行してサーバーを起動します。サーバーが起動したら、ブラウザで[http://localhost:3000](http://localhost:3000)にアクセスします。「Welcome aboard」のページが表示されます。また、`ctrl-c`を押すことでサーバーを停止できます。

__COACH__: 何が起きたのか、ターミナルの出力はどのようになっているのかを説明してください。JavaScriptのランタイムが原因でサーバーの起動に失敗した場合は、`gem install therubyracer`を実行し、`Gemfile`の該当行のコメントを外してください。

### 最初のルーティングとビュー

コントローラーとルーティングを作成します。

`rails generate controller welcome index`を実行します。これによって、最初のコントローラーとそれへのルーティングが生成されます。
サーバーを起動し、[http://localhost:3000](http://localhost:3000)から`/welcome/index`のルーティングが作られていることを確認してください。

サーバーを停止し、`rake routes`を実行することでアプリケーションのルーティングを確認できます。

__COACH__: URLとURLの階層について説明してください。RailsにおけるURLに対応する裏側でおきていることについて説明してください。

### ビューをトップページにする

`config/routes.rb`を編集し、`root 'welcome#index'`のコメントアウトを削除（先頭の`#`を削除）します。これにより、アプリケーションのルートは`Welcome#index`によってレンダリングされるビューになります。[http://localhost:3000](http://localhost:3000)にアクセスし、アプリケーションのトップページがこのビューになっていることを確認してください。（「Welcome aboard」のページではない）

__COACH__: URLのルートがアプリケーションのメインページになり、ブラウザのアドレスバーにホスト名を入力したときに表示されるページであることを説明してください。

### HTMLを追加する

先ほど作成した`index.html`の`<body>`タグの内容（日記やリンク）をコピーして、`app/views/welcome/index.html.erb`の`<h1>`と`<p>`と置き換えてください。ブラウザを更新すると、ページが正しい内容になっていることを確認してください。

__COACH__: ビューには`<body>`と`</body>`の間の部分しか含まれず、それ以外はアプリケーション全体に共通で、別のファイルで定義されていることを説明してください。

## 繰り返し処理

### 内容を繰り返す

リンクのリストの構造を見てみると、どれも他の項目と似ています。リンクを生のHTMLとして記述するのではなく、抽象化してURLと名前の組み合わせを繰り返し処理することにします。

`<ul>`タグの内容を以下のように書き換えてください:

{% highlight html %}
<%
  @websites = [
    ["http://railsgirls.com", "Rails Girls"],
    ["https://en.wikibooks.org/wiki/Ruby_Programming", "Wikibooks"],
    ["http://guides.rubyonrails.org", "Ruby on Rails Guides"],
  ]
%>
<% for url, name in @websites %>
  <li><a href="<%= url %>"><%= name %></a></li>
<% end %>
{% endhighlight %}

ブラウザを更新すると、先ほどまでと同じように、名前とそのリンクが貼られていることが確認できます。

__COACH__: 配列とは何か、`<%`や`<%=`のERBタグの意味、繰り返し処理の仕組みについて説明してください。

`@websites`配列のように、データをビューで定義できますが、これは長期的に見た時問題になります。まずは`@websites`配列をビューからコントローラーに移動させます。ビューから削除し、`app/controllers/welcome_controller.rb`の`index`メソッドに以下のように追加してください:

{% highlight ruby %}
class WelcomeController < ApplicationController
  def index
    @websites = [
      ["http://railsgirls.com", "Rails Girls"],
      ["https://en.wikibooks.org/wiki/Ruby_Programming", "Wikibooks"],
      ["http://guides.rubyonrails.org", "Ruby on Rails Guides"],
    ]
  end
end
{% endhighlight %}

この`@`で始まる変数はインスタンス変数と呼ばれ、ビューとコントローラーの両方からアクセスできます。ブラウザを更新しても変化しないのはこのためです。

__COACH__: `WelcomeController#index`のアクションとビューの関係について説明してください。`@websites`、`url`、`name`について説明してください。

### モデルを作成する

リンクがviewに直接書かれていたものを修正したので、次は日記の記事についてです。今回は配列のようなRubyの構造体ではなく、日記の記事を表すモデルを作成します。まずはモデルを生成します。`rails generate model Entry title:string date:date contents:text`を実行して、タイトル、日付、内容を扱える`Entry`モデルを作成してください。

__COACH__: モデルとは何なのか、それを生成するための`field:type`の記法について説明してください。必要に応じて、`string`と`text`の違いについても説明してください。

### データベースをマイグレーションする

`rake db:migrate`を実行してデータベースをマイグレーションし、日記の記事のためのテーブルを作成してください。

__COACH__: データベースとは何なのか（抽象的に説明すると、データを保存しモデル構造を提供するためのもの）、なぜ必要なのかについて説明してください。メモリ上にあるものはデフォルトでは永続化されないので、次で書かれているような手法で永続化する必要があることを説明してください。

### Railsコンソールでモデルを操作する

モデルを作成したので、モデルのインスタンスを作成できるようになりました。つまり、日記の記事を作成できるようになりました。そのためにRailsコンソールについて学びます。`rails console`を実行してRailsコンソールを起動し`>>`が表示されたら、次のようにしていくつか記事を作成してください:

{% highlight sh %}
>> Entry.create "title" => "Submitted a Rails Girls application", "date" => Date.new(2014, 2, 1), "contents" => "Just submitted an application to a Rails Girls workshop. Can’t wait to see whether I’ll get in!"
…
>> Entry.create "title" => "Got in!", "date" => Date.new(2014, 2, 15), "contents" => "Received an email that my application got accepted! I’ll be at a RG workshop next week!"
…
>> Entry.create "title" => "The first day starts…", "date" => Date.new(2014, 2, 22), "contents" => "Today is the first day of the Rails Girls workshop. My coach is quite strange but it seems we all have Rails installed now and can start learning."
{% endhighlight %}

Railsコンソールでは、`rails server`と同様に、バックグラウンドで何が起こっているかをログとして表示してくれます。例えば、`Entry.all`を実行すると、すべての記事の配列を取得できます。

__COACH__: 何が起きているのかをゆっくり説明する。

## DBに保存された内容を表示する

### モデルのインスタンスを既存のビューに追加する

`WelcomeController#index`アクション（`app/controllers/welcome_controller.rb`）を編集し、`@websites`を定義した前後に次の行を追加してください:

{% highlight ruby %}
@entries = Entry.all
{% endhighlight %}

`app/views/welcome/index.html.erb`ビューを編集し、日記の記事を表示している部分を次のように置き換えてください:

{% highlight erb %}
<% for entry in @entries %>
  <h2><%= entry.title %></h2>
  <p><%= entry.date %></p>
  <p><%= entry.contents %></p>
<% end %>
{% endhighlight %}

__COACH__: 何が起きたのかを話し合ってください。記事の順番はどのようになっているのか、どのように並び替えることができるのか（日付の降順にするなど）、どこで並び替えるべきかについて話し合ってください。

### 日記の記事を操作するためのコントローラを作成する

モデルができたので、モデルのインスタンスに関連する処理するためのコントローラが必要です。（新しい記事の作成、表示、編集、削除など）。`rails generate controller Entries`を実行してください。これにより、`EntriesController`クラスが生成されます。`rake routes`で確認すると、コントローラを作成するだけでなく、URLをコントローラのアクションに指定する必要があることに気づくと思います。

`config/routes.rb`を編集し、`Diary::Application.routes.draw`ブロックの中に`resources "entries"`を追加してください。再度`rake routes`を実行すると、新しいルートが追加されていることが確認できると思います。

__COACH__: Railsのルートリソースがどのように動作して、URLを作成し、コントローラのアクションにマッピングするのかを説明してください。

### 全ての記事を表示するビューを作成する

`rake routes`の出力を見ると、URLがそれぞれのコントローラのアクションにマッピングされていることがわかります。では、何が足りないのかを確認しましょう。ブラウザで[http://localhost:3000/entries](http://localhost:3000/entries)を開いてください。どうやら`index`アクションがないので追加しましょう。`app/controllers/entries_controller.rb`を開き、クラスの中に次の空のメソッドを追加してください:

{% highlight ruby %}
def index
end
{% endhighlight %}

ブラウザを更新すると、「unknown action」のエラーは出なくなりましたが、「template is missing」のエラーが出るようになりました。`app/views/entries/index.html.erb`という空のファイルを作成し、ブラウザを更新してください。ビューには何も入力していないため空のページが表示されるはずです。

__COACH__: アクションがデフォルトで関連するビューをレンダリングする仕組みを説明してください。

`app/controllers/welcome_controller.rb`ファイルを開き、（`def index`で始まる）`WelcomeController#index`メソッドを探してください。`@entries`変数を定義している行（`@entries =`で始まる行）を、`EntriesController#index`（`app/controllers/entries_controller.rb`にある`EntriesController`の`index`メソッド）にコピーしてください。同様に、`app/views/welcome/index.html.erb`ビューの、`@entries.each`ブロック（インデントされたすべての行と対応する`end`を含む）を`app/views/entries/index.html.erb`ビューにコピーしてください。ブラウザを更新すると、日記の記事の一覧が表示されるはずです。

__COACH__: ほとんど変化が内容に見えるが、重要な変化があることを説明してください。これまではアプリケーションのメインページのコンテキストで動作していましたが、今は日記の記事の一覧のコンテキストで動作しています（例えば、メインページで表示していた他のウェブサイトへのリンクなどはありません）。

### 一つの記事を表示するビューを作成する

`rake routes`を実行すると、`/entries/:id(.:format)`が`entries#show`アクションにマッピングされていることがわかります。一つ目の日記の記事のURLである[http://localhost:3000/entries/1](http://localhost:3000/entries/1)にアクセスしてください。`EntriesController`に`show`アクションがないことに気づくと思います。空のアクションとビューを追加し、ブラウザを更新してください。

__COACH__: 必要であれば、足りないアクションとビューを追加するプロセスを説明してください。`rake routes`の出力を理解することから始めてください。

これでURLの末尾の`1`を解釈して、表示することができるようになりました。`EntriesController#show`アクションを次のように変更してください:

{% highlight ruby %}
def show
  @entry = Entry.find(params["id"])
end
{% endhighlight %}

これは、「`id`パラメータを取得し、`Entry.find`メソッドで該当する記事を見つける」という意味です。次に、`app/views/entries/show.html.erb`ビューを編集し、次のコードを追加してください:

{% highlight erb %}
<h2><%= @entry.title %></h2>
<p><%= @entry.date %></p>
<p><%= @entry.contents %></p>
{% endhighlight %}

[http://localhost:3000/entries/1](http://localhost:3000/entries/1)と[http://localhost:3000/entries/2](http://localhost:3000/entries/2)で表示される内容を比較し、`params['id']`を使用することでどう違いがあるかを確認します。

__COACH__: `rake routes`のURLテンプレートの`:id`部分が、`params`ハッシュのキーになること、`params`ハッシュには他に何が含まれるのかについて説明してください。

### 記事へのリンクを作成する

Run `rake routes` again; notice how the row for the `entries#show` action starts with `entry` in the ‘prefix’ column. Go to the `app/views/entries/index.html.erb` view and change the line responsible for displaying the title to the below:

再度 `rake routes`を実行し、`entries#show`アクションの行は’prefix’列が`entry`で始まっていることを確認してください。`app/views/entries/index.html.erb`ビューに移動し、タイトルを表示する行を以下のように変更してください:

{% highlight erb %}
<h2><%= link_to(entry.title, entry_path(entry)) %></h2>
{% endhighlight %}

表示するテキスト(`entry.title`)とリンク先のパスを2つのパラメータとして受け取る`link_to`メソッドを使用しています。パスは、引数として`entry`を渡して`entry_path`メソッドを呼び出すことで作成されます。

__COACH__: `link_to`メソッドのHTMLがどのようになるかを説明してください。`rake routes`の`entry`プレフィックスと`entry_path`の関係を説明してください。`entry_path`メソッドが`entry`引数を必要とする理由を説明してください。`entry_path`メソッドと異なる`entry_url`メソッドが何をするのかを説明してください。

次に、各記事の画面から全記事の一覧に戻れるようにしてみましょう。`app/views/entries/show.html.erb`テンプレートを編集し、次のように全記事の一覧へのリンクを追加してください:

{% highlight erb %}
<p><%= link_to("Back to all entries", entries_path) %></p>
{% endhighlight %}

`rake routes`の`entries`というプレフィックスが`entries_path`のメソッド名に使用されていることに注目してください。このメソッドはパラメータは必要ありません。

## ビューから記事を作成する

### 「新しい記事」のフォームを追加する

全記事の一覧と1つの記事を表示できるようになったため、新しい日記の記事を作成できるようにしましょう。`rake routes`を実行し、新しい記事の作成を担当するURLとアクションを確認してください。

全記事の一覧に移動し、新しい記事を作成するためのリンクを追加してください:

{% highlight erb %}
<%= link_to("New entry", new_entry_path) %>
{% endhighlight %}

リンクをクリックすると、アクションとビューが不足しているエラーが表示されます。

__COACH__: この過程をここでしっかりと理解させてください。

`app/views/entries/new.html.erb`ビューを作成し、以下のコードを追加してください:

{% highlight erb %}
<%= form_for(Entry.new) do |form| %>
  <p><%= form.label("title") %></p>
  <p><%= form.text_field("title") %></p>
  <p><%= form.label("contents") %></p>
  <p><%= form.text_area("contents") %></p>
  <p><%= form.submit %></p>
<% end %>
<p><%= link_to("Back to all entries", entries_path) %></p>
{% endhighlight %}

**Note:** ここではlabelについては省略する

__COACH__: `form_for`のヘルパーが生成するHTMLは、どのように表示され動作するのかを説明してください。

### 「新しい記事」のフォームを扱う

ブラウザを更新し、新しい記事を追加してみてください。これまでに何度も目にした「unknown action」エラーが表示されるはずです。`EntriesController`にアクションを追加し、まずはアクションが受け取るものを表示してみましょう:

{% highlight ruby %}
def create
  render(:text => params.inspect)
end
{% endhighlight %}

ブラウザを更新し、アクションがどのようなパラメータを受け取るかを確認してください。

__COACH__: テキストエリアとテキストフィールドを入力してフォームを送信すると、すべてのパラメータがコントローラのアクションにPOSTされることを説明してください。.inspectは何をするものなのかを説明してください。

### 新しい記事を作成して永続化する

`create`アクションを以下のように編集してください:

{% highlight ruby %}
def create
  entry_params = params["entry"]
  entry = Entry.create(entry_params)
  redirect_to(entry_path(entry))
end
{% endhighlight %}

Railsコンソールでの作成と同じように、新しい記事のパラメータ（タイトルと内容）を`params`ハッシュから取得し、それらから新しい記事を作成しています。フォームを再度送信し`ActiveModel::ForbiddenAttributesError`が表示されることを確かめてください。

- 注意: strong_parametersを省略すると、パラメータのインジェクションに対してアプリケーションを保護できません。
- config.action_controller.permit_all_parameters = true
- これはすぐに削除されるでしょう
- しかしワークショップの前には削除されないかもしれません ;)

このエラーはセキュリティ対策のためです。ユーザーがPOSTしたいパラメータを簡単に設定できるため、Railsはユーザーが設定すべきでないパラメータ（例えば'id'）を設定しようとする悪意のあるユーザーから保護してくれます。`create`アクションの最初の行を以下のように変更して、ユーザーが設定できるパラメータを宣言する必要があります:

{% highlight ruby %}
entry_params = params["entry"].permit("title", "contents")
{% endhighlight %}

再度フォームを送信すると、今度はうまくいき、新しく作成された記事にリダイレクトされるはずです。

__COACH__: 新しい記事のパラメータを`params`から取得することが理解できていることを確認し、明示的に許可したフィールドが受け入れられていることを確認してください。

### 「記事の編集」フォームを追加する

記事の表示と作成ができるようになったので、記事の編集も追加しましょう。`rake routes`を実行し、記事の編集の役割を持つルートを確認してみてください。

__COACH__: これまでの過程をここでしっかりと理解させてください。

`app/views/entries/show.html.erb`ビューを編集し、以下のコードを追加してください:

{% highlight erb %}
<p><%= link_to("Edit this entry", edit_entry_path(@entry)) %></p>
{% endhighlight %}

ブラウザを更新し、リンクをクリックしてください。’Unknown action’のエラーが表示されるので、アクションと空のビューを追加してください。

__COACH__: ここでもしっかりと理解させてください。

では、`edit`アクションが正しい記事を表示していることをビューで確認しましょう。`edit`アクションがURLのidに基づいて正しい記事を取得するようにしてください:

{% highlight ruby %}
def edit
  @entry = Entry.find(params["id"])
end
{% endhighlight %}

`app/views/entries/new.html.erb`の内容を`app/views/entries/edit.html.erb`にコピーしてください。ただし、最初の行を指定の記事のフォームに変更し、オプションでこの記事の表示画面へのリンクを追加してください:

{% highlight erb %}
<%= form_for(@entry) do |form| %>
  <p><%= form.label("title") %></p>
  <p><%= form.text_field("title") %></p>
  <p><%= form.label("contents") %></p>
  <p><%= form.text_area("contents") %></p>
  <p><%= form.submit %></p>
<% end %>
<p><%= link_to("Back to this entry", entry_path(@entry)) %></p>
<p><%= link_to("Back to all entries", entries_path) %></p>
{% endhighlight %}

__COACH__: これまでの過程をここでしっかりと理解させてください。

では、フォームを送信してみましょう。どのアクションが不足していますか？ コントローラに追加してください:

{% highlight ruby %}
def update
  entry_params = params["entry"].permit("title", "contents")
  entry = Entry.find(params["id"])
  entry.update(entry_params)
  redirect_to(entry_path(entry))
end
{% endhighlight %}

全てが動作し、記事の編集ができるようになったことを確認してください。

__COACH__: パラメータの許可から記事の検索、リダイレクトまで、`update`アクションの内容が理解できていることを確認してください。

## その他機能のアイデア

初めて作成したアプリケーションで遊んでみましょう! 以下の機能を追加してみてください:

- パーシャルにフォームを抽出する
- 記事の一覧から記事の編集へのリンク
- 記事の削除
- 記事の日付の編集
- ウェブサイトのURLと名前に関するモデル（メインページのリスト）
- 記事の日付を未来に設定し、その日が来るまで一覧に表示しない
- 動画URLの自動埋め込み
- 記事の著者をサポート
- 記事のカテゴリをサポート
- 画像のアップロードと表示
