---
layout: default
title: Rails Girls Sinatra tutorial
permalink: sinatra-app
redirect_from:
  - sinatra-app-bg
---

# Sinatraを使って初めての投票アプリを作ってみよう

*Created by Piotr Szotkowski, [@chastell](https://twitter.com/chastell)* / *翻訳者: Junichi Ito, [@jnchito](https://twitter.com/jnchito)*

SinatraというRuby製のweb開発フレームワークを使って、ゼロから簡単な投票アプリを作ってみましょう。SinatraはRuby on Railsによく似ています。Railsと同様に、Sinatraも何かやりたいことを実現できて、とても楽しいツールです！

毎週開催している映画鑑賞マラソン向けに、友だちのグループでどんな軽食を注文しようか相談している様子を想像してください。ファストフードの選択肢はたくさんあるため、注文を決める議論には時間がかかりそうです。そこで私たちのアプリが活躍します！

{% coach %}
手短に [Sinatra](https://www.sinatrarb.com) が何なのかを説明してください。
{% endcoach %}

## Sinatraをインストールする

Ruby on Railsをインストールするのに必要だった作業を思い出してください。Sinatraでも同じことをする必要があります。

`gem install sinatra`

### 初めてのSinatraアプリを作る

`suffragist.rb` ファイルを作成し、以下の内容を書き込んでください。

{% highlight ruby %}
require 'sinatra'

get '/' do
  'Hello, voter!'
end
{% endhighlight %}


このRubyファイルには好きな名前を付けることができます。たとえば`vote.rb`という名前を付けても同じように動作します。しかし、"suffragist"（訳注：[「婦人参政権論者」](https://ejje.weblio.jp/content/suffragist)の意）は女性の権利運動における重要なできごとに関連しているので、今回はこの名前で行きましょう！


### アプリを動かす

アプリを配置したディレクトリに移動し、`ruby suffragist.rb`を実行してください。
すると、<a href="localhost:4567" target="_blank">localhost:4567</a>にアクセスできます。
ページには"Hello, voter!"と表示されているはずです。これは新しく作ったアプリが正常にページを生成した証拠です。
ターミナル上で <kbd>Ctrl</kbd>+<kbd>C</kbd> を入力し、サーバを停止してください（ <kbd>Ctrl</kbd>+<kbd>C</kbd> で停止できない場合は、Windows環境だからかもしれません。その場合は <kbd>Ctrl</kbd>+<kbd>Z</kbd>/ <kbd>Ctrl</kbd>+<kbd>Pause</kbd> / <kbd>Ctrl</kbd>+<kbd>Break</kbd> を入力すれば停止するはずです）。

{% coach %}
POSTメソッドとGETメソッドについて説明してください。さらに、それがブラウザとどのように通信するのかについても説明してください。
{% endcoach %}



### indexビューを追加する

きちんと整理整頓するために、ビューを保存するディレクトリを作りましょう
（そのディレクトリは`views`という名前にします）。

`views`ディレクトリに`index.erb`というファイルを作り、以下のコードを入力してください。

{% highlight erb %}
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Suffragist</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <p>What's for dinner?</p>

      <form action="cast" method="post">
        <div class="mb-3">
          <% Choices.each do |id, text| %>
            <div class="form-check">
              <input type="radio" name="vote" value="<%= id %>" class="form-check-input" id="vote_<%= id %>" />
              <label class="form-check-label" for="vote_<%= id %>">
                <%= text %>
              </label>
            </div>
          <% end %>
        </div>

        <button type="submit" class="btn btn-primary">Cast this vote!</button>
      </form>
    </div>
  </body>
</html>
{% endhighlight %}

`suffragist.rb`には以下のコードを入力します。

{% highlight ruby %}
Choices = {
  'HAM' => 'Hamburger',
  'PIZ' => 'Pizza',
  'CUR' => 'Curry',
  'NOO' => 'Noodles',
}
{% endhighlight %}

それから `get` アクションを変更してください。

{% highlight ruby %}
get '/' do
  erb :index
end
{% endhighlight %}

`ruby suffragist.rb`を実行し、
結果を確認したらサーバを <kbd>Ctrl</kbd>+<kbd>C</kbd> で停止してください。

{% coach %}
HTMLとerbについて簡単に話してください。テンプレートについても説明してください。
グローバルな定数が何なのかも説明してください。
{% endcoach %}



### テンプレート

`views`ディレクトリの`index.erb`ファイルを開いて、
`<h1>…</h1>` の行を追加してください。

{% highlight erb %}
  <body>
    <div class="container">
      <h1><%= @title %></h1>
      <p>What's for dinner?</p>
{% endhighlight %}

`get`アクションを以下のように変更してください。

{% highlight ruby %}
get '/' do
  @title = 'Welcome to the Suffragist!'
  erb :index
end
{% endhighlight %}

{% coach %}
インスタンス変数とは何なのか、
そしてSintraではそれをどうやってビューで表示しているのかを説明してください。
{% endcoach %}



### 結果を投票（POST）できる機能を追加する

以下のコードを`suffragist.rb`に追加します。

{% highlight ruby %}
post '/cast' do
  @title = 'Thanks for casting your vote!'
  @vote  = params['vote']
  erb :cast
end
{% endhighlight %}

`views`ディレクトリに`cast.erb`という新しいファイルを作成し、
Rubyのコードが埋め込まれたHTMLを入力してください。

{% highlight erb %}
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Suffragist</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h1><%= @title %></h1>
      <p>You cast: <%= Choices[@vote] %></p>
      <p><a href="/results">See the results!</a></p>
    </div>
  </body>
</html>
{% endhighlight %}

{% coach %}
POSTがどのように動作するのかを説明してください。フォームから何が送信されたのかを確認するにはどうすればいいですか？
`params`はどこからやってきたのでしょうか？
{% endcoach %}



### 共通レイアウトを使ってリファクタリングする

`views`ディレクトリに`layout.erb`を作成してください。
そこに次のコードを入力してください。

{% highlight erb %}
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Suffragist</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h1><%= @title %></h1>
      <%= yield %>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
{% endhighlight %}

他の2つのテンプレートから上記のコードを削除してください
（2つのテンプレートとは`views`ディレクトリの`index.erb`と`cast.erb`のことです）。

{% coach %}
HTMLの構造と、コードを共通化する一般的なリファクタリング方法について説明してください。
`yield`の役割についても説明してください。
{% endcoach %}



### resultsというルーティングとビューを追加する

以下のコードを`suffragist.rb`にペーストしてください。

{% highlight ruby %}
get '/results' do
  @votes = { 'HAM' => 7, 'PIZ' => 5, 'CUR' => 3 }
  erb :results
end
{% endhighlight %}

`views`ディレクトリに`results.erb`という新しいファイルを作成してください。

{% highlight erb %}
<table class="table table-hover table-striped">
  <% Choices.each do |id, text| %>
    <tr>
      <th><%= text %></th>
      <td><%= @votes[id] || 0 %>
      <td><%= '#' * (@votes[id] || 0) %></td>
    </tr>
  <% end %>
</table>
<p><a href="/">Cast more votes!</a></p>
{% endhighlight %}

`ruby suffragist.rb`を実行し、
結果を確認したら <kbd>Ctrl</kbd>+<kbd>C</kbd> でサーバを停止してください。

{% coach %}
HTMLテーブルについて説明してください。
ハッシュの値が見つからないときにデフォルトで0になる理由についても説明してください。
{% endcoach %}



### YAML::Storeを使って結果を永続化する

新しいことをやるときが来ました！選択した結果を保存しましょう。

`suffragist.rb`の一番上に以下のコードを追加してください。

{% highlight ruby %}
require 'yaml/store'
{% endhighlight %}

`suffragist.rb`にさらにコードを追加します。
`post '/cast'` と `get '/results'` を以下のコードに置き換えてください。

<!--
Do not change the .yaml extension to .yml.

rerun, the most popular solution for restarting Sinatra if source files change, watches for .yml
files by default.

As a result, if after an attendee starts using rerun, rerun will restart the server any time a vote
is cast, leading to unexpected behavior from the app.
-->

{% highlight ruby %}
post '/cast' do
  @title = 'Thanks for casting your vote!'
  @vote  = params['vote']
  @store = YAML::Store.new 'votes.yaml'
  @store.transaction do
    @store['votes'] ||= {}
    @store['votes'][@vote] ||= 0
    @store['votes'][@vote] += 1
  end
  erb :cast
end

get '/results' do
  @title = 'Results so far:'
  @store = YAML::Store.new 'votes.yaml'
  @votes = @store.transaction { @store['votes'] }
  erb :results
end
{% endhighlight %}

{% coach %}
YAMLが何なのかを説明してください。
{% endcoach %}


### 投票時のYAMLファイルの変化を確認する

`votes.yaml`を開きましょう。そして投票してください。それからもう一度確認してください。

{% coach %}
サーバを再実行する前に
サーバの停止を忘れる生徒がときどきいます。
解決策をインターネットで検索する良い機会です。
解決策を検索する上で、プロセスをすべてkillする全ての方法を知る必要はありません。
{% endcoach %}

{% coach %}
最後にSinatraとRailsの違いを簡単に説明してください。
{% endcoach %}



## アプリで遊んでみる

自分の好きなようにアプリを変更してみましょう。

* ビューにロジックを追加してみる
* resultsに直接リダイレクトしてみる
* さらに投票してみる。YAMLファイルはどう変化するか？
* Sort the results by the number of votes.
* いろんな方法でファイルにスタイルを適用してみる