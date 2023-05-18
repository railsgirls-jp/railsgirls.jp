---
layout: default
title: Write a little game in Ruby!
permalink: ruby-game
---

# Rubyで簡単なゲームを作ってみよう！

*Created by Patrick Huesler, [@phuesler](https://twitter.com/phuesler) & Floor Drees, [@floordrees](https://twitter.com/floordrees) for [Rails Girls The Hague](https://railsgirls.com/thehague)* / *翻訳者: Yuya Yoshioka, [@yuya333_](https://twitter.com/yuya333_)*

[gosu](http://www.libgosu.org/)は2Dゲームを開発するためのライブラリです。Gosuは2Dグラフィックスやテキスト（３Dハードウェアによる高速化），音源のサンプルや音楽，キーボード，マウス，ゲームパッド/ジョイスティックの入力に対して，使いやすくゲームに適したインタフェースを提供しているという特徴があります。また，RMagick，Chipmunk，OpenGLとの統合のデモも含まれています。

実際のソースコード，wikiやissue trackerは[GitHub上に公開されています](http://github.com/jlnr/gosu/)。Gosuのドキュメントの最適な入り口は[wikiのホームページ](http://github.com/jlnr/gosu/wiki)です。
インストール方法:
{% highlight sh %}
gem install gosu
{% endhighlight %}

もしくは，`gem "gosu", "~> 0.7.48"` をGemfileに追加して `bundle` を実行してください。
サンプルゲームを試してみましょう:
{% highlight sh %}
cd $GEM_HOME/gems/gosu-0.7.48/examples
{% endhighlight %}

そして `ruby CptnRuby.rb`または`ruby RMagickIntegration.rb`または`ruby Tutorial.rb`を実行してください。

### 先ほどの例ですでに十分なはずです！

レポジトリをターミナル（もしくは新しいタブ）を開いてコピーしましょう。もしRails Girlsのアプリケーションを開発していれば，```cd```コマンドを実行してホームディレクトリに移動してください。

次のコマンドを実行しましょう。
{% highlight sh %}
git clone https://github.com/FloorD/gosu_tutorial_RG_TH.git
{% endhighlight %}

そして，以下のコマンドを使用して適切なディレクトリに移動してください。
{% highlight sh %}
cd gosu_tutorial_RG_TH/jumpingem
{% endhighlight %}

### 実行しましょう！

ミニゲームで遊ぶために，ターミナルを使用して起動してみましょう。
{% highlight sh %}
ruby game.rb
{% endhighlight %}

### このゲームはどのように動いているのでしょうか？

コードを調べてみませんか？テキストエディターで`game.rb`を開き，ファイルの先頭の以下のコードを見てみましょう。

{% highlight ruby %}
!/usr/bin/env ruby -w
require 'rubygems'
require 'gosu'
include Gosu
{% endhighlight %}

ここでは，必要なgemを'呼び出している'ことを確認しましょう。それでは，`class`（もしくは多重クラス）に移動しましょう。
ここには以下のコードがありますね。

{% highlight ruby %}
class Game < Window
end
{% endhighlight %}

このGameクラスの中に書かれている`def`はメソッドです。ここでは，どのようにプログラムの処理が行われるべきか定義(**def**ine)しています。次のスニペットを見てください。
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

少し試してみたくないですか？`game.rb`の中身を別の`.rb`ファイルにコピーしましょう。保存し好きな名前をつけましょう。ゲームで遊んでみて，中身を少し変えてターミナルで実行し，変化をみてみましょう。

あなたはPatrickよりも優れたグラフィックスのスキルを持っていると思いますか？（もしかしたら本当に持っていますか？）それなら，新しい`sprites.png`を作ってみましょう！ここで呼び出しているコードを忘れないでください。

{% highlight ruby %}
def initialize
    super(640, 480, false)
    self.caption = "Jump 'n Run"
    @standing, @walk1, @walk2, @jump = *Image.load_tiles(self, "sprites.png", 100, 160, false)
    @x, @y = 400, 0
    @vy = 0
    @dir = :left
    @cur_image = @standing
  end
{% endhighlight %}

`Game.new.show`がわかりますか？これは新しいインスタンスを作ります。メモリがなくなり，ゲームが動かなくなった時は新しいゲームを始めてください。楽しんでください！

#### クレジット

vim adventuresで使用されるアセットは[ここ](http://www.lostgarden.com/2007/05/dancs-miraculously-flexible-game.html)で見つけられます。

使用されている音源は，[Matthew Klingensmith (www.matthewklingensmith.com)](http://opengameart.org/content/matts-creative-commons-music)で見つけられます。
