---
layout: default
title: Rails Girls アプリのコメント機能
permalink: commenting
---
# Rails Girls アプリのコメント機能
*Created by Janika Liiv, [@janikaliiv](https://twitter.com/janikaliiv)*

*railsgirls* アプリのideas へコメントができるような追加をします。
Rails のインストールと ideas アプリ構築についての手順は、 [こちら](/app) を参照ください。

## Step 1: foreigner gem の追加

Gemfile に次の gem を追加します。
``` ruby
gem 'foreigner'
```

もしターミナルでサーバーが動いていれば止め、次のコマンドを実行します。
``` sh
bundle install
```

## Step 2: Comment の scaffold をする

Comment のコメント者名、コメント本文(コメント内容)、Idea テーブルへの関係 (idea_id) を scaffold しましょう。
``` sh
rails g scaffold comment user_name:string body:text idea_id:integer
```

## Step 3: 外部キー (foreign key) を追加する
migration に外部キー (foreing key) を追加します。db/migrate/ 内のファイル名の最後が 'create_comments.rb' というファイルを開いて、
``` ruby
t.timestamps
end
```

の下に、次のコードを追記してください。

``` ruby
add_foreign_key :comments, :ideas
```

そして、ターミナルで次のように入力して、データベースを変更する migrate を実行します。

``` sh
rake db:migrate
```

サーバーをスタートさせましょう。

``` sh
rails s
```

## Step 4: モデルに関係 (relations) を追加する

ideas と comments オブジェクト間の接続を Rails に認識させる必要があります。
一つの idea はたくさんの comments を所有することができるものとして、Idea モデルに認識させます。
app/models/idea.rb を開いて、

``` ruby
class Idea < ActiveRecord::Base
```

この行のあとに、次のコードを追加します。

``` ruby
has_many :comments
```

また、comment は、ある idea に属するものとして認識させます。
app/models/comment.rb を開いて、

``` ruby
class Comment < ActiveRecord::Base
```

この行のあとに、次のコードを追加します。

``` ruby
belongs_to :idea
```

## Step 5: コメントフォームの表示と編集

app/views/ideas/show.html を開いて、

``` erb
<%= image_tag(@idea.picture_url, :width => 600) if @idea.picture.present? %>
```

この行のあとに、次のコードを追加します。

``` erb
<h3>Comments</h3>
<% @idea.comments.each do |comment| %>
  <div>
    <strong><%= comment.user_name %></strong>
    <br />
    <p><%= comment.body %><p>
  </div>
<% end %>
<%= render 'comments/form' %>
```

app/controllers/ideas_controller.rb の show action には、

``` ruby
@idea = Idea.find(params[:id])
```

この次のあとに、こちらを追加します。

``` ruby
@comment = @idea.comments.build
```

最後に、 comments/_form.html を開いて、

``` erb
  <div class="field">
    <%= f.label :body %><br />
    <%= f.text_area :body %>
  </div>
```

このあとに、次のタグを追加します。

``` erb
<%= f.hidden_field :idea_id %>
```

これだけで、今加えた idea アプリケーションが表示され、comment 挿入フォームが見えるはずです。
