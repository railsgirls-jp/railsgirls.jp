---
layout: main_guide
title: Create picture thumbnails
title: アイデア一覧を表示したときにサムネイル表示してみよう
description: "Optimize image uploads by creating thumbnails: smaller versions of the original file uploads."
permalink: thumbnails
---

# Create picture thumbnails
# CarrierWave を使ってサムネイルを作ってみよう

*Originally created by Miha Filej, [@mfilej](https://twitter.com/mfilej)*
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

## Tell your app to create thumbnails
## *2.*画像をアップロードした時にサムネイルを作成しよう

Now that we have a way to talk to ImageMagick through the `mini_magick` Ruby gem, we can tell the file upload gem `carrierwave` to create thumbnails for every picture you upload.

Open `app/uploaders/picture_uploader.rb` and find the line that looks like this:
`app/uploaders/picture_uploader.rb` を開いて、以下の行を探しましょう。

{% highlight ruby %}
# include CarrierWave::MiniMagick
  # include CarrierWave::MiniMagick
{% endhighlight %}

Remove the `#` sign at the front of the line.
上の行の `#` を削除します。

{% coach %}
Explain the concept of comments in code.
コード上のコメントの用途やどのような時に使うかを説明しましょう
{% endcoach %}

Below the line you just changed, add these lines:
削除した場所のすぐ下に以下を追加します。

{% highlight ruby %}
version :thumb do
  process :resize_to_fit => [150, 150]
end
version :thumb do
  process :resize_to_fill => [50, 50]
end
{% endhighlight %}

The images uploaded from now on will be resized to a smaller size, but the ones we already have haven't been updated. Instead, let's edit an idea and add a new picture. When saved the idea now has a thumbnail for the uploaded picture.
これで画像をアップロードするとリサイズするようになりました。しかし、もうアップロード済みの画像は変更されません。もう一度 idea を編集して画像をアップロードし直してください。

## Display the thumbnail
## *3.*サムネイルを表示してみよう

We haven't changed how the idea pictures are displayed, so it should still be showing the original larger image. Let's change the views to display the thumbnail instead.

Open `app/views/ideas/index.html.erb` and change the line:
`app/views/ideas/index.html.erb` を開いて、もし画像がアップロードされていればリサイズした画像を表示するようにしましょう。

{% highlight erb %}
<%= image_tag(@idea.picture_url, width: 150, height: 150, class: "img-thumbnail flex-shrink-0") if @idea.picture? %>
<%= image_tag idea.picture_url, width: '100%' if idea.picture.present? %>
{% endhighlight %}

to this line:
を下のように変更します。

{% highlight erb %}
<%= image_tag(@idea.picture_url(:thumb), width: 150, height: 150, class: "img-thumbnail flex-shrink-0") if @idea.picture? %>
<%= image_tag idea.picture_url(:thumb) if idea.picture.present? %>
{% endhighlight %}

Take a look at the [list of ideas](http://localhost:3000/ideas) in the Browser to see if your ideas now have a thumbnail.
これで、idea の一覧を開いた時にサムネイルが表示されるようになりました。

{% coach %}
Explain what specifying the image width in HTML and how it differs from resizing images on the server. Both images may look small, but only one is resized as a thumbnail.
{% endcoach %}
