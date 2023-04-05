---
layout: main_guide
title: Add a new page to your app
description: "Add more pages to your Rails app by generating controlelrs and changing routes."
permalink: new-page
---

# Add a new page to your app

{% include main-guide-intro.html %}

アプリに開発者(あなたです！)の情報を表示できるようにページを追加してみましょう。

## Generate a new page

In the Terminal app, run the following command:

{% highlight sh %}
rails generate controller pages about
{% endhighlight %}

このコマンドはプロジェクトの `app/views` 以下に `/pages` へのアクセスに対応するための新しいディレクトリを追加します。そこに `about.html.erb` という名前のあなたの情報のためのページが作られます。

Open the `app/views/pages/about.html.erb` file. Add some information about yourself in the HTML. Something like the example below:

{% highlight erb %}
<h1>About me</h1>
<p>Hello there! I am YOUR NAME HERE and this is my amazing app!</p>
{% endhighlight %}

また、以下のシンプルなルーティングも routes.rb に追加されます。This route configuration tells Rails which page should be shown when visiting that URL.

{% highlight ruby %}
get "pages/about"
{% endhighlight %}

それでは、プロジェクトの `app/views/pages/about.html.erb` をテキストエディタで開いてあなたの情報を HTML で追記しましょう。その後はブラウザで <http://localhost:3000/pages/about> を開いて(またはクラウドサービスでは preview してアドレス欄の末尾に '/pages/about' を加えてアクセスして) 作成したページを確認してみましょう。

{% coach %}
Talk about routes for a moment. How does the `config/routes.rb` file define what routes Rails listens to? Explain that every page in the app needs a route in this file, otherwise Rails won't know how to show it.
{% endcoach %}

## Add a link to your navigation bar

Now that we know the new page works, let's make sure people can visit it by creating a link for it in the navigation bar. That way they don't have to guess that page exists and try to find it on their own.

Open `app/views/layouts/application.html.erb` in your Text Editor and under these lines of HTML:

{% highlight erb %}
<li class="nav-item">
  <a class="nav-link <%= 'active' if current_page?(controller: 'ideas') %>" href="/ideas">Ideas</a>
</li>
{% endhighlight %}

add the following lines of HTML to link to the new page:

{% highlight erb %}
<li class="nav-item">
  <a class="nav-link <%= 'active' if current_page?(controller: 'pages', action: 'about') %>" href="/pages/about">About</a>
</li>
{% endhighlight %}

Refresh the page in your Browser and click the newly created link to see if it works! You can now navigate between the ideas and the about pages in your app through one unified navigation bar.

## The changes in more detail

By adding the new "nav item" to the navigation a new link has appeared in the navigation bar, styled by Bootstrap. This link points to the new about page.

This link is made by using a `a`-element, which is the HTML for a link. Using the `href` property we tell the browser where to point to, in this case `/pages/about`. The "About" text between the `<a ... href="/pages/about">About</a>` link is what is shown as the label for the people looking at the page through the Browser.

The middle part with the `class` property is what we use to indicate how the link should be displayed. If the link is "active", it is the page we're currently and it shows more brightly colored than the other link of the page we are currently not on.

To check if the page is currently active, Rails provides a helper called `current_page?`. This condition will be "true" if it matches our page selection: `controller: 'pages', action: 'about'`. The `controller` is the entrypoint for anything in the `/pages` path of this part of the app, and the `action` is the specific page, which is "about".

{% coach %}
The above goes in a bit more technical detail about HTML works and how ERB can change what HTML is shown in the Browser. Help elaborate if things are unclear. Demonstrate how the page in the Browser changes by changing the HTML and ERB code.
{% endcoach %}

Knowing how to add a new page and change the nav bar, you can also add a [new homepage](/new-homepage) (the next guide) to your app.
