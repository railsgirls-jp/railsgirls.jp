# Rails Girls Guides 日本語版

Rails Girls Guide の邦訳です。

翻訳に参加する場合は、issue を開いて、どの部分を翻訳しているかを書きましょう。翻訳が終わって push したら issue を close します。

Rails Girls Tokyo 開催に向けて話しあうメーリングリストは https://groups.google.com/forum/#!forum/rails-girls-tokyo です。ML は公開していないので、参加リクエストをください。

# 編集方法

Rails Girls JP (Japanese) のサイトを編集したい場合は、このリポジトリの "Fork" ボタンをクリックして fork してください。以下の手順でローカルにファイルをダウンロードし、環境をつくります。

CSSのビルドを行うのに[Node.js(npm)](https://nodejs.org/)が必要なので、あらかじめインストールしておいてください。

```
$ git clone git@github.com:YOURNAME/railsgirls.jp.git
$ cd railsgirls.jp
$ bundle install
$ npm install
```

閲覧する場合は、以下の手順で Web サーバを起動し、ブラウザから http://localhost:4000 へアクセスします。

```
$ bundle exec jekyll serve --watch
```

## ディレクトリ構成

各コンテンツは以下で管理されています。

| ページ | 管理ディレクトリ |
|---|---|
| ガイド | `_pages` |
| 独自コンテンツ | `_pages-jp` | 
| ブログ | `_posts` |

既存のページを編集したい場合は内容に応じて管理ディレクトリ配下をご確認ください。

## ガイドを追加

```
$ bundle exec rake guide title="my fabulous guide"
```

を実行すると、`YYYY-MM-DD-my-fabulous-guide.markdown` というテンプレートが `_pages` ディレクトリに作られるので、これを編集します。`_pages` ディレクトリ以下のファイルは最初の部分に permalink の記述がなければ、ブログポストして扱われます。permalink がある場合は、どこかのページから permalink で指定した URL へリンクします。

## 独自コンテンツを追加

独立したページを作成する場合以下の２通りの方法があります。

### Event のような独自ディレクトリ配下にページを作りたい場合

```
$ bundle exec rake directory_with_page name="something"
```

を実行します。この場合、`something/index.html` という名前でテンプレートが作られるので、これを編集します。編集完了後、Homeなどのページからリンクさせます。

### CoC や About のようなドメイン直下のページを作りたい場合

```
$ bundle exec rake original_content title="new original content"
```

を実行します。
`YYYY-MM-DD-new_original_content.markdown` というテンプレートが `_pages-jp` ディレクトリに作られるので、これを編集します。Homeなどのページから permalink で指定した URL へリンクさせます。

## ブログを書く

```
$ bundle exec rake blog title="a cool entry"
```

を実行すると `YYYY-MM-DD-a-cool-entry.markdown` というテンプレートが `_posts/blog` ディレクトリに作られるので、これを編集します。
画像は `images/blog` におきます。

#### HTML で書く

ブログエントリは markdown だけでなく、html でも書くことができます。html で書きたい場合は、`post_ext` オプションをつけてください。

```
$ bundle exec rake blog title="a cool entry" post_ext="html"
```

#### 記事一覧の画像を変更する

ファイルの先頭の `image` に設定されている画像が記事一覧に表示されます。表示したい画像のパスに変更してください。

```
image: /images/blog/awesome.png
```

# pull request を送る

pull request を送ることで、本家のページに変更依頼をすることができます。

まず、ブランチを作成し、変更をコミットします。

```
$ git checkout -b something_nice_branch_name
$ git add 変更したファイル
$ git commit -m "変更内容をここにコメントとして書きます"
```

github の自分の (fork した先の) リポジトリへ push します。

```
$ git push origin something_nice_branch_name
```

github の自分のリポジトリへブラウザでアクセスし、 "compare & pull request" ボタンを押し、内容を記述し、pull request を送ります。

みなさんのご協力に感謝します！

---

以下、オリジナルの README そのままです。

---

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
$ bundle exec jekyll serve --watch
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

Global mailing list for Rails Girls events at https://groups.google.com/group/rails-girls-team

## Credits

* Karri Saarinen / [@karrisaarinen](https://twitter.com/karrisaarinen) / [github](http://github.com/ksaa)
* Linda Liukas / [@lindaliukas](https://twitter.com/lindaliukas) / [github](http://github.com/lindaliukas)
* Vesa Vänskä / [@vesan](https://twitter.com/vesan) / [github](http://github.com/vesan)
* Terence Lee / [@hone02](https://twitter.com/hone02) / [github](http://github.com/hone)

..and all the other coaches and people making Rails Girls awesome. Please add yourself!
