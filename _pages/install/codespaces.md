---
layout: main_guide
title: GitHub Codespaces を使う
description: "Install Ruby and Rails on your Linux computer and get prepared for the Rails Girls workshop."
permalink: install/codespaces
---

# GitHub Codespacesを利用する

[GitHub Codespaces](https://github.co.jp/features/codespaces) はブラウザ上で開発できるサービスです。必要なものは GitHub アカウントです。無料のプランでも月60時間まで使えるため、有料の Pro プランなどへのアップグレードは不要です。

[![Codespacesの公式紹介ページ](/images/codespaces/landing-page.webp)](https://github.co.jp/)

## *1.* ブラウザを確認する

* Internet Explorer を利用している場合は、[Google Chrome](https://www.google.com/intl/ja/chrome/browser/) または [Firefox](https://www.mozilla.org/ja/firefox/new/) をインストールしてください。（一部の機能がIEでは動かない場合があります。）

## *2.* アカウントを作成する
- [GitHubの公式ページ](https://github.co.jp/)に行き、アカウントを作成しましょう。

## *3.* Codespaces のページに行く
- 画面上にある「[Codespaces](https://github.com/codespaces)」をクリックします。

![Codespacesのトップページ](/images/codespaces/top.webp)

## *4.* Templates をクリックする
- 画面左にある「[Templates](https://github.com/codespaces/templates)」をクリックします。

![Codespacesのテンプレート](/images/codespaces/template.webp)

## *5.* Use this template をクリックする
- テンプレートを選ぶ画面まで来たらRuby on Railsの欄にある「Use this template」をクリックします。
- クリックすると、ブラウザ上で開発するための準備が始まります。
- しばらく放置して、以下の画面が表示されるまで待ちましょう。

![Codespacesの初期画面構成](/images/codespaces/default.webp)

ほとんどの場合は上記の画面まで自動的に進みますが、読み込みエラーなどで止まることがあります。もししばらく待っても上記の画面にならなかったら、画面下の「ターミナル」内にある `http://127.0.0.1:3000` という URL にカーソルを当ててください。

カーソルを当てると「リンクにアクセス」というポップアップが表示されるので、このリンクをクリックします。

![Codespacesのターミナル](/images/codespaces/terminal.webp)

「リンクにアクセス」をクリックすると、最初の手順 `1.` で用意したブラウザで「GitHub Codespaces ❤️ Rails」が表示されます。

![Codespacesのプレビュー画面](/images/codespaces/preview.webp)

以上でセットアップは完了です。お疲れ様でした。

<!--
以下、細かな操作方法のスクショ画像もあります。必要なら使ってください! by @yasulab
- ![CodespacesでHello, Rails](/images/codespaces/hello.webp)
- ![Codespacesの簡易ブラウザ](/images/codespaces/browser.webp)
- ![Codespacesで新規ターミナル](/images/codespaces/new-bash.webp)
-->
