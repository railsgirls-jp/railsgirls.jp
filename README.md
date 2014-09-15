# Rails Girls Guides 日本語版

Rails Girls Guideの邦訳です。

翻訳に参加する場合は、issueを開いて、どの部分を翻訳しているかを書きましょう。翻訳が終わってpushしたらissueを close します。

Rails Girls Tokyo開催に向けて話しあうメーリングリストは　https://groups.google.com/forum/#!forum/rails-girls-tokyo です。MLは公開していないので、参加リクエストをください。

# 編集方法

Rails Girls JP(Japanese) のサイトを編集したい場合は、このリポジトリの"Fork"ボタンをクリックしてForkしてください。以下の手順でローカルにファイルをダウンロードし、環境をつくります。

```
git clone git@github.com:YOURNAME/railsgirls-jp.github.io.git
cd railsgirls-jp.github.io
bundle install
```

閲覧する場合は、以下の手順でWebサーバを起動し、ブラウザから http://localhost:4000 へアクセスします。

```
bundle exec jekyll serve --watch
```

## 既存のページを編集

```_posts``` ディレクトリ以下にある、各ページのファイルを編集してください。

## ページを追加

```
rake post title="my fabulous post"
```

を実行すると、year-month-date-my-fabulous-post.markdown というテンプレートが ```_post``` ディレクトリに作られるので、これを編集します。```_post``` ディレクトリ以下のファイルは最初の部分に permalink の記述がなければ、ブログポストして扱われます。permalinkがある場合は、どこかのページから permalink で指定した URL へリンクします。

## 独立したページを追加
このサイトの About や Event のような独立したページを作りたい場合は

```
rake page name="something"
```

を実行します。この場合、something/index.html という名前でテンプレートが作られるので、これを編集します。このファイルも、どこかのページからリンクします。

# pull request を送る

pull request を送ることで、本家のページに変更依頼をすることができます。

まず、ブランチを作成し、変更をコミットします。

```
git checkout -b something_nice_branch_name
git add 変更したファイル
git commit -m "変更内容をここにコメントとして書きます"
```

github の自分の(forkした先の)リポジトリへpushします。
```
git push origin something_nice_branch_name
```

github の自分のリポジトリへブラウザでアクセスし、 "copare & pull request" ボタンを押し、内容を記述し、pull request を送ります。

みなさんのご協力に感謝します！

----

以下、オリジナルのREADMEそのままです。

----

Our aim is to give tools for women to understand technology. The Rails Girls events do this by providing a great first experience on building the Internet.

Rails Girls was founded in end of 2010 in Helsinki. Originally intended as a onetime event, we never thought to see so many local chapters all around the world! This guide has been put together to help you get started.

You can use our materials and instructions to roll out your own workshop in your city, workplace or kitchen! Read more about Rails Girls at http://railsgirls.com

## Quick start

View the guides at http://guides.railsgirls.com or clone this repo and install & run [jekyll](https://github.com/mojombo/jekyll)

### Installing jekyll

```
$ cd railsgirls.github.com
```

```
$ bundle install
```

### Pygments and Code Highlighting

The guides use the [pygments](http://pygments.org/) library to do syntax highlighting. If you don't have it installed you won't be able to see the highlight sections like the following:

```
{% highlight %}
{% endhighlight %}
```

If you aren't editing the code blocks, you can safely ignore this. If you want pygments, you can follow the [install instructions](https://github.com/mojombo/jekyll/wiki/Install) in the "Pygments" section.

### Run jekyll

```
$ jekyll --server --auto
```

### Having trouble?

You might find some useful hints in this jekyll issue if it's not working as expected: [Issue 503](https://github.com/mojombo/jekyll/issues/503)

## Contributing a Guide

To contribute a guide, view the instructions at http://guides.railsgirls.com/contributing

## Twitter

For updates and more follow [@railsgirls](https://twitter.com/railsgirls)

## Website & Blog

Official website and blog for Rails Girls movement can be found at http://railsgirls.com

## E-mail list

Global mailing list for Rails Girls events at http://groups.google.com/group/rails-girls-team

## Credits

* Karri Saarinen / [@karrisaarinen](https://twitter.com/karrisaarinen) / [github](http://github.com/ksaa)
* Linda Liukas / [@lindaliukas](https://twitter.com/lindaliukas) / [github](http://github.com/lindaliukas)
* Vesa Vänskä / [@vesan](https://twitter.com/vesan) / [github](http://github.com/vesan)
* Terence Lee / [@hone02](https://twitter.com/hone02) / [github](http://github.com/hone)

..and all the other coaches and people making Rails Girls awesome. Please add yourself!
