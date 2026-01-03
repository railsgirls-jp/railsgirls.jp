---
layout: default
title: テスト駆動開発
permalink: test-driven-development
---

# テスト駆動開発

*Written by Gregory McIntyre, [@gregmcintyre](https://twitter.com/gregmcintyre)*
*Translated by Toshiki Iwama, [@avenue2115](https://twitter.com/avenue2115)*

この演習では、*テスト駆動開発* (TDD)という言葉を使うとき、どのようなことを意図しているのかを学びます。

## 背景情報

**ローマ数字**

もしローマ数字にあまりなじみがないようでしたら、演習を続ける前に [ローマ数字についての解説][Roman numerals] に事前に目を通してください。  
要約として、ローマではどのように数字を書いたのか、いくつか例を記載します。

<style>
.roman-table th,
.roman-table td { padding: 0 1rem; }
.roman-table thead tr { border-bottom: 1px solid black; }
.roman-table tr:nth-child(even) td { background-color: #eee; }
</style>

<table class="roman-table">
  <thead>
    <tr>
      <th>アラビア数字</th>
      <th>ローマ数字</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><tt>I</tt></td>
    </tr>
    <tr>
      <td>4</td>
      <td><tt>IIII</tt> (or <tt>IV</tt>)</td>
    </tr>
    <tr>
      <td>5</td>
      <td><tt>V</tt></td>
    </tr>
    <tr>
      <td>6</td>
      <td><tt>VI</tt></td>
    </tr>
    <tr>
      <td>7</td>
      <td><tt>VII</tt></td>
    </tr>
    <tr>
      <td>9</td>
      <td><tt>VIIII</tt> (or <tt>IX</tt>)</td>
    </tr>
    <tr>
      <td>10</td>
      <td><tt>X</tt></td>
    </tr>
    <tr>
      <td>50</td>
      <td><tt>L</tt></td>
    </tr>
    <tr>
      <td>100</td>
      <td><tt>C</tt></td>
    </tr>
    <tr>
      <td>500</td>
      <td><tt>D</tt></td>
    </tr>
    <tr>
      <td>1000</td>
      <td><tt>M</tt></td>
    </tr>
  </tbody>
</table>

左の列の整数を右の列の文字列に変換するプログラムを書いてみます。それが済んだら、*IV* のような *減算表現の数値* でも動くようにします。

**グループ作業のためのガイド**

この演習は 2 ~ 4 人で行うことをお勧めします。  
なぜなら、これらのルールは *ペアプログラミング* を行う方法に似ていて、この演習自体それを実践してみることも目的の一つとしているからです。

- 各グループで1つ *Sublime Text* の入ったノートPCのある **作業席** を決めます
- ほかの人は **ノートPCを閉じて**、作業席の周りに座るようにします
- 次の人が作業ができるよう、定期的に全員の座席を **持ち回りで変えていきます**。席替えのタイミングは後述します。
- 作業者を決めてください。その人は席替えを言い渡されるまで作業を続けます。

**Coach:** ペアプログラミングがどう役立つかを説明してください。

## *1.* 最初のコード

このコードを`roman.rb`にコピーして下さい。

{% highlight ruby %}
def roman(n)
  return "?"
end

require "minitest/spec"
require "minitest/autorun"

describe "roman" do
  it "converts the number 1 to the string I" do
    roman(1).must_equal "I"
  end
end
{% endhighlight %}

**テストする**

ターミナルで次のコードを実行してください。

{% highlight sh %}
ruby roman.rb
{% endhighlight %}

**出力**

次の実行結果が確認できます。

{% highlight sh %}
roman#test_0001_converts the number 1 to the string I [tdd1.rb:11]:
Expected: "I"
  Actual: "?"

1 tests, 1 assertions, 1 failures, 0 errors, 0 skips
{% endhighlight %}

出力結果をじっくり読んでみてください。かなり端的に結果が示されています。  

テストは **red**です。つまり、最低一つテストが失敗しています。最後の要約を確認することで、テストが失敗していることを確認できます。`1 tests, 1 assertions, 1 failures, 0 errors, 0 skips`

**席替え** 次の人に席を譲ってください。

**Coach:** TDD がどう役立つかを説明してください。

## *2.* テストをパスさせる

テストをパスさせる時が来ました。  
ここではあなたが適切と考える方法で行ってみましょう。`if`文を1つ増やしたり、文字を1つ増やしたりする程度でかまいません。一般的にみても、不要なコードは記述すべきではないからです。困ったら周りの人に意見をきいてみてもいいでしょう。

最初にテストに合格する方法を紹介します。これによりスムーズに進めることができるでしょう。

{% highlight ruby %}
def roman(n)
  return "I"
end
{% endhighlight %}

ふざけてみえるでしょうか。正しい意見です。しかし、すべてのテストに合格するという観点で考えれば、これも有効な解決策です。  
テストがすべて合格であれば、**green**です。

## *3.* リファクタリングする

コードを確認して **リファクタリング** (コードをきれいにして読みやすくすること)をした方がいいか判断します。もしリファクタリングしなくてもよさそうならば、このステップは飛ばしてください。

**Hint**: *繰り返し* に気づいたら、リファクタリングのいい機会です。テストを修正できそうでしたら、お好みでどうぞ。

リファクタリングをしたらテストを実行します。失敗したなら、誤って何かを壊してしまったということです。

**Coach:** テストができるよう十分に小さな箇所に焦点を当てることが、どう役立つのかを説明してください。

## *4.* 新たに失敗するテストを作る

全員がコードが一般的に動作すると同意すること。これ以上のテストケースが思い浮かばず、そのすべてが合格であるならば、演習を終えてもかまいません。あなたの勝ちです！

そうでなければ、最後に新たなテストを作成します。いまのところ、数値の 1 が `"I"`に変換されることを確かめるテストがあります。しかし、その他のすべての数値が期待通りに変換されることを確かめるにはもっとテストが必要です。異なる数値のための新しいテストを追加する際は、必ずテストを実行して失敗することを確認してください。行き詰ってしまった場合は、このページの下にいくつかの提案があります。

前のテストをコピーして貼り付け、流用してもいいです。いくらでも好きに変えることができます。テストは段々複雑になっていくはずですが、失敗する限りは、単純なテストケースを追加してもかまいません。

グループのメンバーと一緒に質問をしあったり、問題を見つけるのもいいでしょう。

拡張したテストスイートの例を紹介します。

{% highlight ruby %}
describe "roman" do
  it "converts the number 1 to the string I" do
    roman(1).must_equal "I"
  end

  it "converts the number 2 to the string II" do
    roman(2).must_equal "II"
  end
end
{% endhighlight %}

再びテストは **red** となります。 少なくとも1つテストが失敗しています。

**席替え** 次の人に変わってください。

## 繰り返そう!

ステップ 2 ~ 4 を繰り返し、ステップ 4 の最後で次の人に変わるようにしてください。チームのみんなが「終わった」と感じたときに、作業を完了とします。

すべてのケースを完了しなくてはならないとは考えなくても大丈夫です。目標は、手順をこなし、仲間と協力して作業を行うことを学ぶことです。 テストを作成することやテストをパスさせることに慣れてください。練習あるのみです。

## ヒント

テストのアイデアに行き詰ってしまったときのために、 テスト作成のためのローマ数字のリストを順に紹介します。段階的に複雑になっていきます。

:--------- | :-----------
入力      | 出力
:--------- | :-----------
 `1`       | `"I"`
 `5`       | `"V"`
 `4`       | `"IIII"`
 `6`       | `"VI"`
 `7`       | `"VII"`
 `10`      | `"X"`

ここまで来たら、部分的にはできたといっていいでしょう。  
その昔ローマ人は 4 として `IIII` を用いていました。アナログ時計の 4 が `IIII` なのはそのためです。その後、*減算数字* が追加されました。
これらをプログラムするのはもっと大変です。プログラムが上のすべての数値を処理できることに自身が持てたら、*減算数字* を処理してみてください。

:--------- | :-----------
入力      | 出力
:--------- | :-----------
`4`        | `"IV"`
`14`       | `"XIV"`
`2896`     | `"MMDCCCXCVI"`

[Roman numerals]: https://www.math.tsukuba.ac.jp/~tasaki/explanation/roman.html
