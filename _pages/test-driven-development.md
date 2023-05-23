---
layout: default
title: Test Driven Development
permalink: test-driven-development
---

# テスト駆動開発

*Written by Gregory McIntyre, [@gregmcintyre](https://twitter.com/gregmcintyre)*  
*Translated by Toshiki Iwama, [@avenue2115](https://twitter.com/avenue2115)*

この演習では、*テスト駆動開発* (TDD)という言葉を使うときどのようなことを意図しているのかを学びます。

## 背景情報

**ローマ数字**

If you are not already familiar with Roman numerals, please read up
on [how Roman numerals work][Roman numerals] before continuing.
In summary, here are some examples of how Roman people wrote numbers:

もしローマ数字にあまりなじみがないようでしたら、演習を続ける前に [ローマ数字についての解説][Roman numerals] に事前に目を通してください。  
ローマではどのように数字を書いたのか、いくつか例を記載します。

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

We are going to write a program that takes an integer value in the left column
and calculates the equivalent string value in the right column. If we finish
that, we will then make it work with the *subtractive digits* like *IV*.

左の列の整数を右の列の文字列に変換するプログラムを書いてみます。それが済んだら、*IV* のような*減算表現の数値*でも動くようにします。

**Guide for working in a group**

**グループ作業のためのガイド**

We encourage doing this exercise in a group of 2-4 people. The rules that
govern how this works are very similar to how programmers do *pair programming*
and this exercise is also intended to give you some exposure to that practice
also.

この演習は2~4人で行うことをお勧めします。  
なぜなら、これらのルールは *ペアプログラミング* を行う方法に似ていて、この演習自体ペアプログラミングを実践することも目的の一つとしているからです。

- Each group has one **hot seat** with laptop and *Sublime Text* ready.
- Everybody else should **close their laptops** and sit around the hot seat chair.
- You will all regularly stand up and **rotates chairs** so the next person is
  in the hot seat. The steps below explain when to do that.
- Pick somebody to start in the hot seat. That person should follow all the
  steps until swapping seats is mentioned.

- 各グループで1つ*Sublime Text*の入ったノートPCのある**作業席**を決めます
- ほかの人は**ノートPCを閉じて**、作業席の周りに座るようにします
- 次の人が作業ができるよう、定期敵に全員の座席を**持ち回りで変えていきます**。席替えのタイミングは後述します。
- 作業者を決めてください。その人は席替えを言い渡されるまで作業を続けます。

**Coach:** Explain how pair programming can be useful.

**Coach:** ペアプログラミングがどう役立つかを説明してください。

## *1.* Initial code

## *1.* 最初のコード

Copy this code into a file called `roman.rb`:

このコードを`roman.rb`にコピーして下さい:

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

**Run your tests**

**テストする**

If you use *Sublime Text* on Linux, OSX Mavericks (or later) or Windows, you
can run the tests by pressing <kbd>Ctrl</kbd>+<kbd>B</kbd>. Otherwise you can type the following into
your terminal:

ターミナルで次のコードを実行してください。

{% highlight sh %}
ruby roman.rb
{% endhighlight %}

**Output**

**出力**

You should see the following output from the tests:

次の実行結果が確認できます:

{% highlight sh %}
roman#test_0001_converts the number 1 to the string I [tdd1.rb:11]:
Expected: "I"
  Actual: "?"

1 tests, 1 assertions, 1 failures, 0 errors, 0 skips
{% endhighlight %}

Take a moment to read this output carefully. It is quite a mouthful.

注意して読んでください。かなり端的です。

Your tests are now **red**. i.e. One or more of the tests are failing. You can
tell you have a failing test by checking the summary at the end: `1 tests, 1
assertions, 1 failures, 0 errors, 0 skips`.

テストは **red**です。 つまり、最低一つテストが失敗しています。最後の要約を確認することで、テストが失敗していることを確認できます: `1 tests, 1
assertions, 1 failures, 0 errors, 0 skips`.

**席替え** 次の人に籍を譲ってください。

**Coach:** TDD がどう役立つかを説明してください。

## *2.* Make the tests pass

## *2.* テストをパスさせる

It is time to make the test pass. Do this however you see fit. It's fine if the
change is just an extra `if` statement or one extra character. In fact, that is
encouraged: you generally shouldn't write unnecessary code. If you're stuck,
you can ask the people around you for their opinions.

テストをパスさせる時が来ました。 
ここでは必要なことだけをしてください。変更が単純な`if`文や1文字の追加であれば特に問題はありません。実際、一般論として不要なコードは記述すべきではないからです。困ったら周りの人の意見をきいてみるといいでしょう。

Here is a way that you could make the first test pass, just to get you into the
swing of things:

最初にテストに合格する方法を示します。これによりスムーズに進めることができるでしょう:

{% highlight ruby %}
def roman(n)
  return "I"
end
{% endhighlight %}

If this seems facetious, you're right but it is a valid solution because it
makes all the tests pass. When your tests all pass, we call them **green**.

ふざけてみえるでしょうか。正しい意見です。しかし、すべてのテストに合格するという観点で考えれば、これも有効な解決策です。  
テストがすべて合格であれば、**green**です。

## *3.* Refactor your code

## *3.* リファクタリングする

Look over the code and decide if it's a good idea to **refactor** it (clean up
the code and make it easier to read). If you decide to not to refactor, skip
this step.

コードを確認して **リファクタリング** (コードをきれいにして読みやすくすること)をした方がいいかどうか判断します。もしリファクタリングしなくてもよさそうならば、このステップは飛ばしてください。

**Hint**: It's a good time to refactor when you notice *repetition*. If you
like, you can also refactor the tests.

**Hint**: *繰り返し* に気づいたら、リファクタリングのいい機会です。 したければ、テストをリファクタリングするのもいいでしょう。

Run your tests after refactoring. If they fail, you accidentally broke
something.

リファクタリングをしたらテストを実行します。失敗したのなら、誤って何かを壊してしまったということです。

**Coach:** Explain how focusing on something small enough to test can be useful.

**Coach:** テストができるよう十分に小さな箇所に焦点を当てることがどう役立つのかを説明してください。

## *4.* Write a new failing test

## *4.* 新たな失敗するテストを作る

If you all agree that the code should work in general, and you can't think of
any more cases to test and everything passes, you can stop here. You win!

全員がコードが一般的に動作すると認めること。これ以上のテストケースが思い浮かばず、そのすべてが合格であるならば、演習を終えてもかまいません。あなたの勝ちです！

Otherwise, your last job in the hot seat is to write a new test. We currently have a test that checks that the number one is turned into an `"I"`, but we need more tests to verify that all other numbers convert as expected. When you add a new test for another number, be sure to run the tests to find your test fail. If you're stuck, there are some suggestions at the bottom of this page.

Otherwise, your last job in the hot seat is to write a new test. 

そうでなければ、最後に新たなテストを作成します。いまのところ、数値の 1 が `"I"`に変換されることを確かめるテストがあります。しかし、その他のすべての数値が期待通りに変換されることを確かめるにはもっとテストが必要です。異なる数値のための新しいテストを追加する際は、必ずテストを実行して失敗することを確認してください。行き詰ってしまった場合は、このページの下にいくつかの提案があります。

You can copy and paste the previous test and alter it. You can change it to be
anything you like. Your tests should probably test the next trickiest
situation, but if you feel like going back and adding a simpler case, that's
fine too as long as it fails.

前のテストをコピーして貼り付け、流用してかまいません。いくらでも好きに変えることができます。次のテストはおそらく最も変則的な状況をテストするもので、これが失敗する限りは、戻って単純なテストケースを追加してもかまいません。

The other members of the group can chime in and ask questions or spot problems
for you.

グループのメンバーと一緒に質問をしあったり、問題を見つけたりできます。

Here is an example of an expanded test suite:

拡張したテストスイートの例を示します。:

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

Your tests are now **red** again; at least one is failing.

再びテストは **red** となります。 少なくとも1つテストが失敗しています。

**席替え** グループの次の人に変わってください。

## Repeat!

## 繰り返し!

Keep repeating steps 2 through 4, making sure to continue switching at the end
of step 4. You are done when your team feels like they are done.

ステップ 2 ~ 4 を繰り返し、ステップ 4 の最後で次の人に変わるようにしてください。チームのみんなが「終わった」と感じたときに、作業を完了とします。

Don't worry about finishing all cases. The goal is to practice the steps and
learn to work together in this way. Get used to writing tests as well as
getting them to pass. Practice. Good luck!

すべてのケースを完了しなくてはならないとは考えなくても大丈夫です。目標は、手順をこなし、仲間と協力して作業を行うことを学ぶことです。 テストを作成すること、テストをパスさせることに慣れてください。練習あるのみです。

## ヒント

If you are stuck for ideas, here is a list of Roman numerals to write tests
for, in this order. Note the way that the build up incrementally in complexity.

テストのアイデアに行き詰ってしまったときのために、 テスト作成のためのローマ数字のリストを順に示します。 段階的に複雑になっていきます。

:--------- | :-----------
入力      | 出力
:--------- | :-----------
 `1`       | `"I"`
 `5`       | `"V"`
 `4`       | `"IIII"`
 `6`       | `"VI"`
 `7`       | `"VII"`
 `10`      | `"X"`

If you get this far, you earn partial credit. Romans used to use `IIII` for 4.
That's why 4 on an analog watch is written as `IIII`. Later on, they added
*subtractive* digits. These are harder to program. Once you feel confident that
your program works with all the numbers above, try dealing with subtractive
digits.

ここまで来たら、部分的にはできたといっていいでしょう。その昔ローマ人は 4 として `IIII` を用いていました。
アナログ時計の 4 が `IIII` なのはそのためです。 その後、*減産数字* が追加されました。これらをプログたむするのはもっと大変です。 プログラムが上のすべての数値を処理できることに自身が持てたら、*減算数値*を処理してみてください。

:--------- | :-----------
入力      | 出力
:--------- | :-----------
`4`        | `"IV"`
`14`       | `"XIV"`
`2896`     | `"MMDCCCXCVI"`

[Roman numerals]: http://www.math.tsukuba.ac.jp/~tasaki/explanation/roman.html
