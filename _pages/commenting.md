---
layout: main_guide
title: コメント機能を追加しよう
permalink: commenting
---
# コメント機能を追加しよう

*作成者: Janika Liiv, [@janikaliiv](https://twitter.com/janikaliiv)* / 
*翻訳者: Yugo Fukano, [@yukyu30](https://github.com/yukyu30)*

{% include main-guide-intro.html %}

*railsgirls* アプリのideasへコメントができる機能の追加をします。このガイドでは、Railsジェネレータによる雛形の作成を最小限に抑えて進めていきます。そのため、この機能を実装するためにより多くのRubyのコードを書いていくことになります。

## comment routesを追加しよう

まず、comments routeを追加をします。comment routeはideas routesの下にネストされるため、routeからcommentがどのideasに紐づくかを特定できるようになります。
{% highlight ruby %}
resources :ideas
{% endhighlight %}

以下のように変更します。

{% highlight ruby %}
resources :ideas do
  resources :comments
end
{% endhighlight %}

## Commentモデルの作成

Ideaと同様にCommentモデルを作成しますが、コントローラやその他多くのファイルは省略します。
このガイドでは生成されたコードに依存するのではなく、自らの手で多くの変更を加えていきます。

以下のコマンドは名前、メッセージ本文、ideasテーブルへの参照を持つCommentモデルを作成します。ideasテーブルの参照によってcommentは特定のideaに紐づき、他のideaページには表示されません。

{% highlight sh %}
rails generate model comment user_name:string body:text idea:references
{% endhighlight %}

新しいマイグレーションファイルが作成されました。以下のコマンドでマイグレーションを実行して、データベースにcommentsテーブルを作成します。

{% highlight sh %}
rails db:migrate
{% endhighlight %}

## *2.*モデルに関係 (relations) を追加する

Railsはideasとcommentsの2つのオブジェクトの関係を知っている必要があります。その結果、特定のideaに関連するcommentsのみ取得できます。1つのideaは複数のcommentsが持つことができ、1つのcommentは1つのideaのみ持つことができます。

`app/models/idea.rb` を開いて、以下の行を探してください。

{% highlight ruby %}
class Idea < ApplicationRecord
{% endhighlight %}

この行のあとに、次のコードを追加し、Ideaモデルに複数のcommentsが紐づくことを認識させます。

{% highlight ruby %}
has_many :comments
{% endhighlight %}

次に、1つのcommentが1つのideaに紐づくことを認識させる必要があります。`app/models/comment.rb`を開いてみてください。そこには次の内容が書かれています。

{% highlight ruby %}
class Comment < ApplicationRecord
  belongs_to :idea
end
{% endhighlight %}

commentは、`Idea`モデルを参照する`belongs_to :idea`という行によって、文字通り「ideaに属している」ことをすでに認識しています。これは、先ほどのマイグレーションで自動的に追加されました。
## データベースからコメントを取得しよう

`app/controllers/ideas_controller.rb`には`def show`と書かれた行があります。Rubyではこれらをメソッドと呼んでいます。`show`メソッドはデータベースからビュー（以前編集したHTMLが含まれるファイル） で使用するデータを読み込む役割を担っています。

`show`メソッドを以下のように変更します。

{% highlight ruby %}
def show
  @comments = @idea.comments
end
{% endhighlight %}

これにより、特定のideaに紐づくcommentsがデータベースから取得できます。そして、ビューでインスタンス変数`@comments`を使用してcommentsにアクセスできます。

## CommentsControllerを作成しよう

commentsをデータベースに保存、データベースから削除するためには、Railsのコントローラが必要です。IdeasControllerのようにコントローラはデータベースへのクエリを実行します。今回はcommentsを対象としたコントローラを作成します。

`app/controllers/`ディレクトリに`comments_controller.rb`という新しいファイルを作ります。

<div class="os-specific">
  <div class="mac nix">
{% highlight sh %}
touch app/controllers/comments_controller.rb
{% endhighlight %}
  </div>
  <div class="win">
{% highlight sh %}
ni app/controllers/comments_controller.rb
{% endhighlight %}
  </div>
</div>

作成したファイルをテキストエディタで開き、空の状態にして、次のコードをコピーペーストします。

{% highlight ruby %}
class CommentsController < ApplicationController
  before_action :set_idea, only: %i[create]
  before_action :set_comment, only: %i[destroy]

  def create
    @comment = @idea.comments.new(comment_params)

    if @comment.save
      redirect_to idea_path(@idea), notice: "Comment was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy

    redirect_to comments_url, notice: "Comment was successfully destroyed."
  end

  private

  def set_idea
    @idea = Idea.find(params[:idea_id])
  end

  def set_comment
    @comment = @idea.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:user_name, :body)
  end
end
{% endhighlight %}

このコントローラは、commentsの作成（create）と削除 （destory）のリクエストを受け付けます。このようなリクエストを受け取ると、データベースに保存や削除を指示し、元のページにリダイレクトします。しかし、その前に、このコントローラと通信するためページを作ってみましょう。

{% coach %}
コントローラがどのように動作し、HTTPリクエスト、モデル、ビューと相互作用するかを説明する。
{% endcoach %}

## コメントを表示しよう

データベースから取得したideasに紐づくcommentsをアプリに表示します。

`app/views/ideas/show.html.erb` を開いて、最後の行に次のコードを追加します。

{% highlight erb %}
<h2>Comments</h2>
<% if @comments.any? %>
  <% @comments.each do |comment| %>
    <div>
      <p><strong><%= comment.user_name %></strong></p>
      <p><%= comment.body %></p>
      <%= button_to "Destroy this comment", comment_path(comment), method: :delete, class: "btn btn-danger", form: { data: { turbo_confirm: "Are you sure?" } } %>
    </div>
  <% end %>
<% else %>
  <p>No comments found.</p>
<% end %>

<h2>Add a new comment</h2>
<%= render partial: "comments/form", locals: { comment: @comment } %>
{% endhighlight %}

このコードでcommentsが表示されますが、その前にcommentsを作成する手段が必要です。そのために、最後の2行ではコメント投稿フォームをレンダリングしています。コメント投稿フォームは次のステップで作成します。

## コメントフォームを作成しよう

フォームからデータを送信するためには、フォームのビューファイルを作成し、アプリに表示する必要があります。

`app/views/`ディレクトリに新たに`comments/`ディレクトリを作成します。そして、そのディレクトリの下に`_form.html.erb`というファイルを作成します。

<div class="os-specific">
  <div class="mac nix">
{% highlight sh %}
mkdir -p app/views/comments/
touch app/views/comments/_form.html.erb
{% endhighlight %}
  </div>
  <div class="win">
{% highlight sh %}
md app/views/comments/
ni app/views/comments/_form.html.erb
{% endhighlight %}
  </div>
</div>

この新しいファイルに、次の行をコピーペーストしてください。

{% highlight erb %}
<%= form_with(model: [idea, idea.comments.build]) do |form| %>
  <div class="mb-3">
    <%= form.label :user_name, "Your name", class: "form-label", style: "display: block"  %>
    <%= form.text_field :user_name, class: "form-control" %>
  </div>

  <div class="mb-3">
    <%= form.label :body, "Comment message", class: "form-label", style: "display: block"  %>
    <%= form.text_area :body, class: "form-control" %>
  </div>

  <%= form.submit class: "btn btn-primary" %>
<% end %>
{% endhighlight %}

ブラウザを更新すると、ideaの詳細ページにcommentを追加するためのフォームが表示されます。名前、メッセージを入力してください。そして、「コメントを作成する」ボタンをクリックします。すると、ページの上部に緑色で「Comment was successfully created.」と表示されるはずです。

おめでとうございます！あなたのアプリがcommentをサポートするようになりました！`Comment` というコメント用の新しいモデルを追加しました。このモデルは、commentsを保存するためにデータベースとやり取りします。新しい`CommentsController`は、commentsの作成と削除をモデルに指示します。ビューが更新されて、ideaごとのcommentsを表示し、フォームで新しいcommentを作成し、また削除ボタンでcommentを削除できるようになりました。

気になる方は、別のideaの詳細ページをチェックしてみてください。正しく動作していれば、そのideaの詳細ページで他のideaと同じcommentsが表示されることはないはずです。
