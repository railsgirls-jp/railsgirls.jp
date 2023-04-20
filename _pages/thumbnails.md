---
layout: main_guide
title: アイデア一覧を表示したときにサムネイル表示してみよう
permalink: thumbnails
---

# Carrierwave を使ってサムネイルを作ってみよう

*Created by Miha Filej, [@mfilej](https://twitter.com/mfilej), Translated by Hiroshi SHIBATA*

{% include main-guide-intro.html %}

The Internet is all about speed. The faster your page loads, the less likely people are to click away. And we want people to stick around to share our great ideas with our ideas app! Also, people with data plans visiting your website will thank you for requiring less data to be transmitted.

One way to speed up page loads is by displaying images in a smaller size. The smaller an image is, the fast it will be transmitted over the Internet.

## Install ImageMagick

We'll be using the ImageMagick tool to resize the pictures uploaded to your ideas.

<div class="os-specific">
  <div class="mac">
<p>Run the following command in the Terminal app:</p>
{% highlight sh %}
brew install imagemagick
{% endhighlight %}
  </div>
  <div class="nix">
<p>If you are on Ubuntu, run the following command in the Terminal app:</p>
{% highlight sh %}
sudo apt-get install imagemagick
{% endhighlight %}
  </div>
  <div class="win">
<p>Download and run the <a href="https://www.imagemagick.org/script/download.php#windows">ImageMagick installer</a> (use the first <em>download</em> link). In the installation wizard, make sure you check the checkbox to install legacy binaries.</p>
  </div>
</div>

{% coach %}
Explain what is ImageMagick and how is it different from libraries/gems we used before?
{% endcoach %}

## Install a Ruby gem for ImageMagick

For Ruby to talk with ImageMagick, we'll be using the `mini_magick` Ruby gem. First we will need to add it to our app and install it.

Open `Gemfile` in your Text Editor and add this line:

{% highlight ruby %}
gem "mini_magick"
{% endhighlight %}

below the line:

{% highlight ruby %}
gem "carrierwave"
{% endhighlight %}

In the Terminal app run this command:

{% highlight sh %}
bundle install
{% endhighlight %}

Make sure to (re)start your Rails server after installation.

## *2.*画像をアップロードした時にサムネイルを作成しよう

`app/uploaders/picture_uploader.rb` を開いて、以下の行を探しましょう。

{% highlight ruby %}
  # include CarrierWave::MiniMagick
{% endhighlight %}

上の行の `#` を削除します。

{% coach %}
コード上のコメントの用途やどのような時に使うかを説明しましょう
{% endcoach %}

削除した場所のすぐ下に以下を追加します。

{% highlight ruby %}
version :thumb do
  process :resize_to_fill => [50, 50]
end
{% endhighlight %}

これで画像をアップロードするとリサイズするようになりました。しかし、もうアップロード済みの画像は変更されません。もう一度 idea を編集して画像をアップロードし直してください。

## *3.*サムネイルを表示してみよう

`app/views/ideas/index.html.erb` を開いて、もし画像がアップロードされていればリサイズした画像を表示するようにしましょう。

{% highlight erb %}
<%= image_tag idea.picture_url, width: '100%' if idea.picture.present? %>
{% endhighlight %}

を下のように変更します。

{% highlight erb %}
<%= image_tag idea.picture_url(:thumb) if idea.picture.present? %>
{% endhighlight %}

これで、idea の一覧を開いた時にサムネイルが表示されるようになりました。

{% coach %}
Explain what specifying the image width in HTML and how it differs from resizing images on the server. Both images may look small, but only one is resized as a thumbnail.
{% endcoach %}
