---
layout: main_guide
title: Add picture uploads
description: "Make your ideas pop with image uploads in your Rails app."
permalink: uploads
---

# Add picture uploads

{% include main-guide-intro.html %}

The ideas we added in the previous guide can benefit from a visual element, like a picture or drawing to spark the imagination. We can attach pictures by adding a file upload to the Idea model.

## Installing a Ruby gem

Rails にファイルをアップロードする機能を追加するには、ライブラリをインストールする必要があります。

プロジェクトディレクトリ内の `Gemfile` を開いて、この行

{% highlight ruby %}
gem "sqlite3"
{% endhighlight %}

の直後に、次の一行を追加します。

{% highlight ruby %}
gem "carrierwave"
{% endhighlight %}

サーバーを終了するためには、<kbd>Ctrl</kbd>+<kbd>C</kbd>を押します。

Terminal で、次のコマンドを実行してください:

{% highlight sh %}
bundle install
{% endhighlight %}

This will install the "carrierwave" gem we added to the `Gemfile` file.

{% coach %}
Explain what libraries (Ruby gems) are and why they are useful. Describe what Open Source software is.
{% endcoach %}

## Generating a picture uploader

We can now generate the code for handling file uploads. In the Terminal run the following command:

{% highlight sh %}
rails generate uploader Picture
{% endhighlight %}

If an error is shown that the uploader cannot be found also add the following line:
{% highlight ruby %}
gem "net-ssh"
{% endhighlight %}

If you added this gem, please run this command in the Terminal app to install the missing gem, and try again:

{% highlight sh %}
bundle install
{% endhighlight %}

## Attaching the picture uploader to the idea model

Rails now knows about a way to upload pictures in your app. It needs a bit of help to understand where you want to attach these uploads to.

Open the `app/models/idea.rb` file in your Text Editor. This file is used to store your ideas in the database and fetch the ideas to show them. We'll change it to tell Rails which field is a file upload.

次の行

{% highlight ruby %}
class Idea < ApplicationRecord
{% endhighlight %}

の直後に

{% highlight ruby %}
mount_uploader :picture, PictureUploader
{% endhighlight %}

This `mount_uploader` line tells the Idea model that the `picture` field is a file upload. It will store information about the file upload on that field to display it later.

## Uploading pictures

Now that your Idea model knows that the `picture` field is a file upload, we can change the form to create and edit pictures to select a picture.

`app/views/ideas/_form.html.erb` を開いて次のように編集します。

{% highlight erb %}
<%= form.text_field :picture %>
{% endhighlight %}

to this line and save it:

{% highlight erb %}
<%= form.file_field :picture %>
{% endhighlight %}

In your browser open <http://localhost:3000/ideas/new>.  Your "New idea" form will now show a different element on the page for the "Picture" field. Instead of a text field a file chooser is visible, recognizable by either a "Browse..." or "Choose File" button.

Fill in the form to create a new idea, but this time select a picture as well using this new element/button. Any random image you have on your laptop will do, it's just a test.

場合によっては、 *TypeError: can't cast ActionDispatch::Http::UploadedFile to string* というエラーが起きることもあります。エラーになった場合は、 `app/views/ideas/_form.html.erb` の

{% highlight erb %}
<%= form_with(model: idea) do |form| %>
{% endhighlight %}

上記のコードを、以下のように変更してみてください。

{% highlight erb %}
<%= form_with(model: idea, html: {multipart: true}) do |form| %>
{% endhighlight %}

## Displaying the picture

You've now added a picture to your idea! You can't see it yet after creating the idea, it will only show the filename right now. Let's change it so it shows the picture.

To show the picture in the page of the idea itself, `app/views/ideas/_idea.html.erb` (`app/views/ideas/show.html.erb` で呼び出している部分テンプレート) を開いて編集します。

{% highlight erb %}
<%= idea.picture %>
{% endhighlight %}

to this line and save the file:

{% highlight erb %}
<%= image_tag(idea.picture_url, width: 600) if idea.picture? %>
{% endhighlight %}

Using the `image_tag` we have told Rails to display the file upload as an image if it is present on the idea. Ideas without a picture will not show one.

Refresh the Browser. Your uploaded image should now be visible!

## Configure Git to ignore uploads

By default your app saves all your images locally, which is fine during development, but we don't want to save them with your app source code.

Open the `.gitignore` file add add this line at the bottom:

{% highlight erb %}
public/uploads/
{% endhighlight %}
