---
layout: main_guide
title: 画像アップロード機能を追加する
description: "Railsアプリで画像アップロードをできるようにしてアイデアを膨らませよう。"
permalink: uploads
---

# 画像アップロード機能を追加する

*翻訳者: Mai Muta, [@maimux2x](https://twitter.com/maimux2x)*

{% include main-guide-intro.html %}

前のガイドまでで作成したアプリに対して想像力を膨らませるために、写真や絵などの視覚的な要素があると便利です。idea modelにファイルアップロード機能を追加することで、画像を添付することができるようになります。

## Ruby gem をインストールしよう

Railsにファイルをアップロードする機能を追加するには、ライブラリをインストールする必要があります。

プロジェクトディレクトリ内の `Gemfile` を開いて、この行の直後に、

{% highlight ruby %}
gem "sqlite3"
{% endhighlight %}

次の一行を追加します。

{% highlight ruby %}
gem "carrierwave"
{% endhighlight %}

サーバーを起動中の場合はターミナル上で、<kbd>Ctrl</kbd>+<kbd>C</kbd>を押して、終了させましょう。

続いてターミナル上で、次のコマンドを実行してください。

{% highlight sh %}
bundle install
{% endhighlight %}

これにより先ほど `Gemfile` ファイルに追加した `carrierwave gem` がインストールされます。

{% coach %}
ライブラリ（Ruby gems）とは何か、なぜ便利なのかを説明しましょう。同様にオープンソースソフトウェアとは何かについて説明をお願いします。

Resources: RubyGems GitHub [introduction](https://github.com/rubygems/rubygems#rubygems-) and Wikipedia [OSS](https://en.wikipedia.org/wiki/Open-source_software)
{% endcoach %}


## 画像アップローダーを生成しよう

次に、ファイルのアップロードを処理するためのコードを生成します。ターミナルで次のコマンドを実行しましょう。

{% highlight sh %}
rails generate uploader Picture
{% endhighlight %}

アップローダーが見つからないというエラーが表示される場合は、以下の行も追加してください。

{% highlight ruby %}
gem "net-ssh"
{% endhighlight %}

このgemを追加した場合は、ターミナルアプリで以下のコマンドを実行してください。追加したgemをインストールした上で、再度ファイルアップロード生成のためのコマンドを試してみてください。

{% highlight sh %}
bundle install
{% endhighlight %}


## idea model に画像アップローダーを実装しよう

ここまでで、アプリ内で写真をアップロードする方法の下準備が整いました。しかし、新規でデータ登録をする際にフィールドのどこに画像をアップロードしたいかをRails側に伝えるため、もう少し手を加える必要があります。

テキストエディタで `app/models/idea.rb` ファイルを開いてください。このファイルは、データをデータベースに保存し、保存したデータを取得して画面に表示するために使用されます。どのフィールドがファイルアップロードを処理するかをRailsに伝えるために次の手順でコードを変更します。

次の行の直後に

{% highlight ruby %}
class Idea < ApplicationRecord
{% endhighlight %}

以下を追加して保存します。

{% highlight ruby %}
mount_uploader :picture, PictureUploader
{% endhighlight %}

この `mount_uploader` 行は、idea modelに対して `picture` フィールドがファイルアップロードの役割を持つことを伝えています。このフィールドにファイルアップロードに関する情報を保存し、後ほど画面に表示します。

## 画像をアップロードしよう

これで、idea modelは `picture` フィールドからファイルアップロードを行えることを理解したので、テキストフォームになっている `picture` フィールドを、画像を選択するように変更することができます。

`app/views/ideas/_form.html.erb` を開いて以下の箇所を

{% highlight erb %}
<%= form.text_field :picture %>
{% endhighlight %}

次のように変更して保存します。

{% highlight erb %}
<%= form.file_field :picture %>
{% endhighlight %}

ブラウザで<http://localhost:3000/ideas/new>を開きましょう。 新しいフォームでは、 `picture` フィールドに初めとは異なる要素が表示されるようになりました。テキストフィールドの代わりにファイル選択ツールが表示され、「参照...」または「ファイルを選択」ボタンに変更されています。
新しいデータを登録するためにフォームに情報を記入し、今回は新たに実装した画像アップロード機能を使って画像も選択します。あなたのパソコンにある任意の画像で構いません。
場合によっては、 *TypeError: can't cast ActionDispatch::Http::UploadedFile to string* というエラーが起きることもあります。エラーになった場合は、 `app/views/ideas/_form.html.erb` の

{% highlight erb %}
<%= form_with(model: idea) do |form| %>
{% endhighlight %}

上記のコードを、以下のように変更してみてください。

{% highlight erb %}
<%= form_with(model: idea, html: {multipart: true}) do |form| %>
{% endhighlight %}

## 画像を表示させよう

これで、画像を登録することができるようになりました！しかし、今はまだデータを保存してもファイル名しか表示されないので、登録した画像を見ることができません。画像が表示されるようにコードを変更しましょう。

画面上に画像を表示するためには, `app/views/ideas/_idea.html.erb` (`app/views/ideas/show.html.erb` で呼び出している部分テンプレート) を開いて以下の部分を

{% highlight erb %}
<%= idea.picture %>
{% endhighlight %}

このように編集して保存します。

{% highlight erb %}
<%= image_tag(idea.picture_url, width: 600) if idea.picture? %>
{% endhighlight %}

`image_tag` を使うことで、画像データが存在する場合に、該当の画像を表示するようにRails側に指示しました。画像を登録していない場合には、画像は表示されません。

ブラウザを更新しましょう。アップロードした画像が表示されるはずです！

## 画像データは .gitignoreに指定しよう

デフォルトでは、アプリはすべての画像をローカルに保存するため、開発中は問題ありませんが、アプリのソースコードと一緒に画像データを保存することは避けたいところです。

`.gitignore` ファイルを開き、一番下に次の行を追加しましょう。

{% highlight erb %}
public/uploads/
{% endhighlight %}
