---
layout: main_guide
title: Rails Girls アプリ・チュートリアル
permalink: app
---

# Rails Girls アプリ・チュートリアル

*Created by Vesa Vänskä, [@vesan](https://twitter.com/vesan)*

{% include main-guide-intro.html %}

Welcome to the workshop! This is the guide you'll be starting with on the day of the workshop. Did you have trouble getting the installation to work? Ask your coach for help first.

## Help from the coach

When you see the box below, ask your coach to read it and help out where necessary.

{% coach %}
Hi coach 👋 Thank you so much for helping out today!
{% endcoach %}

## Learn about Ruby

In these next couple guides you're going to create a new app. For this you'll be using the Ruby on Rails framework. The Rails framework is written in the Ruby programming language. To get a better idea of how Ruby works, read the [Rails Girls guide to Ruby](/ruby-intro) if you haven't ever written any Ruby, or go to the slightly more advanced [try.ruby-lang.org](https://try.ruby-lang.org/) course before you continue.

## アプリケーションを作る

*railsgirls* という名前の Rails アプリを作っていきます。

まず、Terminal を開いてください。

<div class="os-specific">
  <div class="mac nix">
{% highlight sh %}
mkdir projects
{% endhighlight %}

    <div>
<p>You can verify that a directory named <code>projects</code> was created by running the list command: <code>ls</code>. You should see the <code>projects</code> directory in the output. Now you want to change the directory you are currently in to the <code>projects</code> folder by running:</p>
    </div>

{% highlight sh %}
cd projects
{% endhighlight %}

    <div>
<p>You can verify you are now in an empty directory or folder by again running the <code>ls</code> command. Now you want to create a new app called <code>railsgirls</code> by running:</p>
    </div>

{% highlight sh %}
rails new railsgirls
{% endhighlight %}

    <div>
<p>This will create a new app in the folder <code>railsgirls</code>, so we again want to change the directory to be inside of our Rails app by running:</p>
    </div>

{% highlight sh %}
cd railsgirls
{% endhighlight %}

    <div>
<p>If you run <code>ls</code> inside of the directory you should see folders such as <code>app</code> and <code>config</code>. You can then start the Rails server by running:</p>
    </div>

{% highlight sh %}
rails server
{% endhighlight %}
  </div>

  <div class="win">
{% highlight sh %}
mkdir projects
{% endhighlight %}

    <div>
<p>You can verify that a directory named <code>projects</code> was created by running the list command: <code>dir</code>. You should see the <code>projects</code> directory in the output. Now you want to change the directory you are currently in to the <code>projects</code> folder by running:</p>
    </div>

{% highlight sh %}
cd projects
{% endhighlight %}

    <div>
<p>You can verify you are now in an empty directory or folder by again running the <code>dir</code> command. Now you want to create a new app called <code>railsgirls</code> by running:</p>
    </div>

{% highlight sh %}
rails new railsgirls
{% endhighlight %}

    <div>
<p>This will create a new app in the folder <code>railsgirls</code>, so we again want to change the directory to be inside of our Rails app by running:</p>
    </div>

{% highlight sh %}
cd railsgirls
{% endhighlight %}

    <div>
<p>If you run <code>dir</code> inside of the directory you should see folders such as <code>app</code> and <code>config</code>. You can then start the Rails server by running:</p>
    </div>

{% highlight sh %}
rails server
{% endhighlight %}
  </div>
</div>

自分のパソコン上のブラウザで <http://localhost:3000> にアクセスしてください。(Replitなどのクラウドサービスの場合は、```rails server -b 0.0.0.0```を実行してサーバを起動し直した後でURLをアドレス欄に入力する代わりに、メニューから 'preview' - 'port 3000' を選んでください。詳細は [インストール・レシピ](/install) を参照してください。)

Railsロゴの画面が表示されれば、さきほど作ったアプリは正しく動作しています。The `rails new` generator created a lot of app code for you to get started and we'll be modifying it in the rest of this workshop.

Notice in the Terminal window the command prompt is not visible because it is now running the Rails server. The command prompt will look something like this, but it may be different on your laptop:

<div class="os-specific">
  <div class="mac nix">
{% highlight sh %}
$
{% endhighlight %}
  </div>
  <div class="win">
{% highlight sh %}
>
{% endhighlight %}
  </div>
</div>

When the command prompt is not visible you cannot execute new commands. If you try running `cd` or another command it will not work. Terminal 上で CTRL-C（CTRL(Control)キーとCを同時に押す)を実行してサーバを終了します。(WindowsでCTRL-Cで終了しない場合は、CTRL-PAUSEを試してください。)

{% coach %}
- Make sure it's clear what each command does: `cd`, `dir`/`ls`, `mkdir`, `rails server`.
- Briefly explain what was generated by `rails new`.
- Briefly explain what the Rails server does and why we need it.
- Briefly explain how can you stop the server.
{% endcoach %}

## Idea の scaffold をする

Rails の scaffold 機能を使って、list, add, remove, edit, view を生成します。これが Rails アプリの最初の一歩です。
ここでは ideas という名前で作ります。

{% highlight sh %}
rails generate scaffold idea name:string description:text picture:string
{% endhighlight %}

{% coach %}
- Explain what Rails scaffolding is. How does it help us create parts of an app quickly?
- Briefly explain the `rails generate scaffold` command and how it works. What do they arguments mean?
    - What is the model name argument?
    - How do you specify database fields with `name:string` and what do they parts mean?
{% endcoach %}

scaffold は新しいファイルをプロジェクトのディレクトリに追加しますが、意図したように動作させるためには以下の 2 つのコマンドを実行してデータベースの更新と Rails server プロセスをリスタートする必要があります。

{% highlight sh %}
rails db:migrate
rails server
{% endhighlight %}

ブラウザで [http://localhost:3000/ideas](http://localhost:3000/ideas) にアクセスしてください。(Replit のようなクラウドサービスの場合は、```rails server -b 0.0.0.0```を実行してサーバを起動し直してメニューから 'preview' - 'port 3000' を選び、アドレス欄の末尾に '/ideas' を加えてアクセスしてください。詳細は [インストール・レシピ](/install) を参照してください。)

いろいろクリックしてみたりしたら、 CTRL-C を押して、サーバを終了します。(WindowsでCTRL-Cで終了しない場合は、CTRL-PAUSEを試してください。)

## routes を調整する

<http://localhost:3000> を開いてみてください(クラウドサービスの場合は preview してください)。まだデフォルトページが見えると思います。ideas ページにリダイレクトするようにしましょう。

`config/routes.rb` を開いて、最初の行の次に以下のコードを追記してください:

{% highlight ruby %}
root to: redirect('/ideas')
{% endhighlight %}

ルートパス(<http://localhost:3000/> またはクラウドサービスの場合は preview )をブラウザで表示して変更点を確認しましょう。

**Coachより:** routes について話してください。

## 次は？

You have now created your first app! Congratulations!

From here we will continuing working on the app to improve the design with HTML and CSS, add more pages, add picture uploads, put your app online so that others can see it as well, share the code with others, allow people to leave comments, etc.

Talk with your coach about the steps you took in this guide. Do you have questions about any of the steps? Ask them before moving on to the next guide.
