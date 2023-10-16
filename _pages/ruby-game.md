---
layout: default
title: Write a little game in Ruby!
permalink: ruby-game
---

# Ruby で簡単なゲームを作ってみよう

*Created by Patrick Huesler, [@phuesler](https://twitter.com/phuesler) & Floor Drees, [@floordrees](https://twitter.com/floordrees) for [Rails Girls The Hague](https://railsgirls.com/thehague)*　/ _翻訳者: maimu, [@maimux2x](https://twitter.com/maimux2x)_

[gosu](http://www.libgosu.org/)は 2D ゲーム開発ライブラリです。Gosu は 2D グラフィックスやテキスト（3D ハードウェアによる高速化）、音源のサンプルや音楽、キーボード、マウス、ゲームパッド/ジョイスティックの入力に対して、使いやすくゲームに適したインタフェースを提供しているという特徴があります。また，RMagick、Chipmunk、OpenGL 一体化したデモも含まれています。

実際のソースコード、wiki や issue tracker は[GitHub 上に公開されています](http://github.com/jlnr/gosu/)。Gosu のドキュメントは[wiki のホームページ](http://github.com/jlnr/gosu/wiki)を参照することが最適です。
インストール方法はこちらです。
{% highlight sh %}
gem install gosu
{% endhighlight %}

もしくは、`gem "gosu", "~> 0.7.48"` を Gemfile に追加して `bundle` を実行してください。
サンプルゲームを試してみましょう。
{% highlight sh %}
cd $GEM_HOME/gems/gosu-0.7.48/examples
{% endhighlight %}

続いて`ruby CptnRuby.rb`

または `ruby RMagickIntegration.rb`

または `ruby Tutorial.rb`

を実行します。

### 例はもう十分です！

ターミナルで新しいタブを開いてリポジトリをコピーします。 もしもその間に Rails Girls アプリで作業していた場合は、`cd`を実行してホームディレクトリにいることを確認しましょう。

さあ、実行しましょう。
{% highlight sh %}
git clone https://github.com/FloorD/gosu_tutorial_RG_TH.git
{% endhighlight %}

そして以下を実行して適切なディレクトリに移動しましょう。
{% highlight sh %}
cd gosu_tutorial_RG_TH/jumpingem
{% endhighlight %}

### 実行します！

私たちの小さなゲームで遊ぶために、ターミナルを使ってファイルを実行します。
{% highlight sh %}
ruby game.rb
{% endhighlight %}

### それでは、このゲームはどのように動いているか分かりますか？

いくつかコードを見てみましょう。 `game.rb` をテキストエディタで開きます。

{% highlight ruby %}
!/usr/bin/env ruby -w
require 'rubygems'
require 'gosu'
include Gosu
{% endhighlight %}

こちらと同じものがファイルの一番上にありますか？ ここで必要な gem を「呼び出している」のです。そうすることで、クラス（または複数のクラス） に進むことができます。
ここでは以下のように

{% highlight ruby %}
class Game < Window
end
{% endhighlight %}

... という具体的な内容が書かれています。 Game クラスに含まれる`def`はメソッドです。 ここでは、プログラムがどの命令に従うかを**_定義_**します。以下のスニペットをご覧ください。
{% highlight ruby %}
def draw
draw_quad 0, 400, Color::WHITE, 640, 400, Color::WHITE, 640, 500, Color::WHITE, 0, 500, Color::WHITE
if @dir == :left then
offs_x = -25
factor = 1.0
else
offs_x = 25
factor = -1.0
end
@cur_image.draw(@x + offs_x, @y - 49, 0, factor, 1.0)
end
{% endhighlight %}

少し遊んでみませんか？ `game.rb` の内容を新しい `.rb` ファイルにコピーしてください。 好みの名前で命名して保存しましょう。 そして、ゲーム内のいくつかの要素を変更して、ターミナルで実行して変更内容を確認してみてください。

Patrick よりもグラフィックスのスキルがあると思いますか（多分そうでしょう）？ それなら、新しい `sprites.png` を作成してみてください！ こちらで呼び出すのを忘れないでください。

{% highlight ruby %}
def initialize
super(640, 480, false)
self.caption = "Jump 'n Run"
@standing, @walk1, @walk2, @jump = \*Image.load_tiles(self, "sprites.png", 100, 160, false)
@x, @y = 400, 0
@vy = 0
@dir = :left
@cur_image = @standing
end
{% endhighlight %}

そして`Game.new.show`を見てください。これは新しいインスタンスを作成します。メモリは持っておらず、ゲームで詰まったときには新しいゲームを始めることができます。楽しんでください！

#### クレジット

Vim Adventures で使用されているアセットは[こちら](http://www.lostgarden.com/2007/05/dancs-miraculously-flexible-game.html)で見つけることができます。
使用されている音声は [Matthew Klingensmith (www.matthewklingensmith.com)](http://opengameart.org/content/matts-creative-commons-music)で入手できます。
