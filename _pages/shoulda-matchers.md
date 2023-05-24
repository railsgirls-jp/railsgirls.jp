---
layout: guide
title: shoulda matchersでテストを簡潔にしよう
permalink: testing-shoulda-matchers
---

# Shoulda Matchersでテストを簡潔にしよう

*作成者： Ana Schwendler, [@anaschwendler](https://twitter.com/anaschwendler)*

**このガイドは** [**Rails Girls アプリ・チュートリアル**](/app)
**及び** [**Rspecチュートリアル**](/testing-rspec)
**、そして** [**コメント機能チュートリアル**](/commenting)
**を完了して、Rails Girlsアプリが作成済みの方を対象にしています。**

[Shoulda Matchers](https://github.com/thoughtbot/shoulda-matchers) はRubyのテスト用Gemで、Railsの一般的な機能テストをRSpecとMinitest互換のワンライナーにします。こちらを使用しない場合機能テストはより冗長で複雑になり、エラーが起きやすくなるでしょう。

{% coach %}
テストと振る舞い駆動開発について説明してください。
{% endcoach %}

## *1.* Shoulda Matchers gemを追加する

`Gemfile`を開いて`:test` グループのendタグの上に以下の行を追加します。

{% highlight ruby %}
group :test do
  ...
  gem 'shoulda-matchers'
end
{% endhighlight %}

そしてgemをインストールする為に以下のコマンドを実行してください。
{% highlight sh %}
bundle install
{% endhighlight %}


{% coach %}
ターミナルの出力内容をgoogle検索して、結果について説明してください。
{% endcoach %}

## *2.* `rails_helper.rb`を修正する

今回のケースでは、RSpecを利用してプロジェクトをテストするので、`rails_helper.rb` にShoulda Matchersを使用することを記述する必要があります。

最後のendタグの上に配置してください(インデントも確認してください)

{% highlight ruby %}
  Shoulda::Matchers.configure do |config|
    config.integrate do |with|
      # テストフレームワークを選択:
      with.test_framework :rspec
      with.library :rails
    end
  end
{% endhighlight %}

{% coach %}
なぜ`rails_helper.rb`内のGemの記述を修正しているのか説明してください。
{% endcoach %}

ターミナル上で以下のコマンドを実行してください。
{% highlight sh %}
rspec spec/models/idea_spec.rb
{% endhighlight %}

テストが正常に動作していることが表示されるはずです。

## *3.* テストしましょう！

Shoulda Matchersを使ったテストはとても簡単です。
最初のテストは[**Rails Girls アプリのコメント機能**](/commenting)で既に記述した、「ideaは複数のcommentを所有することができること」についてです。

これが正しく動作しているかをどうかをテストする為には、`spec/lib/idea_spec.rb`内の最初に作成したテストケースの真上に、以下の行を追加します。

{% highlight ruby %}
  describe "associations" do
    it{ is_expected.to have_many(:comments) }
  end
{% endhighlight %}

これは関連付けのテストです。
{% coach %}
関連付けのテストについて説明してください。
{% endcoach %}

## *4.* テスト駆動開発

{% coach %}
テスト駆動開発と、テストから始めるアプリの機能開発について説明してください。
{% endcoach %}

私たちがアプリに追加出来るもう一つの機能は、ideaに常に名前を付けられるようにすることです。どうすればそのような機能を実装できるのでしょうか？まずideaには必ず名前があるということから始めてみましょう。

それでは対象のテストを作ることから始めましょう。`spec/lib/idea_spec.rb`に次の行を追加します。

{% highlight ruby %}
  describe "validations" do
    it{ is_expected.to validate_presence_of :name }
  end
{% endhighlight %}

この行を関連付けテストの下に追加してください。

そしてターミナル上で以下のコマンドを実行します。
{% highlight sh %}
rspec spec/models/idea_spec.rb
{% endhighlight %}

これは適切なバリデーションが行われていないことを示しています(実際にバリデーションしていません)。
そこで、次の行をモデルに追加してideaにnameが存在することを検証する必要があります。

{% highlight ruby %}
  validates :name, presence: true
{% endhighlight %}

この行をhas_many文の下に追加してください。

そして、ターミナルに戻って以下のコマンドを実行します。
{% highlight sh %}
rspec spec/models/idea_spec.rb
{% endhighlight %}

正常な結果が返ってくるはずです。

## *5.* 自分で進めてみよう！
このチュートリアルの続きとして、ideaの説明(description)の存在を検証するテストを行うことが出来ますか？

他のテストケースを作る想像ができますか？

それでは善いテストを！
