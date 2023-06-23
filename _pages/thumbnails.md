---
layout: main_guide
title: Create picture thumbnails
title: 画像のサムネイルを作ってみよう
description: "Optimize image uploads by creating thumbnails: smaller versions of the original file uploads."
description: "サムネイル(アップロードした画像の縮小版)を作ることで、画像のアップロード機能を最適化しましょう。"
permalink: thumbnails
---

# Create picture thumbnails
# 画像のサムネイルを作ってみよう

*Created by Miha Filej, [@mfilej](https://twitter.com/mfilej), Translated by Hiroshi SHIBATA [@hsbt](http://twitter.com/hsbt), Goh Matsumoto [@urimaro](http://twitter.com/urimaro)*

{% include main-guide-intro.html %}

The Internet is all about speed. The faster your page loads, the less likely people are to click away. And we want people to stick around to share our great ideas with our ideas app! Also, people with data plans visiting your website will thank you for requiring less data to be transmitted.
インターネットはスピードがすべてです。ページが読み込まれるスピードが速ければ速いほど、ページから離れていく人は少なくなります。そして、私たちはアイデアアプリで素晴らしいアイデアを共有したいので、人々に留まっていてほしいと考えています！また、データの転送量が少なくて済むと、データプランを契約している訪問してくれた人たちから感謝されます。

One way to speed up page loads is by displaying images in a smaller size. The smaller an image is, the fast it will be transmitted over the Internet.
ページの読み込みを速くする方法の1つは、小さいサイズの画像を表示することです。画像のサイズが小さければ小さいほど、インターネット上の転送速度は速くなります。

## Install ImageMagick
## ImageMagick をインストールしよう

We'll be using the ImageMagick tool to resize the pictures uploaded to your ideas.
アイデアにアップロードした画像のサイズを変更するために ImageMagick を使います。

<div class="os-specific">
  <div class="mac">
<p>Run the following command in the Terminal app:</p>
<p>ターミナルで次のコマンドを実行してください:</p>
{% highlight sh %}
brew install imagemagick
{% endhighlight %}
  </div>
  <div class="nix">
<p>If you are on Ubuntu, run the following command in the Terminal app:</p>
<p>Ubuntu を使っている場合、ターミナルで次のコマンドを実行してください:</p>
{% highlight sh %}
sudo apt-get install imagemagick
{% endhighlight %}
  </div>
  <div class="win">
<p>Download and run the <a href="https://www.imagemagick.org/script/download.php#windows">ImageMagick installer</a> (use the first <em>download</em> link). In the installation wizard, make sure you check the checkbox to install legacy binaries.</p>
<p><a href="https://www.imagemagick.org/script/download.php#windows">ImageMagick のインストーラー</a> をダウンロードし(最初の <em>download</em> リンクをクリックしてください)、実行してください。インストーラーのウィザードで「Install legacy utilities」のチェックボックスを必ずチェックしてください。</p>
  </div>
</div>

{% coach %}
Explain what is ImageMagick and how is it different from libraries/gems we used before?
ImageMagick とは何か、以前使ったライブラリや gem とどう違うのかを説明してください。
{% endcoach %}

## Install a Ruby gem for ImageMagick
## ImageMagick 用の Ruby gem をインストールしよう

For Ruby to talk with ImageMagick, we'll be using the `mini_magick` Ruby gem. First we will need to add it to our app and install it.
Ruby が ImageMagick とやり取りできるようにするために、Ruby gem `mini_magick` を使います。まずアプリに追加してインストールする必要があります。

Open `Gemfile` in your Text Editor and add this line:
`Gemfile` をテキストエディタで開き、この行を追加してください:

{% highlight ruby %}
gem "mini_magick"
{% endhighlight %}

below the line:
以下の行の下です:

{% highlight ruby %}
gem "carrierwave"
{% endhighlight %}

In the Terminal app run this command:
ターミナルでこのコマンドを実行してください:

{% highlight sh %}
bundle install
{% endhighlight %}

Make sure to (re)start your Rails server after installation.
インストール後、Rails サーバーを必ず(再)起動してください。

## Tell your app to create thumbnails
## サムネイルを作成するようアプリに指示しよう

Now that we have a way to talk to ImageMagick through the `mini_magick` Ruby gem, we can tell the file upload gem `carrierwave` to create thumbnails for every picture you upload.
これで Ruby gem `mini_magick` を通して ImageMagick とやり取りできるようになったので、ファイルをアップロードするための gem `carrierwave` にアップロードする画像ごとにサムネイルを作るように指示できます。

Open `app/uploaders/picture_uploader.rb` and find the line that looks like this:
`app/uploaders/picture_uploader.rb` を開いて、以下の行を探しましょう。

{% highlight ruby %}
# include CarrierWave::MiniMagick
  # include CarrierWave::MiniMagick
{% endhighlight %}

Remove the `#` sign at the front of the line.
行の先頭にある `#` を削除します。

{% coach %}
Explain the concept of comments in code.
コード上のコメントの用途やどのような時に使うかを説明してください。
{% endcoach %}

Below the line you just changed, add these lines:
今変更した行の下に以下を追加します。

{% highlight ruby %}
version :thumb do
  process :resize_to_fit => [150, 150]
end
version :thumb do
  process :resize_to_fill => [50, 50]
end
{% endhighlight %}

The images uploaded from now on will be resized to a smaller size, but the ones we already have haven't been updated. Instead, let's edit an idea and add a new picture. When saved the idea now has a thumbnail for the uploaded picture.
これからアップロードされる画像は小さいサイズにリサイズされますが、すでにアップロードされた画像は変更されません。もう一度アイデアを編集して新しい画像を追加してください。保存するとアップロードした画像のサムネイルがアイデアに表示されます。

## Display the thumbnail
## サムネイルを表示してみよう

We haven't changed how the idea pictures are displayed, so it should still be showing the original larger image. Let's change the views to display the thumbnail instead.
アイデアの画像の表示方法は変えていないので、まだ元の大きな画像が表示されるはずです。ビューを変更してサムネイルを表示するように変えてみましょう。

Open `app/views/ideas/index.html.erb` and change the line:
`app/views/ideas/index.html.erb` を開いて、以下の行を変更してください:

{% highlight erb %}
<%= image_tag(@idea.picture_url, width: 150, height: 150, class: "img-thumbnail flex-shrink-0") if @idea.picture? %>
<%= image_tag idea.picture_url, width: '100%' if idea.picture.present? %>
{% endhighlight %}

to this line:
このように変更します。

{% highlight erb %}
<%= image_tag(@idea.picture_url(:thumb), width: 150, height: 150, class: "img-thumbnail flex-shrink-0") if @idea.picture? %>
<%= image_tag idea.picture_url(:thumb) if idea.picture.present? %>
{% endhighlight %}

Take a look at the [list of ideas](http://localhost:3000/ideas) in the Browser to see if your ideas now have a thumbnail.
サムネイルが表示されるようになったことを確かめるために、ブラウザで [アイデアの一覧](http://localhost:3000/ideas) を表示してください。

{% coach %}
Explain what specifying the image width in HTML and how it differs from resizing images on the server. Both images may look small, but only one is resized as a thumbnail.
HTMLで画像の幅を指定することとサーバで画像をリサイズすることの違いを説明してください。どちらも小さく見えると思いますが、サムネイルとしてリサイズされるのは片方だけです。
{% endcoach %}
