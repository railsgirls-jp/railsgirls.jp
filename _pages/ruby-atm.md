---
layout: default
title: Ruby ATM
permalink: ruby-atm
---

# Ruby ATM

*Created by Joshua Paling, [@joshuapaling](https://twitter.com/joshuapaling)* *翻訳者: kyokucho1989, [@kyokucho1989](https://twitter.com/kyokucho_1989)*

この演習では、ATMから預金を引き出す関数を作成します。やっていきましょう！　たくさん質問をしたり、Googleで検索したり、コンピュータから一歩離れて考える覚悟をしておきましょう。難しいですが、得るものは多いはずです！

他のプログラマと意見を交換できるよう、ペア、グループもしくはリモートでのプログラミングをしたほうがいいです。テスト駆動開発を用いることになるでしょう。しかし、すべてのテストはあらかじめ書かれています。そのため、コードを書くことに集中できます。

はじめは簡単ですが、難易度は徐々に上がり、最後はかなり難しくなります！

## ワークフロー

それぞれのステップについて、以下のアクションを行う必要があります。

**1. 新しいテストを実行する:**  前回のテストを削除し、現在の手順のテストを貼り付けてください。*(それぞれの手順のテストは、その手順の終わりに記載してます。)* テストを実行し、どのテストが失敗するか確認してください。 テキストエディタの SublimeTextでは、 <kbd>Ctrl</kbd>+<kbd>B</kbd> でテストを実行できます。 または、ターミナルを開き `cd` コマンドでワーキングディレクトリに入り、 `ruby atm.rb` を実行します。

**2. テストをパスさせる:** 現在のステップの機能的な要件を満たすようにコードを編集します。全てのテストがパスしたとき、あなたの書いたコードが正しいことがわかります。 

**3. リファクタリングする:** コードができるだけきれいでわかりやすくなるように編集できる部分がないか、確認してください。一部のステップには議論すべきポイントがあります。それについて、相手と話し合ってください。理解が進みますよ。

これらのステップはテスト駆動開発における**レッド、グレーン、リファクタリング** のワークフローとして確認できるかもしれません。

## *1.* 5ドル紙幣

5ドル紙幣しか入っていないATMを考えてください。現金として引き出すことができれば `true` を、 そうでないなら `false` を返す関数を作りましょう。

**例:**

* `withdraw(15)` ならば、 `true` を返します
* `withdraw(18)` ならば、 `false` を返します。18ドルは5ドル紙幣だけでは作れないためです。

**テストをパスさせるヒント:**

剰余演算子 `%` は余りを出力します。 例えば `9 % 4` は `1` になります。(9を4で割った時の余りは1のため)。

**コーディング開始:**

`atm.rb` というファイルを作成し、以下のコードを貼り付けます。 これはテストと一緒に`withdraw()`のシェルも含まれています。 


{% highlight ruby %}
def withdraw(amount)
  if amount <= 0 # this deals with some of the situations...
    return false
  end
  # ToDo: figure out this bit
end
{% endhighlight %}


### テスト step 1:

{% highlight ruby %}
# import required testing libraries
require 'minitest/spec'
require 'minitest/autorun'

# BELOW ARE THE TESTS FOR AUTOMATICALLY CHECKING YOUR SOLUTION.
# THESE TESTS ARE FOR STEP 1.
# THESE NEED TO BE REPLACED AFTER EACH STEP.
describe 'atm' do
  [
    [-1, false],
    [0, false],
    [1, false],
    [43, false],
    [17, false],
    [5, true],
    [20, true],
    [35, true],
  ].each do |input, expected|
    it "should return #{expected} when $#{input} is withdrawn" do
      withdraw(input).must_equal expected
    end
  end
end
{% endhighlight %}

## *2.* 紙幣は何枚？
それでは、ここから関数を修正します。引数が引き出せる金額なら、単純に `true` を返すのではなく、紙幣の枚数を返すようにします。

**例:**

* `withdraw(15)` ならば、 `3` を返します。5ドル紙幣3枚で15ドルになるためです。
* `withdraw(20)` ならば、 `4` を返します。5ドル紙幣4枚で20ドルになるためです。
* `withdraw(11)` ならば、 `false` を返します。11ドルは5ドル紙幣だけでは作れないためです。

**テストをパスさせるヒント:**

`/` 演算子は割り算を行います。例えば、自分の年齢の半分に割り、それを変数に保存させたい場合、このように書きます。

{% highlight ruby %}
my_age = 28
half_my_age = my_age / 2
{% endhighlight %}

Rubyでは、正の整数で割り算を行う場合、結果は最も近い整数に切り捨てられます。

{% highlight ruby %}
new_number = 25/10
# new_number contains 2, because 25/10 = 2.5, and ruby will round that down to 2.
{% endhighlight %}


### テスト step 2:

{% highlight ruby %}
# Replace your existing tests with the ones below.
describe 'atm' do
  [
    [-1, false],
    [0, false],
    [1, false],
    [43, false],
    [7, false],
    [5, 1],
    [20, 4],
    [35, 7],
  ].each do |input, expected|
    it "should return #{expected} when $#{input} is withdrawn" do
      withdraw(input).must_equal expected
    end
  end
end
{% endhighlight %}

## *3.* 紙幣の配列

プログラムにおいて、`array` は基本的にものの集合です。リストのようなものです。

紙幣の枚数を返すのではなく、紙幣そのものの配列を返すようにコードを修正します（この場合では、全て5ドル紙幣です）。

**例**

* `withdraw(15)` ならば、配列 `[5, 5, 5]` を返します。これは基本的に3枚の5ドル紙幣の集合です。
* `withdraw(11)` ならば、 `false` を返します。11ドルは5ドル紙幣だけでは作れないためです。

**テストをパスさせるヒント:**

`[]` は空の配列と定義します。`[1, 2]` は二つの要素（1と2）をもつ配列として定義されています。

シャベル演算子 (`<<`) を使えば、配列に要素を加えることができます。例えば、 `[10, 20] << 30` は30を配列に追加させ、結果として `[10, 20, 30]` という配列が得られます。

`times` メソッドはコードのブロックを数回繰り返して実行します。例えば、 `5.times { puts 'hello' }` は 'hello' を5回出力します。

全てをまとめると、以下のようになります。

{% highlight ruby %}
my_array = [] # create an empty array and store it in my_array
my_array << 20 # now my array contains [20]
my_array << 30 # now my_array contains [20, 30]
remainder = 13 % 5 # remainder is 3
remainder.times { my_array << 5 } # now my_array contains [20, 30, 5, 5, 5]
{% endhighlight %}

### テスト step 3:
{% highlight ruby %}
# Replace your existing tests with the ones below.
describe 'atm' do
  [
    [-1, false],
    [0, false],
    [1, false],
    [43, false],
    [20, [5, 5, 5, 5]],
    [35, [5, 5, 5, 5, 5, 5, 5]],
  ].each do |input, expected|
    it "should return #{expected} when $#{input} is withdrawn" do
      withdraw(input).must_equal expected
    end
  end
end
{% endhighlight %}

## *4.* 10ドル紙幣

次に、ATMから10ドル紙幣だけが返されることを想定してください。これに対応できるように関数を変更しましょう。

**例**

* `withdraw(20)` ならば、配列 `[10, 10]` を返します。
* `withdraw(15)` ならば、 `false` を返します。15ドルは10ドル紙幣だけでは作れないためです。

### テスト step 4:

{% highlight ruby %}
# Replace your existing tests with the ones below.
describe 'atm' do
  [
    [-1, false],
    [0, false],
    [7, false],
    [45, false],
    [20, [10, 10]],
    [40, [10, 10, 10, 10]],
  ].each do |input, expected|
    it "should return #{expected} when $#{input} is withdrawn" do
      withdraw(input).must_equal expected
    end
  end
end
{% endhighlight %}

### リファクタリングする
一度テストをパスできたら、次にリファクタリングを行います。

プログラミングでは、['マジックナンバー'](http://en.wikipedia.org/wiki/Magic_number_(programming)) は、悪いものとされています（名前に騙されないで！）。 マジックナンバーは、何を表しているのか明確な説明がないため、まるで何もないところから *現れた* ような、プログラムに直接入力された(ハードコーディングされた)値のことです。


次のコードが理解するのにどれほど簡単か、または難しいか考えてください。

{% highlight ruby %}
# BAD - magic number!
balance = balance * 4.45
{% endhighlight %}

{% highlight ruby %}
# BAD - nondescript variable name is not much better!
value = 4.45
balance = balance * value
{% endhighlight %}

{% highlight ruby %}
# GOOD - isn't this much easier to understand?
interest_rate = 4.45
balance = balance * interest_rate
{% endhighlight %}

複数の箇所で同じ値がハードコーディングされていると、マジックナンバーは特に問題になります。

あなたはマジックナンバーを使いましたか？ それをなくすようにリファクタリングできますか？


## *5.* 5ドル紙幣と10ドル紙幣

ATMに5ドル紙幣と10ドル紙幣がある場合を想定してください。利用者は、紙幣を可能な限り少なくしたいとします。

**例**

* `withdraw(25)` ならば、配列 `[10, 10, 5]` を返します。
* `withdraw(11)` ならば、 `false` を返します。11ドルは5ドル紙幣と10ドル紙幣だけでは作れないためです。

### テスト step 5:

{% highlight ruby %}
# Replace your existing tests with the ones below.
describe 'atm' do
  [
    [-1, false],
    [0, false],
    [7, false],
    [20, [10, 10]],
    [25, [10, 10, 5]],
    [35, [10, 10, 10, 5]],
  ].each do |input, expected|
    it "should return #{expected} when $#{input} is withdrawn" do
      withdraw(input).must_equal expected
    end
  end
end
{% endhighlight %}

## *6.* 5ドル紙幣、10ドル紙幣、そして20ドル紙幣

ATMには5ドル紙幣と10ドル紙幣と20ドル紙幣が入っています。これに対応できるように、関数を修正してください。

**注意:** この時点では、高額な紙幣の金額は低額な紙幣の金額を割り切ることができます。（例：20ドル/10ドル = 2）そうでない場合（50ドルと20ドル）はより事態が複雑になってしまいます。 簡単にするために、このステップではそのケースを意図的に扱いません。

**例**

* `withdraw(15)` ならば、配列 `[10, 5]` を返します。
* `withdraw(25)` ならば、配列 `[20, 5]` を返します。
* `withdraw(35)` ならば、配列 `[20, 10, 5]` を返します。
* `withdraw(11)` ならば、 `false` を返します。11ドルは5ドル紙幣と10ドル紙幣だけでは作れないためです。

**テストをパスさせるヒント:**

配列が空であることを判定する：`my_array.empty?`

配列が空でないことを判定する：`!my_array.empty?`

配列の最初の要素を除去する： `my_array.shift`  例: `[1, 2, 3].shift` は `[2, 3]` を返す

### テスト step 6:

{% highlight ruby %}
# Replace your existing tests with the ones below.
describe 'atm' do
  [
    [-1, false],
    [0, false],
    [7, false],
    [53, false],
    [35, [20, 10, 5]],
    [40, [20, 20]],
    [65, [20, 20, 20, 5]],
    [70, [20, 20, 20, 10]],
    [75, [20, 20, 20, 10, 5]],
  ].each do |input, expected|
    it "should return #{expected} when $#{input} is withdrawn" do
      withdraw(input).must_equal expected
    end
  end
end
{% endhighlight %}


### リファクタリングする

* ステップ5からステップ6までに、何行変更する必要がありますか？
* 100ドル紙幣が使用可能だとしたらどうなるでしょうか？　それは1行で実装できますか？
* 100ドル紙幣と20ドル紙幣、10ドル紙幣が使用できるように、あなたのコードを1行だけ変更してください。
* もっとも拡張性のある解決策はなんですか？


## *7.* 最終的な議論のポイント
* 特定の解決策が *機能する* とすると、そのコードの良し悪しを決定するのはなんでしょうか？
* 参考になるベストプラクティスまたは原則はありますか？コードの構造は重要ですか？それはなぜですか？
* 'なるほど！' と思った瞬間はありましたか？　それはどのようなものでしたか？
* あなたが小さなATM会社を設立し、すぐに会社が成長して世界的な成功を収めたとします。あなたが書いたコードは世界のあらゆる国の、あらゆる通貨を処理するのにどれほど適していますか？　段階を追うごとに適切になってきましたか？


## 挑戦しよう！ 50ドル紙幣と20ドル紙幣

これまで、私たちはATMで扱える紙幣のうち、低額の種類の紙幣がそれより高額の紙幣の倍数にならないことを意識的に避けてきました。例えば、50ドルと20ドル紙幣のみ扱う、のように(50は20で割り切ることはできない)。　なぜこのケースが困難かわかりますか？ もしあなたの現在のコードが50ドル紙幣と20ドル紙幣しか利用可能でない場合、60ドルまたは110ドルを引き出す場合はなにが起こりますか？ 自分の頭の中で、あるいは紙の上で、このケースを正しく処理するにはどのようなロジックを導入する必要があるか考えられますか？　挑戦しようと思うなら、コード中で処理をしてみてください！（テストの内容は自分で考える必要があります）


