---
layout: main_guide
title: You better check you app, before you wreck your app
permalink: testing-rspec
---

# RSpecでアプリをテストしよう

*Created by Clemens Helm, [@clemenshelm](https://twitter.com/clemenshelm) and Floor Drees, [@floordrees](https://twitter.com/floordrees)*/

*Updated by Ana Schwendler, [@anaschwendler](https://twitter.com/anaschwendler)*

*翻訳者: Ryoki Inoue, [@r_i_engineer](https://twitter.com/r_i_engineer)*

**このガイドでは、Rails Girlsアプリをすでに構築していることを前提に説明します。** [**アプリ構築の方法はこちら**](/app)

[RSpec](https://github.com/rspec/rspec-rails)は Ruby のテストフレームワークで、Rubyとは少し違うような文法でアプリケーションの動作を記述します。ターミナルにテスト結果が出力されるので、自分の読解力も試されます(冗談です笑)

__COACH__: テストと行動駆動型開発について説明してください。

## *1.*RSpecのgemを追加しよう

`Gemfile`を開き、`:development`、`:test`のendタグの上に、以下の行を追加します。

{% highlight ruby %}
group :development, :test do
  ...
  gem 'rspec-rails', '~> 3.5'
end
{% endhighlight %}

以下を実行し、gemをインストールします。
{% highlight sh %}
bundle install
{% endhighlight %}

次はアプリケーションの中に`spec/`ディレクトリを作成します。

{% highlight sh %}
mkdir spec/
{% endhighlight %}

`spec/` ディレクトリはテストファイルが置かれる場所です。最後に次のコマンドを実行します。

{% highlight sh %}
rails generate rspec:install
{% endhighlight %}


これにより設定に使用される以下のファイルが追加されます。

- `.rspec`
- `spec/spec_helper.rb`
- `spec/rails_helper.rb`

## *2.*最初のテストを作成しよう!

Rubyistはよく「テスト」と「仕様」という言葉を区別せずに使っていますが、それはテストを「specs」フォルダに格納するためです。
そのためには、以下の手順を実行します。

`idea`モデルのテストを作成しますが、Railsで簡潔に行うには

* `spec`フォルダの中に`models`フォルダを作成するため以下をターミナルで実行します。
{% highlight sh %}
mkdir spec/models
{% endhighlight %}

* テストを`idea_spec.rb` (`<モデル名>_spec.rb`)として保存します。

その新しいファイルの中で、アイデアに名前があることを最初のテストで確認します。そのため仕様の1つを説明しましょう。

{% highlight ruby %}
require "rails_helper"

RSpec.describe Idea, type: :model do
  it "has a name" do
    skip
  end
end
{% endhighlight %}

ターミナルで以下を実行します。
{% highlight sh %}
rspec spec/models/idea_spec.rb
{% endhighlight %}

これは、テストがまだ実装されていないため保留中であることが出力されます。

__COACH__: ターミナル出力についてグーグル検索するよう説明してください。

ではテストを実装しましょう！
{% highlight ruby %}
require "rails_helper"

RSpec.describe Idea, type: :model do
  it "has a name" do # yep, you can totally use 'it'
    idea = Idea.create!(name: "My Awesome Idea Name") # creating a new idea 'instance'
    expect(idea.name).to eq("My Awesome Idea Name") # this is our expectation
  end
end
{% endhighlight %}

これにより期待している出力が得られるはずです。

## *3.*リファクタリング

実際に2つのIdeaを作成して、プロジェクトが正しい方法でIdeaを作成していることを確認することもできます。



{% highlight ruby %}
require "rails_helper"

RSpec.describe Idea, type: :model do
  it "has a name" do # yep, you can totally use 'it'
    idea = Idea.create!(name: "My Awesome Idea Name") # creating a new idea 'instance'
    second_idea = Idea.create!(name: "My Second Idea Name") # creating another new idea 'instance'
    expect(second_idea.name).to eq("My Second Idea Name") # this is our expectation
  end
end
{% endhighlight %}

というように、より多くのことをテストすることができます。

__COACH__: リファクタリングについて説明してください。

## *4.*テストにTo Doマークを付けてみよう

テストでTo Doリストを作れたら便利ですよね。
RSpecの便利な機能として、特定のテストを保留にする機能があります。つまり、最初に「何を実装するか」を考え、それがうまくいっているかどうかを検証するためのテストを記述するのです。

次のテストは、`idea_spec.rb`に以下の行を追加して作成しましょう。

{% highlight ruby %}
it "has a description"
{% endhighlight %}

テストを保留としてマークします。

このテストを完成させますか？それとも他のテストについて考えますか？

## *5.*ビヘイビア駆動開発をしてみよう
__COACH__: ビヘイビア駆動開発について説明してください。

もう一人でいろんなテストを作れるようになったのではないでしょうか。もっといろんなテストを書きたい時はコーチに遠慮なく相談してください。

Happyテスティング！
