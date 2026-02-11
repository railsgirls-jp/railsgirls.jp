---
layout: default
title: Touristic Autism-friendly Spots App 
permalink: touristic-autism_resource-modeling
---

# モデリング

*Created by Myriam Leggieri, [@iammyr](https://twitter.com/iammyr)*
*for [Rails Girls Galway](https://github.com/RailsGirlsGalway)*
The basic guides that have been merged and adapted are the [Ruby on Rails Tutorial](http://www.railstutorial.org/book), the [basic RailsGirls app](http://guides.railsgirls.com/app/) and the tutorials for [creating thumbnails](http://guides.railsgirls.com/thumbnails), [authenticating users](http://guides.railsgirls.com/devise/), [adding design](http://guides.railsgirls.com/design), [deploying to OpenShift](http://guides.railsgirls.com/openshift/) and [adding comments](http://guides.railsgirls.com/commenting).

アプリに何をさせたいですか？

まず、はじめに

* ユーザー(**users**) を認証する
* 認証されたユーザーが観光地 (**place**) の説明文を作成できるようにする
* 認証されたユーザーが観光地にコメント (**comment**) できるようにする
* 認証されたユーザーが観光地が自閉症に優しいかどうかを評価 (**rate**) できるようにする

これらの要件は、user、place、comment、ratingという4つの異なるリソースを識別するのに**役立** ちます。

次のチュートリアルでは、評価(rating)できるようにします。

## 旅行者/ユーザーの認証

最初のリソースUserを作成し、認証を必須にしましょう。

## Step 0: devise gem を追加

`Gemfile` を開いて、下記を追加してください。

{% highlight ruby %}
gem 'devise'
{% endhighlight %}
下記を実行して、gemをインストールします。
{% highlight sh %}
bundle install
{% endhighlight %}
**Railsサーバーの再起動も忘れずに行ってください**

## Step 1: deviseのセットアップ

ターミナル上で次のコマンドを実行してください。

{% highlight sh %}
rails g devise:install
{% endhighlight %}

## Step 2: deviseの設定

environmentsファイルにデフォルトのURLオプションを定義しましょう。 `config/environments/development.rb`を開いて、
{% highlight ruby %}
   config.action_mailer.default_url_options = { :host => 'localhost:3000' }
{% endhighlight %}

`end`の前に上記の行を追加しましょう。

`app/views/layouts/application.html.erb`を開いて、

{% highlight ruby %}
   <%= yield %>
{% endhighlight %}
の真上に
{% highlight erb %}
<% if notice %>
  <p class="alert alert-success"><%= notice %></p>
<% end %>
<% if alert %>
  <p class="alert alert-danger"><%= alert %></p>
<% end %>
{% endhighlight %}
上記のコードを追記しましょう。

## Step 3: Userモデルのセットアップ

ジェネレータを使用してUserモデルを作成しましょう。
{% highlight sh %}
   rails g devise user
   rake db:migrate
{% endhighlight %}

{% coach %}
作成されたUserモデルについて説明してください。フィールドとは何でしょうか？モデルは`ActiveRecord::Base` というスーパークラスからDBと対話する能力を継承しています。(参照: MVC)
{% endcoach %}

## Step 4: 最初のuserの作成

これで準備が整ったので、最初のユーザーを作成できます。
deviseはアカウントの作成、ログイン、ログアウトなどに必要なすべてのコードとルートを生成します。

Railsサーバーが起動中であることを確認して、 [http://localhost:3000/users/sign_up](http://localhost:3000/users/sign_up)にアクセスしてユーザーアカウントを作成してください。

## Step 5: サインインとログインのリンクを追加

あとは、ナビゲーションバーの右上に適切なリンクや、ユーザーがログインしていることに関するお知らせを追加するだけです。
`app/views/layouts/application.html.erb`を編集し、`body`の冒頭に次のコードを追加してください。

{% highlight erb %}
<p class="navbar-text pull-right">
<% if user_signed_in? %>
  Logged in as <strong><%= current_user.email %></strong>.
  <%= link_to 'Edit profile', edit_user_registration_path, :class => 'navbar-link' %> |
  <%= link_to "Logout", destroy_user_session_path, method: :delete, :class => 'navbar-link'  %>
<% else %>
  <%= link_to "Sign up", new_user_registration_path, :class => 'navbar-link'  %> |
  <%= link_to "Login", new_user_session_path, :class => 'navbar-link'  %>
<% end %></p>
{% endhighlight %}

次に、ユーザーがログインしていない場合に強制的にログインページにリダイレクトするようにします。`app/controllers/application_controller.rb`を開き、以下のコードを

{% highlight ruby %}
  before_action :authenticate_user!
{% endhighlight %}

`protect_from_forgery with: :exception`の後に追加してください。

ブラウザを開いて、ログインとログアウトを試してみましょう。

{% coach %}
`user_signed_in?`と`current_user` ヘルパーについて説明してください。これらはなぜ便利なのでしょうか？
{% endcoach %}

変更をGitHubにadd,commit,pushしましょう!
すべての変更がGitHubに反映されているのを確認しましょう:)

## place

Railsのscaffold機能を使用して、2つめのリソース"place"の一覧表示、作成、削除、変更、表示するために必要なものすべてを作成できます。

<div class="os-specific">
  <div class="nix">
{% highlight sh %}
rails generate scaffold place name:string address:string latitude:decimal longitude:decimal description:text picture:string user_id:integer
{% endhighlight %}
  </div>
</div>

`users`と1対多の関連をサポートする user:references カラムが作成されることに注目してください。

`scaffold`はプロジェクトディレクトリに新しいファイルを作成します。しかし、私たちは構造を定義(モデル化)しており、今後作成されるこのリソースのインスタンスがその構造に従い、どこかに保存される必要があります。それが、データベースです。


私たちはすでにデータベースを使用しています。(Gemfileに`gem 'sqlite'`が記述されています)
次のコマンドを実行して、"place"構造体をテーブルとしてデータベースに追加しましょう。


<div class="os-specific">
  <div class="nix">
{% highlight sh %}
bin/rake db:migrate
{% endhighlight %}
  </div>

  <div class="win">
{% highlight sh %}
ruby bin/rake db:migrate
{% endhighlight %}
  </div>
</div>

ここでサーバーを再起動させましょう。[http://localhost:3000/places](http://localhost:3000/places)にアクセスして、"place"を扱うためのすべての機能があることを確認しましょう。Ruby on Railsの`generate scaffold`が自動生成してくれたおかげです。
"place"の新しいインスタンスごとに、一意の識別子 "primary key"が自動的に割り当てられるため、開発者が特に指定する必要はありません。
{% coach %}
Railsのscaffoldとは何でしょうか? migrationとは何で、なぜ必要なのでしょうか？
{% endcoach %}

"place"リソースを操作するために作成されたページとその命名規則に注目してください。サーバーのログを確認して、以下のインタラクションがどのように処理されているのかを説明してください。(MVCパターンのコンテキストで)

* ブラウザは/places URL へのリクエストを行う
* Railsは/placesをplacesコントローラのindexアクションにルーティングする
* indexアクションはplaceモデルにすべてのplaceを取得するように依頼します(Place.all)
* Placeモデルはデータベースからすべてのplaceを取得します。
* Placeモデルはplaceの一覧をコントローラに返します。
* コントローラはユーザーを@users変数に保存し、indexビューに渡します。
* ビューはERBを使用してHTMLとしてレンダリングします。
* コントローラはHTMLをブラウザに返します。

作成されたコントローラがRESTfulであることに注目してください。

コントローラは `ApplicationController` スーパークラスから機能(モデルオブジェクトを操作したり、HTTPリクエストをフィルタリングしたり、ビューをHTMLとしてレンダリングするなどの多くの機能)を継承していることに注目してください。(参考: MVC)

`app/views/places/show.html.erb`を開いて次の行を削除してください:

{% highlight erb %}
<p id="notice"><%= notice %></p>
{% endhighlight %}

認証されたユーザーへの通知は既に`app/views/layouts/application.html.erb`ファイルに追加しているので、この行は不要です。

GitHubリポジトリにadd、commit、pushを行いましょう!

### リソースの関連付け

placesはusersとまだ正しく関連付けられていないことに注意してください。例えば、新しいplaceを作成する場合、Userフィールドも入力する必要があります。そして、Userのプロフィールを表示する際、userが作成した場所の一覧は表示されず、その逆も同様です。また、userアカウントを削除しても、userが作成したplacesは自動的に削除されません。

UserとPlacesの間の1対多の関連を作成しましょう。

#### Step 1. 1対多の関連を追加

UserとPlaceリソースの関連を適切に定義する必要があります。
userモデルに1つのuserとしてたくさんのplaceを作成できることを定義する必要があります。
app/models/user.rbを開いて、次のコードの後に

{% highlight ruby %}
class User < ActiveRecord::Base
{% endhighlight %}

下記のコードを追加してください。
{% highlight ruby %}
has_many :places
{% endhighlight %}

placeが、どのuserに属しているかを定義する必要があります。app/models/place.rb を開いて、次のコードの後に

{% highlight ruby %}
class Place < ActiveRecord::Base
{% endhighlight %}

以下のコードを追加してください
{% highlight ruby %}
belongs_to :user
{% endhighlight %}

#### Step 2: ビューをレンダリングする

app/views/places/_form.htmlを開いて、次のコードの後に
{% highlight erb %}
<div class="field">
  <%= f.label :user_id %><br>
  <%= f.number_field :user_id %>
</div>
{% endhighlight %}

以下のコードを追加してください
{% highlight erb %}
<%= f.hidden_field :user_id, :value => current_user.id %>
{% endhighlight %}

次に、以下のコードを削除してください
{% highlight erb %}
<div class="field">
  <%= f.label :user_id %><br>
  <%= f.number_field :user_id %>
</div>
{% endhighlight %}

## Step 3: 編集/削除の権限を設定する

placeの作成者だけがそのplaceを編集/削除できるようにします。

app/views/places/index.html.erbを開いて、次のコードを

{% highlight sh %}
<td><%= link_to 'Edit', edit_place_path(place) %></td>
		<td><%= link_to 'Destroy', place, method: :delete, data: { confirm: 'Are you sure?' } %></td>
{% endhighlight %}

下記のコードに書き換えてください。

{% highlight sh %}
 <% if user_signed_in? %>
	  <% if current_user.id == place.user_id %>

		<td><%= link_to 'Edit', edit_place_path(place) %></td>
		<td><%= link_to 'Destroy', place, method: :delete, data: { confirm: 'Are you sure?' } %></td>
	    <% end %>
	<% end %>
{% endhighlight %}

これで完了です。アプリケーションに登録したuserを表示すると、placeを作成するためのフォームが表示され、作成済みのplaceを削除することもできます。




## Placeのコメント

placeリソースの作成、placeとusersの関連付けを行ったのと同様に、commentリソースを作成し、commentとauthorを関連付けることができます。

<div class="os-specific">
  <div class="nix">
{% highlight sh %}
rails generate scaffold comment body:text user_id:integer place_id:integer
bin/rake db:migrate
{% endhighlight %}
  </div>
</div>

サーバーを起動し、ブラウザで新しいサービスを確認してください。
その後、githubにadd, commit, pushを行ってください。

{% coach %}
scaffoldがRailsのrouteファイルを更新し、Reviewリソースのルールが追加されたことを示してください。
{% endcoach %}


##Resource Association

#### Step 1. 1対多の関連付け

app/models/place.rbを開いて、次のコードの後に
{% highlight ruby %}
belongs_to :user
{% endhighlight %}
以下のコードを追加してください
{% highlight ruby %}
has_many :comments
{% endhighlight %}

app/models/comment.rbを開いて、次のコードの後に
{% highlight ruby %}
class Comment < ActiveRecord::Base
{% endhighlight %}

以下のコードを追加してください
{% highlight ruby %}
belongs_to :user
belongs_to :place
{% endhighlight %}

#### Step 2: ビューをレンダリングする

app/views/comments/_form.htmlを開いて、次のコードを
{% highlight erb %}
<div class="field">
  <%= f.label :user_id %><br>
  <%= f.number_field :user_id %>
</div>
{% endhighlight %}

下記のコードに書き換えてください
{% highlight erb %}
<%= f.hidden_field :user_id, :value => current_user.id %>
{% endhighlight %}

次に、下記のコードを
{% highlight erb %}
  <div class="field">
    <%= f.label :place_id %><br>
    <%= f.number_field :place_id %>
  </div>
{% endhighlight %}

下記のコードに書き換えてください
{% highlight erb %}
<%= f.hidden_field :place_id%>
{% endhighlight %}

app/views/places/show.html.erbを開いて、一番下のリンクの直前に下記のコードを追加してください
{% highlight erb %}
<h3>Comments</h3>
<% @comments.each do |comment| %>
  <div>
    <strong><%= comment.user_id %></strong>
    <br />
    <p><%= comment.body %></p>
    <p><%= link_to 'Delete', comment_path(comment), method: :delete, data: { confirm: 'Are you sure?' } %></p>
  </div>
<% end %>
<%= render 'comments/form' %>
{% endhighlight %}

app/controllers/places_controller.rbを開いて、showアクション内の次のコードの後に
add to show action after the row
{% highlight ruby %}
@place = Place.find(params[:id])
{% endhighlight %}

以下のコードを追加してください
{% highlight ruby %}
@comments = @place.comments.all
@comment = @place.comments.build
{% endhighlight %}


## Step 3: 編集/削除の権限を設定する

commentの作成者だけがそのcommentを編集/削除できるようにします。

app/views/places/show.html.erbを開いて、下記のコードを

{% highlight sh %}
<p><%= link_to 'Delete', comment_path(comment), method: :delete, data: { confirm: 'Are you sure?' } %></p>
{% endhighlight %}

下記のコードに書き換えてください


{% highlight sh %}
 <% if user_signed_in? %>
	  <% if current_user.id == comment.user_id %>

    <p><%= link_to 'Delete', comment_path(comment), method: :delete, data: { confirm: 'Are you sure?' } %></p>

  <% end %>
	<% end %>
{% endhighlight %}


## Resource Field Validation

現時点では、comment、place、userはその情報が正しいかどうかの検証が行われていません。レビューのcommentの長さの制限やuserのemailアドレスのフォーマットには制限があるべきです。

commentのbodyフィールドに長さの制限を追加しましょう。(validatesを使用します)
app/models/comment.rbを開いて、'class'と'end'の間に下記のコードを追加しましょう。


<div class="os-specific">
  <div class="nix">
{% highlight sh %}
  validates :body, length: { maximum: 140 }
{% endhighlight %}
  </div>
</div>
140文字以上のコメントを入力しようとするとエラーが出るはずです。(試してみてください)

## Finetune the routes
## ルーティングの微調整

もし [http://localhost:3000](http://localhost:3000) にアクセスしても"Welcome aboard" のページが表示される場合、placesページにリダイレクトさせましょう。

`config/routes.rb`を開いて最初の行の後に以下のコードを追加しましょう

{% highlight ruby %}
root :to => redirect('/places')
{% endhighlight %}

ルートパス(http://localhost:3000/)にアクセスして、変更されたことを確認しましょう。

{% coach %}
ルーティングについて、教えてください。ルーティングの順序や静的ファイルとの関係についても説明してください。
{% endcoach %}

**Rails 3 をお使いの方へ:** この変更を適用するには、`/public/` フォルダーからindex.htmlを削除する必要があります。

