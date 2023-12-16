---
layout: default
title: The Guide to the Guide
permalink: guide-to-the-guide
---

# Railsガールズ・ガイドへのご案内です！

*Created by H Salmon to accompany the [app guide](/app).*
*翻訳者: Mai Muta, [@maimux2x](https://twitter.com/maimux2x)*

このガイドは、最初のRailsアプリケーションを構築するために使用する[Rails Girls Guide](/app)を補足するものです。 このガイドの目的は、Railsアプリケーションの構造、Railsの用語、コマンドに関する背景情報を提供し、Rails Girls Guideのコードを実装するときに何が起こっているかを理解できるようにすることです。このガイドが、このワークショップで学んだことを定着させ、Rails開発への興味を維持するための一助となれば幸いです。ようこそ！

### [**1.** アプリケーションの作成](#1_create_the_application)
知っておきたいコマンド

### [**2.** Idea の scaffold を作る](#2_create_idea_scaffold)
モデルとマイグレーションをscaffoldで作成

### [**3.** デザイン](#3_design)
デザインレイヤー（HTML、CSS、ERB）
MVCアーキテクチャ

### [**4.** 画像アップロード機能の追加](#4_add_picture_uploads)
ライブラリ、gems、オープンソース

### [**5.** routesの調整](#5_finetune_the_routes)
routes, HTTPメソッド： GET、POST、PUT、DELETE



## <a id="1_create_the_application">*1.* アプリケーションの作成</a>

`mkdir projects` - 現在いるフォルダ（おそらくホームフォルダ）に「projects」という*ディレクトリ*（フォルダ）を作成します。
`mkdir` = **m**a**k**e **dir**ectory.

`cd projects` - あなたが作成した「projects」フォルダに移動します。 `cd` = **c**hange **d**irectory.

`rails new railsgirls` - **作業ディレクトリ**（現在作業しているフォルダ）に、自動生成された様々なフォルダを含む**railsgirls**という新しいRuby on Railsアプリケーションを作成します。

`cd railsgirls` - 「railsgirls」フォルダに移動します。

`ruby script\rails server` - あなたのコンピュータ上でローカルWebサーバーを起動します。このWebサーバーは、Webアドレス[http://localhost:3000](http://localhost:3000)からアクセスできます。

「Localhost」は具体的にはあなたのコンピュータ（「ローカルホスト」と呼ばれる）を指し、そこからサーバーが起動されます。ローカルホストは、開発者がアプリケーションをブラウザで確認し、開発中に機能をテストする手段を提供します。

## <a id="2_create_idea_scaffold">*2.* Idea の scaffold を作る</a>

### Railsのscaffoldとは何でしょうか？

すべてのウェブアプリケーションは多くの異なる概念やリソース（例: "users"、"ideas"、"posts"、"comments"など）から構成されています。
Railsのscaffoldは、アプリケーションに新しいリソースを導入するためのコマンド（`rails generate scaffold`）です。これにより、このリソースを表現し、それとやり取りするために必要なすべてのコードファイルが生成されます。

### モデルとは何でしょうか？

Railsでは、モデルはアプリケーション内のリソースの定義を表し、そのリソースがアプリケーションの他の部分とどのように相互作用すべきかを表します。ウェブサイトの性質に応じて、これらのリソースはusers、posts、groupsなどになります。モデルが生成されると、対応する*データベーステーブル*が作成されます。このデータベーステーブルには、モデルの指定された属性を表す情報が含まれています。例えば、Userモデルの場合、「name」というカラムや「email」というカラムがあるかもしれません。それぞれのユーザーが作成されるたびにこれらのレコードが存在します。あなたが作成しようとしているアプリケーションでは、これらのリソースはideasであり、モデルは「Idea」です。

{% highlight rb %}
rails generate scaffold idea name:string description:text picture:string
{% endhighlight %}

Ideaモデルを作成するために、`scaffold`コマンドを使用します。このコマンドには単数系のモデル名（`idea`）と、モデルの属性に関するパラメータ（仕様）を含む引数があります。これは`idea`モデルが、コマンドで指定された属性`name`、`description`、および`picture`に対応するデータベース内のテーブルであることを意味します。また、`scaffold`コマンドは`primary key`と呼ばれる`id`属性も自動生成します。この属性はデータベーステーブル間の関係を確立するために使用されます。

`rails generate scaffold` - これはscaffoldコマンドを呼び出します。

`idea` - scaffoldコマンドに対して、モデルの名前をどう呼びたいかを指定します。

`name:string description:text picture:string` - モデル（およびそれに関連するデータベーステーブル）が持つ属性のリストを提供します。 引数の中の`string`と`text`の部分は、各属性の性質を決定します。つまり、各説明は「text」である必要があり、例えば「integer」（または他の任意の情報の型）であってはいけません。

### ideasテーブル

<table class="table table-hover table-bordered">
	<thead>
		<tr>
			<th>id</th>
			<th>name</th>
			<th>description</th>
			<th>picture</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>1</td>
			<td>“儲かるもの”</td>
			<td>“移動可能な店舗をオープンする！”</td>
			<td>“GreatIdea.jpg”</td>
		</tr>
		<tr>
			<td>2</td>
			<td>“朝食にシャンパン！”</td>
			<td>“毎週金曜日にやろう！”</td>
			<td>“Champagne.jpg”</td>
		</tr>
		<tr>
			<td>3</td>
			<td>...</td>
			<td>...</td>
			<td>...</td>
		</tr>
	</tbody>
</table>

### 命名規則

#### Active Record
Railsでは、アプリケーションのデータベースとやり取りするためのデフォルトのシステムは*Active Record*と呼ばれ、データの作成、保存、および検索するためのさまざまなメソッドを提供しています。データベースから情報を取得するにあたり、*Active Record*は異なるアプリケーションの部分間に関係を確立するために命名規則を使用します。

- テーブル名はすべて小文字で、単語間はアンダースコアで区切ります。例： “ideas”, “invoice\_items”
- モデルは、慣例としてMixedCaseの規約を使用して命名され、常にテーブル名の単数形です。たとえば、テーブル名が「invoice\_items」の場合、モデル名は「InvoiceItem」になります。したがって、今回の場合、テーブル名は 「ideas」であり、モデルは「Idea」となります。

#### モデルの属性とタイプ

既に説明したように、モデルは対応するデータベーステーブルのカラムで表される属性（プロパティ）を持つことができます。 Active Recordシステムでサポートされるためには、これらの属性は適切な型のリストに準拠している必要があります。

- `:binary` - 画像、音声ファイル、動画などのデータを格納します。

- `:boolean` - 真偽値を格納します（特定のユーザーがアプリケーションの管理者であるかどうかなど）。

- `:date` - 日付（年、月、日）のみを格納します。

- `:datetime` - 日付と時刻の両方を格納します。

- `:decimal` - 仕様に応じて変動する精度で10進数を格納します。

- `:float` - 
固定された精度で小数点を格納します。つまり、精度を指定することはできません（`:decimal`は精度が必要な数学演算に適していますが、`:float`は処理が速く、精度が二次的な場合に適しています）。

- `:integer` - 整数を格納します。

- `:primary_key` - テーブルの主キーは、通常、idとされます。

- `:string` - 255文字のテキスト情報を格納し、例えば、短いテキストフィールド（名前、メールアドレスなど）に使用されます。

- `:text` - 文字数制限のないテキスト情報を格納します（コメントやブログ記事などに使用します）。

- `:time` - 時刻のみを格納します。

- `:timestamp` - 時刻と日付の両方を格納します。`:timestamp`は`:datetime`とは異なり、異なる目的に役立ちますが、ここでは必要がないため詳しくは説明しません。

### マイグレーションとは何で、なぜ必要なのでしょうか？

マイグレーションはデータベースの状態を変更します。`scaffold`コマンドを実行すると、コマンドに関連するデータベーステーブルへの指示が含まれたマイグレーションファイルが、アプリケーションの`db/migrate`フォルダに追加されます。例えば、`rails generate scaffold`コマンドを実行すると、ideasテーブルへの指示を含むマイグレーションが作成されます。他にも `rails generate model` コマンドや `rails generate migration` コマンドなどのマイグレーションを生成するコマンドがあります。

`rake db:migrate` コマンドはマイグレーションファイルの指示に従ってデータベースを更新します。このコマンドは 「migrating up」として知られており、あなたのIdeaモデルがデータベースに追加されることを保証します。コマンド `rake db:rollback` を使えば、マイグレーションを取り消す（「migrating down」）こともできます。

## <a id="3_design">*3.* デザイン</a>
Ruby on Railsアプリケーションでは、Webサイトを訪れるユーザーが見ることになるユーザーインターフェースは、通常、HTMLと埋め込みRuby（ERB）コードで書かれることが多いです。このコードは、Railsアプリケーションディレクトリ内の`app`フォルダにある特定のディレクトリである「views」に含まれています。

### HTML
HTMLとは、ハイパーテキスト・マークアップ・ランゲージ（HyperText Markup Language）の略で、Webブラウザで表示できるWebページやその他の情報を作成するための主要な言語です。HTMLはタグを使って記述され、角括弧はテキストベースのコンテンツを囲む2つのタグ（開始タグと終了タグ）で構成されます。対になるタグでは、開始タグと区別するために、終了タグも開始角括弧の後にスラッシュを付けます。段落（HTMLでは`p`で表される）は表示するテキストを囲むために、このような開始タグ`<p>`および終了タグ`</p>`を使用します。閉じる必要がないが開かれたままの非対になるタグ（例：単一の改行を定義する`<br>`など）は、「空要素」として知られています。WebブラウザはHTMLタグを使用して、コンテンツの表示方法を解釈します。

### ERB: 埋め込みRuby
ERBは、Rubyが提供するシステムで、JavascriptやHTMLなど他の言語で書かれたファイルに純粋なRubyコードを挿入することができます。Rubyコードは特定の角括弧（`<%`および`%>`）内に含まれており、システムにその内容を実行するように指示します。角括弧の前に`=`記号が付随している場合（`<%=`および`%>`）、その内容が実行されてページ上にレンダリングされます。

例えば、アプリケーションに25のアクティブなideasがあった場合、コードは次のようになります。
`現在 <%= Idea.count %> アクティブなideasがあります。`
そして次のようにレンダリングされます。
> 現在アクティブなideasは25個あります。

### MVCアーキテクチャ
標準的なRailsアプリケーション（今回あなたが生成したようなもの）は、アプリケーションの`app/`フォルダは3つのフォルダ（ディレクトリ）で構成されます。「models」（既に説明しましたね）、「controllers」「views」です。これらのディレクトリ間の関係は、アプリケーションおよびRails開発の基盤で、MVCアーキテクチャとして知られています。

`rails generate scaffold`コマンドを実行するとideaモデルの作成に加えて、対応するideasコントローラー (`ideas_controller.rb`)も作成されます。このファイルはcontrollersフォルダーにあります。さらにideasのviewsフォルダも作成され、そこには動的なアプリケーションを作成するために使用するいくつかのファイルが含まれています。

RailsのWebサイトを表示しようとすると、Webブラウザはサーバーを介してリクエストを送信し、最終的にRailsの*コントローラー*に到達します。*コントローラー*は*ビュー*と*モデル*の仲介役として機能します。*コントローラー*が情報を受け取ると、アプリケーションのリソースを表す*モデル*と通信し（今回の例では「idea」）、そこから順次データベースに問い合わせます。*コントローラー*は*モデル*から必要な情報を取得したら、Webページ全体をHTMLとしてブラウザに返す*ビュー*をレンダリングします。

### CSSとレイアウト
CSS (Cascading Style Sheets)は「マークアップ言語」で書かれたページのフォーマットを表現するために利用される言語です。すなわち、テキストを処理し、定義し、所定の書式コードで表示するための言語でプレーンテキストとは区別されます。CSSの最も一般的な用途はHTMLとの併用です。
{% highlight css %}
body { padding-top: 100px; }
footer { margin-top: 100px; }
table, td, th { vertical-align: middle; border: none; }
th { border-bottom: 1px solid #DDD; }
{% endhighlight %}

CSS内で適用されたのは、

`body` - この部分はセレクターです。スタイルを適用したいHTML要素を指定します。
`{ padding-top: 100px; }` - この部分は宣言です。各宣言は、変更したいスタイル属性 (`padding-top`)と関連する値(`100px`)をプロパティとして持ちます。宣言は常にセミコロンで終わり、宣言グループは常に中括弧で囲われています。

各Railsアプリケーションには、viewsディレクトリのlayoutsフォルダにある`application.html.erb`というデフォルトのレイアウトファイルがあります。このファイルを使用して、アプリケーション内のすべてページに対してデフォルトフォーマットを作成することができます。

{% highlight html %}
<link rel="stylesheet" href="https://railsgirls.com/assets/bootstrap.css">
{% endhighlight %}

上記のコードでは、`link rel`(link relation)は`href` (hypertext reference)属性がコンテンツを要求するURLの性質を定義しています。この引数は、要求された外部ソースがスタイルシートであり、Webブラウザがページを適切に表示するために、このファイルを取得する必要があることを示しています。

{% highlight erb %}
<%= stylesheet_link_tag "application" %>
{% endhighlight %}

このコードの場合は「application」、つまり`application.css`のソースに対するスタイルシートリンクタグを返します。これは、application.css で実装したスタイルがアプリケーションのさまざまなページに適用されることを意味します。


{% highlight erb %}
<div class="container">
  <%= yield %>
</div>
{% endhighlight %}

このコードでは

- HTMLの`div`タグはコードをパーツに分割します。
- *containerクラス*は、divタグ内の全てにスタイリングを追加します。
- `<%= yield %>`引数は、各ページに対して固有のコンテンツを`div`に挿入する役割を担います。つまり、ページごとにコンテンツが異なっていても、アプリケーション全体のレイアウトは一貫しているということです。

## <a id="4_add_picture_uploads">*4.* 画像アップロード機能の追加</a>

### ライブラリ
Rubyを含む多くのプログラミング言語は幅広いライブラリを使用しています。Rubyの場合、これらのライブラリのほとんどは*gem*と呼ばれる自己完結型パッケージの形でリリースされていて、そのパッケージにはライブラリをインストールして実装するために必要なすべての情報が含まれています。これらのgemはアプリケーションの`Gemfile`に含まれていて、このファイルを見てみると、最初のRailsアプリケーションを作成した際にアプリケーションが正しく機能するためのgemがいくつか含まれていることに気がつくでしょう。

Gemはソフトウェア開発の原則であるDRY (Don’t Repeat Yourself)に従って、開発者のコードを簡素化し、コードの重複を防ぐことに役立ちます。Gemは特定の問題を解決したり、特定の機能を追加したり、特定の要件に対処したりします。これは、他の開発者が同じようなシナリオに遭遇した際に、新たなコードを書く代わりに予め書かれたコードを含むGemをインストールすることができるということを意味します。例えば、Gemfileに追加した「CarrierWave」は、ファイルをアプリケーションに簡単にアップロードできるように設計されています。

「Bundler」はRubyがgemを追跡・管理するために使用するソフトウェアです。`bundle`コマンドはBundlerを実行し、Gemfileで指定されたgemをインストールします。Gemfileの先頭に`source 'https://rubygems.org'`というコードがあります。Gemfileにgemを追加して、`bundle`コマンドを実行するとこのコードはアプリケーションに[https://rubygems.org](https://rubygems.org)からgemを取得するように指示をします。「RubyGems」はRuby固有のパッケージングシステムで、gemの作成、共有、インストールを簡単にすることを目的としています。

### オープンソースソフトウェア

RailsフレームワークとRuby言語の両方は、オープンソースソフトウェアの一例です。オープンソースソフトウェアは普遍的なアクセスを保証するライセンスのもとでリリースされていて、誰でもソフトウェアを変更、研究、配布する権利があります。ソースコードを公開することで、お互いの開発から恩恵を受けるプログラマーたちの、多様で、再帰的で、協力的な、その結果として進化を続けるプログラマーのコミュニティが形成され、全員がお互いの開発から利益を得ることができます。

### その他のHTML

`app/views/ideas/_form.html.erb`ファイルにはideasの編集と作成に使用されるフォーム(`edit.html.erb`と`new.html.erb`ビュー)の見た目と雰囲気を定めるHTMLコードが含まれています。パーシャルとは、複数の場所で再利用できるHTMLとRubyのコードのスニペットです。既存のideasを編集するフォームと新規にideasを作成するフォームはほぼ同じなため、両方のファイルで使用するフォームを一つにすることは理にかなっています。これらのファイルを見ると、カスタマイズされた見出し (例えば `<h1>ideaの編集</h1>`) があり、単に `<%= render 'form' %>` と書かれていて、Rails にパーシャルな `_form.html.erb` をレンダリングするように指示していることに気づくでしょう。

`_form.html.erb`ファイルを見てみると、最初の行に`form_for`というコードがあるのが分かります。これはHTMLフォームを作成するために使用されるブロックです。このブロックを使用するとフォームに様々な入力フィールドを設けるメソッドにアクセスすることが可能です。

`<%= f.file_field :picture %>`で実装しているコードは、Railsに対してフォームにファイル添付を作成し、送信された情報をideasデータベーステーブルの「idea」の「picture」属性にマッピングするように指示しています。コードを`<%= f.text_field :picture %>`から`<%= f.file_field :picture %>`に変更したのは、`file_field`を使うとユーザーがアップロードしたい画像を選択しやすくなるからです。

`<%= @idea.picture %>`コードの中の`@idea`は*インスタンス変数*です。インスタンス変数には@記号がつき、それらが参照されるビューに対応するコントローラーアクションで定義されます。今回実装しているコードでは`@idea`は`Ideas`コントローラの「show」
アクションで`@idea = Idea.find(params[:id])`のように定義されています。これにより、`show.html.erb`ビューで使用できるようになります。異なるコントローラーのアクション（例えばindexやnew）では異なる定義が可能です。`@idea = Idea.find(params[:id])`コードは、Railsの`find`メソッドを使ってデータベースから特定のideasを取得します。

`@idea`変数に続くコード(`.picture`)は、Railsに対してリソース（idea）の「picture」属性にアクセスするように指示しています。 `<%= @idea.picture %>`コードを`<%= image_tag(@idea.picture_url...)`に置き換えることによって、Rubyの`image_tag`*ヘルパー*を使用するようになります。これはHTMLの`<img>`タグ（HTMLで画像を定義するために使用される）に変換されます。ただし、デフォルトではアップロードされた画像が保存されているpublic/imagesフォルダから画像を取得します。また、`image_tag`ヘルパーを使うと、特定のideaに関連する画像（`@idea.picture_url`）へのパスを作成するコードブロックを挿入することが可能です。

あなたが実装しているこのコードブロックの中で、各画像のデフォルト幅も設定できることにお気づきでしょう(`:width => 600`)。最後の行にある`if @idea.picture.present?`コードは、関連するデータベースのテーブルをチェックしてコードをレンダリングする前に画像が存在するかを確認するようにRailsに指示をしています。

## <a id="5_finetune_the_routes">*5.* routesの調整</a>

機能的なRailsアプリケーションでは、適切なレスポンスを返すためにブラウザから受信したリクエストを変換するシステムが組み込まれています。このシステムは*ルーティング*と呼ばれます。ブラウザからのリクエストは特定のHTTPメソッドとして解釈されます。HTTP（ハイパーテキスト・トランスファー・プロトコル）とは、情報（通常、Webページや、ハイパーリンクを持つテキストで構成されたWebページ・コンポーネント、つまり「ハイパーテキスト」）がどのようにフォーマットされ、インターネット上で転送されるかを定義するプロトコルです。主なHTTPメソッドは4つあり、それぞれ特定のリソース（ユーザーや投稿など）に対して操作を実行するリクエストです。その4つのメソッドとはGET、POST、PUT、DELETEです。Railsに内蔵されたルーティングシステムは、コントローラーで定義された特定のアクション（index、show、new、edit、create、update、delete）に対応するルートを各リソースに対して自動的に生成します。これらのアクションは、関連するコントローラー（たとえば`ideas_controller.rb`）で定義され、各モデルにはそれに関連するコントローラーに定義された7つのアクションがあります。これらのアクションは、対応するビュー（例：`ideas/index.html.erb`）をレンダリングするための適切なレスポンス（メソッド）を指定します。


<table class="table table-bordered table-hover">
	<thead>
		<tr>
			<td>HTTPメソッド</td>
			<td>パス</td>
			<td>アクション</td>
			<td>用途</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>GET</td>
			<td>/ideas</td>
			<td>index</td>
			<td>すべてのideasのリストを表示</td>
		</tr>
		<tr>
			<td>GET</td>
			<td>/ideas/new</td>
			<td>new</td>
			<td>新しいideaを作成するためのHTMLフォームを返す</td>
		</tr>
		<tr>
			<td>POST</td>
			<td>/ideas</td>
			<td>create</td>
			<td>新しいideaを作成する</td>
		</tr>
		<tr>
			<td>GET</td>
			<td>/photos/:id</td>
			<td>show</td>
			<td>特定の画像を表示する</td>
		</tr>
		<tr>
			<td>GET</td>
			<td>/photos/:id/edit</td>
			<td>edit</td>
			<td>特定の画像を編集するためのHTMLフォームを返す</td>
		</tr>
		<tr>
			<td>PUT</td>
			<td>/photos/:id</td>
			<td>update</td>
			<td>特定の画像を更新する</td>
		</tr>
		<tr>
			<td>DELETE</td>
			<td>/photos/:id</td>
			<td>destroy</td>
			<td>特定の画像を削除する</td>
		</tr>
	</tbody>
</table>

`ideas_controller.rb`を見ると、これらのアクションと関連する振る舞い、および各アクションに対応するHTTPメソッドが確認できます。

{% highlight rb %}
def show
    @idea = Idea.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @idea }
    end
  end

  # GET /ideas/new
  # GET /ideas/new.json
{% endhighlight %}

`show` - コントローラーのアクション

{% highlight rb %}
respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @idea }
{% endhighlight %}

（このコードを今の段階で明確に深掘りするのは難しいですが、Railsを使い続けていれば時間の経過とともに理解が深まるでしょう。）

上記のshowアクションの定義では、Railsは`respond_to`ヘルパーメソッドを使って、それに続く*ブロック*のコード(`do...end`構文で囲まれたコード)を実行するよう指示しています。このコードには、リクエストの性質に応じて2つの異なるフォーマットオプションが含まれています。ブラウザがHTMLを要求した場合は、このコントローラーアクションに対応するビュー (`show.html.erb`) に含まれるHTMLコードがレンダリングされます。jsonが要求された場合は、ビューはバイパスされ、限られた情報が提供されます。

`GET` - この部分はどのHTTPメソッドが実行されているかを伝えるためのコメント行です。

このように、URLリクエストはHTTPメソッドに変換され、それがコントローラーアクションにマッピングされ、Railsにビューを返すように指示されます。

`root :to => redirect('/ideas')`コードを`config.rb`に挿入すると、アプリケーションのデフォルトルートを[http://localhost:3000/ideas](http://localhost:3000/ideas) にするよう Rails に指示します （このアプリケーションはまだ開発中なので、ドメインとして Localhost が使用されていることに注意してください。アプリケーションをローンチした場合、このドメインは異なるものになります）。 このURLにはデフォルトでパス（`/ideas`）が含まれており、これによりURLがideasコントローラーの 「index」 アクションにマッピングされ、関連するビュー（`index.html.erb`）がレンダリングされます。`rm public/index.html`は、以前のアプリケーションのデフォルトルートである「Welcome Aboard」コードが含まれている`public/index.html`ファイルを削除します。
