---
layout: main_guide
title: 画像のサムネイルを作ってみよう
description: "サムネイル(アップロードした画像の縮小版)を作ることで、画像のアップロード機能を最適化しましょう。"
permalink: thumbnails
---

# 画像のサムネイルを作ってみよう

*Created by Miha Filej, [@mfilej](https://twitter.com/mfilej), Translated by Hiroshi SHIBATA [@hsbt](http://twitter.com/hsbt), Goh Matsumoto [@urimaro](http://twitter.com/urimaro)*

{% include main-guide-intro.html %}

インターネットはスピードがすべてです。ページが読み込まれるスピードが速ければ速いほど、ページから離れていく人は少なくなります。そして、私たちはアイデアアプリで素晴らしいアイデアを共有したいので、人々に留まっていてほしいと考えています！また、データの転送量が少なくて済むと、データプランを契約している訪問してくれた人たちから感謝されると思います。

ページの読み込みを速くする方法の1つは、小さいサイズの画像を表示することです。画像のサイズが小さければ小さいほど、インターネット上の転送速度は速くなります。

## ImageMagick をインストールしよう

アイデアにアップロードした画像のサイズを変更するために ImageMagick を使います。

<div class="os-specific">
  <div class="mac">
<p>ターミナルで次のコマンドを実行してください:</p>
{% highlight sh %}
brew install imagemagick
{% endhighlight %}
  </div>
  <div class="nix">
<p>Ubuntu を使っている場合、ターミナルで次のコマンドを実行してください:</p>
{% highlight sh %}
sudo apt-get update
sudo apt-get install -y imagemagick
{% endhighlight %}
  </div>
  <div class="win">
<p><a href="https://www.imagemagick.org/script/download.php#windows">ImageMagick のインストーラー</a> をダウンロードし(最初の <em>download</em> リンクをクリックしてください)、実行してください。インストーラーのウィザードで「Install legacy utilities」のチェックボックスをチェックしてください。</p>
  </div>
</div>

{% coach %}
ImageMagick とは何か、以前使ったライブラリや gem とどう違うのかを説明してください。
{% endcoach %}

## ImageMagick 用の Ruby gem をインストールしよう

Ruby が ImageMagick とやり取りできるようにするために、Ruby gem `mini_magick` を使います。まずアプリに追加してインストールする必要があります。

`Gemfile` をテキストエディタで開き、この行を追加してください:

{% highlight ruby %}
gem "mini_magick"
{% endhighlight %}

以下の行の下です:

{% highlight ruby %}
gem "carrierwave"
{% endhighlight %}

ターミナルでこのコマンドを実行してください:

{% highlight sh %}
bundle install
{% endhighlight %}

インストール後、Rails サーバーを(再)起動してください。

## サムネイルを作成するようアプリに指示しよう

これで Ruby gem `mini_magick` を通して ImageMagick とやり取りできるようになったので、ファイルをアップロードするための gem `carrierwave` にアップロードする画像ごとにサムネイルを作るように指示できます。

`app/uploaders/picture_uploader.rb` を開いて、以下の行を探しましょう。

{% highlight ruby %}
# include CarrierWave::MiniMagick
{% endhighlight %}

行の先頭にある `#` を削除します。

{% coach %}
コード上のコメントの用途やどのような時に使うかを説明してください。
{% endcoach %}

今変更した行の下に以下を追加します。

{% highlight ruby %}
version :thumb do
  process :resize_to_fit => [150, 150]
end
{% endhighlight %}

これからアップロードされる画像は小さいサイズにリサイズされますが、すでにアップロードされた画像は変更されません。もう一度アイデアを編集して新しい画像を追加してください。保存するとアップロードした画像のサムネイルがアイデアに表示されます。

## サムネイルを表示してみよう

アイデアの画像の表示方法は変えていないので、まだ元の大きな画像が表示されるはずです。ビューを変更してサムネイルを表示するように変えてみましょう。

`app/views/ideas/index.html.erb` を開いて、以下の行を変更してください:

{% highlight erb %}
<%= image_tag(@idea.picture_url, width: 150, height: 150, class: "img-thumbnail flex-shrink-0") if @idea.picture? %>
{% endhighlight %}

このように変更します。

{% highlight erb %}
<%= image_tag(@idea.picture_url(:thumb), width: 150, height: 150, class: "img-thumbnail flex-shrink-0") if @idea.picture? %>
{% endhighlight %}

サムネイルが表示されるようになったことを確かめるために、ブラウザで [アイデアの一覧](http://localhost:3000/ideas) を表示してください。

{% coach %}
HTMLで画像の幅を指定することとサーバで画像をリサイズすることの違いを説明してください。どちらも小さく見えると思いますが、サムネイルとしてリサイズされるのは片方だけです。
{% endcoach %}
