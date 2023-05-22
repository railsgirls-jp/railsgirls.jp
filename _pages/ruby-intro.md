---
layout: guide
title: Introduction to Ruby
description: "Learn how the Ruby language syntax works and how to make dynamic HTML in your Rails app views."
permalink: ruby-intro
---

# Rubyの概要

*翻訳者: Kengo Nishimura, [@sontixyou](https://twitter.com/sontixyou)*

Rails Girlsワークショップでは、特にプログラミング言語Rubyを扱います。アプリを実行するRailsフレームワークは、Rubyで記述されています。これを変更するには Rubyコードを書く必要があります。

Ruby は開発者の利便性を考慮して最適化された言語です。しかし、他の言語と同様に慣れるまでに時間がかかります。

プログラミングでは、アプリを構築する方法には様々なものがあります。このガイドでは、アプリを作成するために必要なRubyの概念の一部に焦点を当てます。これまでにRubyのコードを書いたことがない方を前提としています。このワークショップの後でさらに詳しく知りたい場合は、ほかにたくさんの教材があります。コーチかオーガナイザーに聞いてください。

## Hello world

優れたアプリはすべて「Hello world!」という起点で始まります。最初のコードを書くと、コードが挨拶をしてくれます。

PC上に新しいファイルを作成します。ファイル名は`app.rb`と名前をつけます。作成するディレクトリはどこでも大丈夫ですが、作成した場所を覚えておいてください。拡張子の`.rb`は、あなた、あなたの（将来の）チーム、およびコンピュータに、それがどのような種類のファイルであるかを伝えます。つまり、`app.rb`はRubyプログラムです。

`app.rb`ファイルには Rubyコードを記述できます。テキストエディタでファイルを開きます。まず、以下の小さな例を新しいファイルにコピーし、ファイルを保存します。

{% highlight ruby %}
puts "Hello world!"
{% endhighlight %}

このアプリでは、なにかを`puts`します。つまり、ターミナルに何かしらのデータを出力します。この場合、文字列「Hello world!」です。文字列は二重引用符 (`"`) または一重引用符 (`'`) で囲みます。

ターミナルでは、次のコマンドを使用してこのアプリを実行できます。

{% highlight sh %}
ruby app.rb
{% endhighlight %}

先程の`app.rb`ファイルを作成した時と同じディレクトリにいることをターミナルで確認してください。(`ruby`とターミナルで打ってから、`app.rb`ファイルをターミナルへドラッグしてください。これにより、ファイルパスがターミナルのコマンドに追加されます。)

正常に実行された場合は、ターミナルに次の出力が表示されるはずです。

{% highlight sh %}
Hello world!
{% endhighlight %}

あなたのアプリが挨拶してくれています！

## 計算してみよう

アプリをより動的にするために、数値の計算を実行できます。

{% highlight ruby %}
puts 100 + 23
# 123
{% endhighlight %}

**Rubyアプリの実行方法についての簡単な説明**: 上記のような例が表示されるたびに、コードをローカルファイル`app.rb`または新しいファイルにコピーして実行できます。次に、`ruby`コマンドとファイル名を指定して実行して、出力を確認します。例えば：`ruby app.rb`

**コメントに関する簡単な説明**: コード例にハッシュタグ記号 (`#`) (数字またはポンド記号とも知られている) が表示されている場合、それ以降はすべてコメントとみなされます。コメントはプログラム内でRubyのコードとして実行されません。`# some text`というテキスト行が表示されている場合、これは何が起こっているかを説明するためのものであり、アプリのコードから除外できます。出力結果やコード行の結果を示します。また、コード例自体で特定のコードが何を行っているかを説明するためにも使用されます。コードの動作を妨げることもありません。

計算を実行する他のいくつかの方法を以下に示します。

{% highlight ruby %}
puts 100 - 30
# 70

puts 5 * 10
# 50

puts 10 / 5
# 2
{% endhighlight %}

ターミナルで、次のコマンドを使用してアプリを実行します。さまざまな計算結果が、複数行に分かれて表示されるはずです。

{% highlight sh %}
ruby app.rb
{% endhighlight %}

## 変数

アプリは、データを処理または変更するときにデータを移動します。データは「変数」に代入できます。変数はデータを保持し、コンピューターのメモリ内の場所を指します。アプリで変数を参照する時に、コンピューターのメモリ内のデータにアクセスします。

以下の例では、 `greeting`という名前の変数を定義するようにコードが変更されています。`greeting =`という文法が等号の記号で終わっています。このことから、`greetings`変数に「Hello your name here」を代入していることがわかります。変数はなんらかのデータを保持するものです。この場合は文字列の「Hello your name here」です。この変更したアプリを実行すると「Hello your name here」と出力されます。

{% highlight ruby %}
greeting = "Hello your name here"
puts greeting
{% endhighlight %}

自分で考えた文字列を出力するためには、引用符 (`"`) の間の文字列を変更します。

## if文

アプリケーションの処理の流れを制御する方法は、if文を使用することです。これらは、1つまたは複数の条件に基づいて何らかの処理を実行するコード内の条件分岐です。

`if`キーワードを使用すると、条件がtrueかどうかを確認できます。以下の例では、大なり記号 (`>`) を使用して、一方の値が他方の値より大きいかどうかを確認します。

{% highlight ruby %}
if 20 > 10 # もし、20が10より大きい場合
  puts "20 is larger than 10"
end
{% endhighlight %}

if文は`if`と`end`キーワードで構成されます。`if`キーワードはif文を開始し、`end`キーワードはif文を閉じます。`if`と`end`キーワードの間にあるコードの各行は、`if`キーワードの後に書かれている条件がtrueの場合に、Rubyが実行するものです。

値を確認するにはいくつかの方法があり、その例をいくつか示します。

{% highlight ruby %}
# ２つの文字列を比較します
if "Matz" == "Matz"
  # 文字列が一致する場合、ここに書かれているコードを実行します
  # == は2つの文字列が合致しているかを確認する記号です
end

if "Jim" != "Jane"
  # 文字列が一致しない時に、ここに書かれているコードを実行します
  # != は2つの文字列が合致しないかを確認する記号です
end
{% endhighlight %}

上記の例では文字列を直接使用しており、文字列は変更されないため、if文は実際には必要ありません。現実の世界では、if文で変数を使うことがほとんどでしょう。これらの変数の値は、ユーザー入力に基づいています。

{% highlight ruby %}
value1 = 20
value2 = 10
if value1 > value2
  puts "value1 is larger than value2"
end
{% endhighlight %}

if文の条件が一致しない場合は、他の動作を実行することもできます。

{% highlight ruby %}
if value1 > value2
  puts "Yes"
else
  # このコードはif文の条件がtrueでない時に、実行されます
  puts "No"
end
{% endhighlight %}

同じif文内で、さらに多くの条件分岐を作成することもできます。

{% highlight ruby %}
if value1 == value2
  puts "The values match exactly"
elsif value1 > value2
  puts "value1 is bigger than value2"
else
  puts "value1 is smaller than value2"
end
{% endhighlight %}

## メソッド

アプリのコードを整理する方法のひとつとして、メソッドを使用する方法があります。メソッドは、再利用可能なコードのブロックです。指定した名前で呼び出すことができます。

以下の例では、`say_hello`と呼ばれるメソッドが`def`キーワード（"define"という意味）と共に、定義されています。メソッドの終了は`end`キーワードで示されます。このメソッドが呼び出されると、`def`キーワードで始まる行と`end`キーワードを含む行の間のすべてが実行されます。

{% highlight ruby %}
def say_hello
  puts "Hello world!"
end
{% endhighlight %}

メソッド定義自体は何も行いません。このメソッドはまだ呼び出されておらず、挨拶は出力されません。

次のように、その名前を使用してメソッドを呼び出すことができます。

{% highlight ruby %}
say_hello
# Hello world
{% endhighlight %}

一度定義したメソッドは何度でも呼び出すことができます。これにより、アプリ内で手軽に同じことを何度も実行できるようになります。

{% highlight ruby %}
say_hello
# Hello world
say_hello
# Hello world
say_hello
# Hello world
{% endhighlight %}

### メソッドの戻り値

メソッドは、メソッドの最後の行にあるコードの値を返します。メソッドが常にターミナルへ結果を出力させたくない場合は、代わりに結果を返すことができます。

{% highlight ruby %}
def say_hello
  "Hello world!"
end
{% endhighlight %}

戻り値を出力するには、次のように`say_hello`メソッドの戻り値を`puts`メソッドに渡す必要があります。

{% highlight ruby %}
puts say_hello
{% endhighlight %}

Rubyコードの書き方として、最も一般的なのものは、戻り値に対して他の処理を実行することです。戻り値を出力するだけではありません。ほとんどのアプリでは、値を`puts`メソッドで常に表示したりする必要はありません。このガイドでは、あくまでも説明のために、このような使い方をしています。

### メソッド引数

メソッドをより動的にするためには、引数を使用してメソッドを定義します。次に、それを呼び出すときに、表示させたい文字列を引数として渡します。

{% highlight ruby %}
def say_hello(your_name)
  "Hello #{your_name}!"
end

puts say_hello("Your name")
# "Hello Your name"
{% endhighlight %}

`say_hello`メソッドが呼び出される時に、「Your name」の文字列は`say_hello`メソッド内の変数`your_name`になります。これは`def say_hello(your_name)`メソッドを定義している行で確認できます。括弧内の`your_name`は変数名です。次に`puts`の行では`say_hello`メソッドを組み合わせています。

**#シンボルの使用法に関する簡単な説明**: 以前、このガイドでは、ハッシュタグのシンボルはコメントを示すために使用されると説明しました。これには、いくつかの例外がありますが、最も一般的な例外は2つの文字列を結合することです。二重引用符(`"`)で囲まれた文字列と中括弧(`{}`)と組み合わせて、変数を別の文字列に挿入できます。`"Text #{variable}"`

メソッドの呼び出し方法が変更され、メソッドの引数を括弧で囲むようになったことがわかります。引数を指定しない場合は、括弧を省略できます。

{% highlight ruby %}
def say_hello_without_parameter
  "Hello world!"
end

# どちらの方法でもメソッドを呼び出すことができます
puts say_hello_without_parameter
puts say_hello_without_parameter()
{% endhighlight %}

メソッドには複数の引数を定義できます。すべての引数名の間にカンマを使用します。引数は順番に追加され、そのまま参照できます。最初に指定した値がメソッドの最初の引数になります。

{% highlight ruby %}
def say_hello_and_hobby(your_name, your_hobby)
  "Hello #{your_name}! Your hobby is: #{your_hobby}"
end

puts say_hello_and_hobby("Your name", "tennis")
# "Hello Your name! Your hobby is: tennis"

puts say_hello_and_hobby("Yukihiro Matsumoto", "writing Ruby code")
# "Hello Yukihiro Matsumoto! Your hobby is: writing Ruby code"
{% endhighlight %}

異なる引数を指定してメソッドを呼び出すと、出力される文字列が変更されます。

## クラス

Rubyコードを整理する次のステップは、クラスを使用することです。クラスを定義すると、同じトピックに関連する複数のメソッドをグループ化できます。クラスがどのように機能するかを説明するために、メソッドのないクラスから始めます。

以下の例には、 `Greeter`というクラスがあります。このクラスを使用するには、クラスの`new`メソッドを使用して初期化します。`Object.method`というドット表記を使用して、クラスのメソッドを呼び出したいことをRubyに伝えます。以下の例では、`new`というメソッドを呼び出しています。

{% highlight ruby %}
class Greeter
end

Greeter.new
{% endhighlight %}

このクラスはまだ何も実行していないので、メソッドを追加しましょう。以下の例では、`say_hello`メソッドがクラスに追加されています。`class Greeter`と最後の`end`の間に、メソッドを追加します。次に、Greeterクラスのインスタンスを`greeter =`で変数に代入します。次の行では、クラスインスタンスを指す変数`greeter`が、`say_hello`メソッドを呼び出していることがわかります。

{% highlight ruby %}
class Greeter
  def say_hello
    "Hello world"
  end
end

greeter = Greeter.new
puts greeter.say_hello
# "Hello world"
{% endhighlight %}

## 値と変数に対するメソッドの呼び出し

Rubyのいかなるものはオブジェクト、クラス、またはクラスのインスタンスです。つまり、それらのオブジェクトはメソッドを呼び出すことができます。「Hello world」という文字列はオブジェクトであり、数値`10`と`true`もオブジェクトです。

Rubyには、すでにメソッドが定義されているさまざまなタイプのオブジェクトがあります。以下の例では、Rubyに「Hello world」という文字列の文字数を計算させます。結果は11です。

{% highlight ruby %}
puts "Hello world".length
# 11
{% endhighlight %}

ドット表記を使用して、Rubyに値に対してメソッドを呼び出すことを伝えます この場合は`length`です。

最初に文字列を変数に代入してから、その変数からメソッドを呼び出すこともできます。この場合、変数`text`に対して`length`メソッドを呼び出します。

{% highlight ruby %}
text = "Hello world"
puts text.length
# 11
{% endhighlight %}

これらのメソッドの中には引数を受け付けるものもあります。以下の例では、変数`text`に代入されている値を変更して、異なるものを出力します。例えば、以下のコードを実行すると、変数`greeting`内の「Hello」が「Hi there」に置き換えられます。

{% highlight ruby %}
text = "Hello your name here"
puts text.sub("Hello", "Hi there")
# "Hi there your name here"
{% endhighlight %}

Rubyには多くの組み込みメソッドがあり、あらゆる種類の操作を行うことができます。いくつかの例を以下に示します。

{% highlight ruby %}
puts "Hello world".upcase # 全ての文字を大文字にします
# HELLO WORLD

puts "Hello world".reverse # 文字を逆順に並び替えます
# dlrow olleH

puts "Hello world".count("l") # lが何個文字列に含まれているかをカウントします。
# 3
{% endhighlight %}

## クラスインスタンス変数

前に作成した独自のGreeterクラスに戻りましょう。前にメソッドに引数を追加しました。今度はクラスに引数を追加しましょう。

{% highlight ruby %}
greeter = Greeter.new("students")
puts greeter.say_hello
# Hello students!
{% endhighlight %}

`say_hello`メソッドと同様に、この`new`もメソッドです。オブジェクトである文字列`"students"`が与えられます。この`new`メソッドは少し異なり、最終的にGreeterクラスの`initialize`メソッドを呼び出します。

{% highlight ruby %}
class Greeter
  def initialize(name)
    @name = name
  end

  def say_hello
    puts "Hello #{@name}!"
  end
end
{% endhighlight %}

上の例では、何か新しいことに気づくでしょう。変数は2種類あります。メソッドの引数`name`と変数`@name`に分けることができます。後者の変数はインスタンス変数と呼ばれます。`@`記号で、インスタンス変数であることを認識できます。インスタンス変数は、通常の変数では不可能なクラス全体を通して参照することができます。通常の変数は、宣言したメソッドのコンテキスト内でのみ参照できます。Greeter クラスの`initialize`メソッドで宣言すると、後の`say_hello`メソッド内で参照することできます。

## ループ

最後のトピックでは、ループについて簡単に説明します。ループは、異なる値に対して同じコードを実行する方法です。以下の例に示すように、複数の人に挨拶することができます。

{% highlight ruby %}
names = ["students", "Rails Girls", "coaches"]
names.each do |name|
  greeter = Greeter.new(name)
  puts greeter.say_hello
end
{% endhighlight %}

この`names`リストは配列と呼ばれます。いくつかの文字列を囲む角括弧によって、配列であると認識できます。配列内の要素はカンマで区切られます。配列`names`に対して`each`メソッドを呼び出すことにより、配列内の各要素に対してコードのブロックを実行できます。

Rubyではブロックがよく出てきます。これらは、`name.each do`の中の`do`キーワードによって認識できます。ブロック引数の見た目は少し異なり、かっこの代わりに、 `|`のようなパイプシンボルと呼ばれるものが使用されます。今回は`|name|`。ブロックが複数回呼び出されると、ループが呼び出されるたびに変数`name`の値が変化します。最初は「students」、次に「Rails Girls」、最後に「coaches」になります。

このアプリの出力は、次のようになります：

{% highlight text %}
Hello students!
Hello Rails Girls!
Hello coaches!
{% endhighlight %}

## 組み込みルビー(ERB)

Railsアプリを作成するときは、ERB (Embedded Ruby) に遭遇するでしょう。これはRubyの少し異なる書き方です。この書き方のRubyはHTMLファイルに埋め込まれています。これは、Rails プリが Web ページ上のコンテンツを動的に表示するのに役立ちます。

`.erb`で終わるファイル拡張子でERBであることがわかります。ちゃんとファイル名を書くと、ファイル名は、`index.html.erb`のようになります。

ERB ファイルには HTML タグがあります。これらは、小なり記号(`<`)で始まり、大なり記号(`>`)で終わる行によって識別できます。これらの記号の間の文字は、ページがレンダリングする要素のタイプを示します。段落の場合は「p」、リンクの場合は「a」、画像の場合は「img」、画像の場合は「ul」または「ol」です。他に多くの種類の要素があります。各要素には、次のような開始タグ`<p>`と、スラッシュ記号を含む終了タグ`</p>`があります。これらの要素を別の要素にネストして、このような Web ページを作成できます。

{% highlight html %}
<p>I am a paragraph</p>

<p>
  <a href="https://guides.railsgirls.com/">I am a link!</a>
</p>

<div>
  <h1>I am a heading</h1>
  <p>
    I am a piece of text with
    <a href="https://guides.railsgirls.com/">a link</a>.
  </p>
</div>
{% endhighlight %}

ERB 登場するのは、ページ内容を動的に表示させることです。たとえば、Google.comで検索フレーズを入力すると、フレーズごとに異なる結果が表示されます。これはERBなどの言語で行われます。ERBは Rubyアプリで使用される方法の1つです。

以下のコード例では、ループを使用してアイデアのリストを表示します。ERB要素は同じ HTML記号で認識できますが、パーセント記号 (`<%`および`%>`)も含まれています。ページ上に何かを表示したい場合は、パーセント記号と等号を備えた開始タグ`<%=`を使用します。

{% highlight erb %}
<% @ideas.each do |ideas| %>
  <p><%= item.title %></p>
<% end %>
{% endhighlight %}

出力は次のようになります。

{% highlight html %}
<p>Flying car</p>
<p>Hoverboard</p>
<p>Time travel</p>
{% endhighlight %}

ERB の仕組みに関する簡単なリファレンス:

{% highlight erb %}
# Rubyのコードで処理させたいときは、<% と %>を使います
<% Ruby code here %>

# if文の例
<% if a > b %>
  Show something if a is larger than b
<% end %>

# ループの例
<% @ideas.each do |ideas| %>
  <p><%= item.title %></p>
<% end %>

# Webページに文字列を出力する場合、<%= と %> を使用します
<%= variable_name %>
<%= object.method_name %>
<%= item.title %>
{% endhighlight %}

## 次のステップ

これで、Rubyの概要を読み終わりました。このガイドではすべてを説明できているわけではありませんが、Ruby言語の構文については理解しておく必要があります。

RubyとRubyがサポートするさまざまな種類のデータについて詳しく知りたいですか? [Rubyを試す](https://try.ruby-lang.org/)でRubyを試してください。

代わりにアプリの作業を続行したい場合は、[メインガイド](/#guides)に従ってください。
