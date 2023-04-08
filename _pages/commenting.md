---
layout: default
title: Rails Girls アプリのコメント機能
permalink: commenting
---
# Rails Girls アプリのコメント機能
*Created by Janika Liiv, [@janikaliiv](https://twitter.com/janikaliiv)*

*railsgirls* アプリのideas へコメントができるような追加をします。
Rails のインストールと ideas アプリ構築についての手順は、 [こちら](/app) を参照ください。

## *1.*Comment の scaffold をする

Comment のコメント者名、コメント本文(コメント内容)、Idea テーブルへの関係 (`references`) を scaffold しましょう。
{% highlight sh %}
rails generate scaffold comment user_name:string body:text idea:references
{% endhighlight %}
これで新しくコメントテーブルが作成された事をデータベースに教えてあげるためのマイグレーションファイルが作成されました。
マイグレーションを実行するには下記のコマンドを実行します。

{% highlight sh %}
rails db:migrate
{% endhighlight %}

## *2.*モデルに関係 (relations) を追加する

ideas と comments オブジェクト間の接続を Rails に認識させる必要があります。
一つの idea はたくさんの comments を所有することができるものとして、Idea モデルに認識させます。
`app/models/idea.rb` を開いて、

{% highlight ruby %}
class Idea < ApplicationRecord
{% endhighlight %}

この行のあとに、次のコードを追加します。

{% highlight ruby %}
has_many :comments
{% endhighlight %}

また、comment は、ある idea に属するものとして認識させます。
app/models/comment.rb を開いて、

{% highlight ruby %}
class Comment < ApplicationRecord
{% endhighlight %}

この行のあとに、次のコードを追加します。

{% highlight ruby %}
belongs_to :idea
{% endhighlight %}

## *3.*コメントフォームの表示と編集

app/views/ideas/show.html.erb を開いて、

{% highlight erb %}
<p>
  <strong>Picture:</strong>
  <%= image_tag(@idea.picture_url, width: 600) if @idea.picture.present? %>
</p>
{% endhighlight %}

このあとに、次のコードを追加します。

{% highlight erb %}
<h3>Comments</h3>
<% @comments.each do |comment| %>
  <div>
    <strong><%= comment.user_name %></strong>
    <br />
    <p><%= comment.body %></p>
    <p><%= link_to 'Delete', comment_path(comment), data: { turbo_method: :delete, turbo_confirm: '削除してもよろしいですか？' } %></p>
  </div>
<% end %>
<%= render 'comments/form', comment: @comment %>
{% endhighlight %}

`app/controllers/ideas_controller.rb` の show action の、

{% highlight ruby %}
def show
end
{% endhighlight %}

この部分を以下のように書き換えます。

{% highlight ruby %}
def show
  @comments = @idea.comments.all
  @comment = @idea.comments.build
end
{% endhighlight %}

`app/views/comments/_form.html.erb` を開いて、

{% highlight erb %}
<div class="field">
  <%= form.label :body %>
  <%= form.text_area :body %>
</div>
{% endhighlight %}

このあとに、次のタグを追加します。

{% highlight erb %}
<%= form.hidden_field :idea_id %>
{% endhighlight %}

最後にこちらを削除します。

{% highlight erb %}
<div class="field">
  <%= form.label :idea_id %>
  <%= form.number_field :idea_id %>
</div>
{% endhighlight %}

これだけで、今加えた idea アプリケーションが表示され、comment 挿入・削除フォームが見えるはずです。
