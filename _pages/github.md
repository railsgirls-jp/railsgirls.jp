---
layout: main_guide
title: GitHubにpushしてみよう ( How to Push to GitHub )
permalink: github
---

# GitHubに自分のアプリをPushする

*作成者： Alyson La, [@realalysonla](https://www.twitter.com/realalysonla)*
*[Original page](https://railsgirls.com/)*
*翻訳者: Mai Muta, [@maimux2x](https://twitter.com/maimux2x)*

{% include main-guide-intro.html %}

Gitは、アプリのソースコードを保存し、変更履歴を記録・追跡することが可能なツールです。オンラインでコードを共有して他の人とコラボレーションすることができます。

{% coach %}
Gitやバージョン管理のこと、Gitを使った他の人とのコラボレーション、GitHub、Gitを使ったデプロイメント、オープンソースについて少し話しましょう。
{% endcoach %}

## Gitをインストールしよう

Gitを使う前に、まずGitがすでにインストールされているかどうかを確認しましょう。ターミナルで次のコマンドを入力してください。

{% highlight sh %}
git --version
{% endhighlight %}

1.8以上のバージョンが表示されるはずです。Gitがインストールされていない場合（`command not found` などのエラーが表示される）、またはバージョンが1.8より低い場合は、Gitをインストールまたはアップグレードしましょう。

<div class="os-specific">
  <div class="mac">
<p>以下のコマンドをターミナルで実行すると、macOSにGitをインストールまたはアップグレードすることができます。</p>
{% highlight sh %}
brew install git
{% endhighlight %}
  </div>
  <div class="nix">
<p>Gitのドキュメントに記載されている、<a href="https://git-scm.com/download/linux">お使いのオペレーティングシステムの説明</a>に従ってインストールしてください。</p>
  </div>
  <div class="win">
<p><a href="http://git-scm.com/downloads">Git</a>のウェブサイトにアクセスし、Windows用のGitインストーラーをダウンロードして実行し、Gitをインストールしてください。</p>
  </div>
</div>

インストールやアップグレードを行った後に、`git --version` コマンドを再度実行し、1.8以上のバージョンが表示されていることを確認しましょう。

## Gitの設定をしよう

Gitがインストールできていることを確認したら、Gitでローカルプロフィールを設定します。このプロフィールは、Gitに保存するファイルに誰が変更を加えたかを記録するために使われます。これにより、誰がいつどのような変更をしたのかを確認することができます。

`your name` と `your email` は、自分の名前とメールアドレスに変更しましょう。実際の本名とメールアドレスを使いたくない場合は、ニックネームや別名を使うこともできます。
※ここで設定した名前とメールアドレスは、他の人にも公開されます！

{% highlight sh %}
git config --global user.name "your-name"
git config --global user.email "your-email"
{% endhighlight %}

Gitにプロフィールが設定されているかは、以下のコマンドを実行し、`user.name` と `user.email` の設定の内容を確認してみましょう。

{% highlight sh %}
git config --list
{% endhighlight %}

## Gitに作業を保存しよう

ターミナルを開き、_railsgirls_ のアプリディレクトリに移動して以下のコマンドを実行します。ディレクトリ内で変更があったファイル（今回はあなたのアプリのすべてのファイル）が全部リストアップされるでしょう。

{% highlight sh %}
git status
{% endhighlight %}

これらのファイルをGitに保存して、あなたが作成したGitHubのリポジトリにプッシュできるようにしたいですね。次のコマンドを実行すると、すべてのファイルがGitのステージングエリアに追加され、保存 (コミット) できるようになります。

{% highlight sh %}
git add .
{% endhighlight %}

以下の `git commit` コマンドを実行すると、ステージングエリアに追加されたファイルが「First commit」というメッセージとともにGitに保存されます。

{% highlight sh %}
git commit -m "First commit"
{% endhighlight %}

(上記コマンドの `-m` は "message" の略です)

## GitHubアカウントを作成しよう

GitHubは、無料のオンライン・コード共有プラットフォームです。_Git_ で保存されたソースコードの _ハブ_ となっています。これを利用して、アプリのソースコードを保存・共有することになります。

[GitHubのウェブサイト](https://github.com)にアクセスし、アカウントを作成するか、すでにGithubでアカウントを持っている場合はログインします。

## GitHubでコードを安全に共有しよう

認証を管理する最も簡単な方法は、[Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)を作成することです。PATを利用することで、あなたのパソコンとGitHubのサイトの両方に認証情報が保存されていることになります。

コンピュータ上のコードをGitHubサイトの自分のアカウントに取り込むということは、インターネット経由で接続する必要があります。GitHubはHTTPSとSSHによる接続を提供しています。Personal Access Token (PAT) を使うには HTTPS 接続が必要です。これは、次のセクションでPATを作成するときに重要になります。

## コマンドラインを使ってアプリをGitHubにプッシュしよう(Part1)

GitHubのアカウントを取得したことで、保存したソースコードをGitHubにプッシュ（Git用語で _アップロード_ の意味）して、他の人と共有することができるようになりました。

GitHubにサインインしたら、ナビゲーションバーの右上にあるプラスアイコン(`+`)をクリックします。ドロップダウンの中から、`New repository` を選択します。
該当のリンクが見つからない場合はこちらの [新規リポジトリページ](https://github.com/new) に直接アクセスしてください。

`Create a new repository` ページで、リポジトリ名（例：railsgirls）を入力し、リポジトリの可視性を「Public」にし、「Create repository」ボタンをクリックしてください。フォームの残りの部分はそのままにしておきます。

リポジトリ作成後の次のページでは、アプリのソースコードをプッシュする場所をGitに伝えるために必要なリポジトリURLが表示されているでしょう。

PATで動作するように、HTTPS用の手順が画面に表示されていることを確認しましょう。一番上の `Quick setup` セクションで、「HTTPS」ボタンが選択されていない場合は、該当のボタンをクリックしてください。そして、すべての手順のリンクが `https` で始まるように変更されていることを確認しましょう。

「push an existing repository from the command line」に記載されている手順を使用しましょう。該当の手順の中で、`git remote add origin` で始まる行を探します。その行をすべてコピーして、ターミナルに貼り付けます。そしてEnterを押してください。

このステップでは、ローカルリポジトリに先ほど作成したGitHubリポジトリを指す"origin"というGit _リモート_ 、すなわち _接続先_ を作成します。

## パーソナルアクセストークンの作成をしよう

次に、[PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)を作成する必要があります。

GitHubのパーソナルアクセストークンを作成するには、このURLから <https://github.com/settings/tokens> アクセスできます。または、GitHub にログインした状態であれば、次の手順でどのページからでも設定画面にいくことが可能です。
まず、右上の自分のアバターをクリックします。次に、「Settings」、「Developer settings」、「Personal access tokens」、「Tokens (classic)」の順にクリックします。

「Personal access tokens (classic)」ページに移動したら、「Generate new token」のドロップダウンメニューをクリックし、「Generate new token (classic)」を選択してください。GitHubアカウントで2要素認証を有効にしている場合は、このタイミングで2要素認証する必要があります。

「New personal access token (classic)」の設定画面が表示されたら、「Note」の欄に何用のトークンかの説明を入力し(例: RailsGirls)、有効期限を選びます。(有効期限を過ぎてもこのプロジェクトを使用する予定がある場合は、PATの有効期限が切れたときにこの手順を繰り返す必要があります)

次に、「Select scopes」の設定箇所で、一番上の「repo」チェックボックスを選択すると、PATに「Full control of private repositories（プライベートリポジトリの完全制御）」が反映されます。

最後に、ページ下部の「Generate token」をクリックします。

次のページで、作成したあなたのPATが表示されます。このページにアクセスできるのはこの時だけですので、次のセクションである _push_ する手順を完了するまでは、このページを閉じない方が良いでしょう。

PATトークンはコピーして安全なパスワード管理ツールに保存しておきましょう。その際、トークンの前後にスペースがないように注意しましょう。トークン表示箇所の最後にある四角が二つ重なったボタンで正確にコピーすることができます。

## コマンドラインを使ってアプリをGitHubにプッシュしよう（Part2）

それでは、Gitリポジトリのローカルでの変更をGitHub上のリポジトリに _push_ しましょう。ターミナルで以下のコマンドを実行します。

{% highlight sh %}
git push -u origin master
{% endhighlight %}

ターミナルに認証プロンプトが表示されたら、以下の例のようにパスワードに先ほど作成したあなたのPATを使用します。なお、パスワードにPATを貼り付けてもターミナル上には表示されません。再度貼り付けると、トークンを2回入力することになるので、二重で貼り付けないように気をつけましょう。

{% highlight sh %}
Username: <your GitHub username>
Password: <paste in your personal access token>
{% endhighlight %}

コードをプッシュするたびにPATが必要になる場合があるかもしれませんが、PATをコンピューターに保存することもできます。このプロセスはOSごとに異なるので、GitHubにコードを継続的にプッシュしたい場合は、コーチに相談してみましょう。

{% coach %}
参加者が望む場合、PATの保存方法の確認と実践に協力してください。参加者のオペレーティングシステムに対応した最新のガイドを見たり、[異なるオペレーティングシステムでPATを保存するためのガイド](https://mgimond.github.io/Colby-summer-git-workshop-2021/authenticating-with-github.html#saving-tokens-in-windows)を参照してください。
{% endcoach %}

これでGitHubにアプリがアップされました！ブラウザでGitHubの対象のリポジトリのページを更新すると、ファイルがたくさん表示されるはずです。

## Gitでもっと多くの変更を保存してみよう

新たな変更をGitHubにプッシュしたい場合は、次の3つのコマンドを使用して実行しましょう。

Gitで保存したい変更点を _ステージングエリア_ に追加します。

{% highlight sh %}
git add .
{% endhighlight %}

コミットメッセージとともに変更を保存します。

{% highlight sh %}
git commit -m "Type your commit message here"
{% endhighlight %}

どのコミットで何を変更したのか、なぜ変更したのかを確認できるように、説明的なメッセージを心がけましょう。

{% coach %}
良いコミットメッセージの条件（実装内容、簡潔で説明的かなど）について話しましょう。
{% endcoach %}

そして、変更をGItHubにプッシュしましょう。

{% highlight sh %}
git push origin master
{% endhighlight %}

## 次に何をする？

### Gitについてもっと学ぶ

* [Gitチートシート](https://github.github.com/training-kit/downloads/ja/github-git-cheat-sheet/) に頻繁に使うコマンドがまとめられています。([PDF](https://github.github.com/training-kit/downloads/ja/github-git-cheat-sheet.pdf)版もあります。)
* [Gitのドキュメント](https://git-scm.com/docs)でもっと多くのGitコマンドを調べてみましょう。
* ターミナル操作よりもPCの画面上で操作がしたい場合はGUI（グラフィカル・ユーザー・インターフェイス）を使ってみるのもよいでしょう。[GitHub Desktop](https://desktop.github.com/)のようなアプリを試してみてください。
* 将来、プロジェクトでより多くの人と仕事をするようになると、ブランチやプルリクエストを扱う機会が多くなるでしょう。
 
### オープンソースコミュニティーに参加する

* GitHubで、RailsGirlsの仲間やコーチをフォローしてどんな活動をしているか見てみましょう。
* 彼らのプロジェクトにstarやwatchをつけてみましょう。
* プロジェクトのリポジトリを[Fork](https://docs.github.com/ja/get-started/quickstart/fork-a-repo)し、クローンして自分の変更ををpushすることができます。その変更を[プルリクエスト](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)でフォーク元に共有してみましょう!
* バグを見つけたら、プロジェクトにissueを作成しましょう
* プログラミング言語やキーワードで検索して、他のオープンソースプロジェクトを調べてみましょう。
