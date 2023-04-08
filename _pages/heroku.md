---
layout: default
title: Rails Girls Heroku に deploy
permalink: heroku
---

# Heroku に Rails アプリを deploy しよう

*Created by Terence Lee, [@hone02](https://twitter.com/hone02)*

### Heroku の準備

#### Heroku のアカウントを作成しよう

<img src="../images/heroku-team-invitation.png" />

RailsGirlsJPチームへの招待メールが送られます。
招待メールからInvitationをAcceptしてください。

[ユーザ登録画面](https://signup.heroku.com/)からアカウントを作成しましょう。

<img src="../images/heroku_sign_up.png" />

「First name」に名前、「Last name」に苗字、「Email」にメールアドレス、「Role」でHobbyistを選択、国を選択、言語として Ruby を選択して最後に「I'm not a robot」にチェックを入れて「Create Free Account」ボタンを押します。

しばらくすると入力したメールアドレスに「Confirm your account on Heroku」という件名のメールが届くので、本文中の activate 用の URL をクリックします。

<img src="../images/heroku_password.png" />

heroku で用いるパスワードを入力しましょう。

MFAの設定が求められます。MFAの設定を行ってアカウントの作成は完了です。

<img src="../images/heroku-mfa.png">

#### Heroku CLI をインストールしよう

Heroku でコマンドライン操作を行うためのアプリケーションである、Heroku CLI をインストールします。

[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

このページの「[Download and install](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)」という段落から、自分のノートパソコンのOSに合わせてインストールしましょう。

##### Macの場合

[Ruby, Railsのインストール時に](http://railsgirls.jp/install)Homebrewをインストールしているはずなので、Homebrewを使ってインストールできます。

{% highlight sh %}
brew install heroku/brew/heroku
{% endhighlight %}

##### Windows（WSL）の場合

Ubuntuを起動して、次のコマンドを入力しましょう。

{% highlight sh %}
curl https://cli-assets.heroku.com/install.sh | sh
{% endhighlight %}

__Coachへ__: [Heroku CLIのページ](https://devcenter.heroku.com/articles/heroku-cli) を見るとUbuntuではsnapを使う手順を説明していますが、WSLではsnapの利用が困難であるため、Other installation methodsで紹介されている上記のコマンドでインストールします。

##### Windows（コマンドプロンプト）の場合

`64-bit` あるいは `32-bit` と書かれたリンクをクリックしてダウンロードしてください。

（自分のWindowsが32bit版64bit版かは、コントロールパネルから確認できます。[Microsoftのこちらの記事](https://support.microsoft.com/ja-jp/windows/32-%E3%83%93%E3%83%83%E3%83%88%E3%81%A8-64-%E3%83%93%E3%83%83%E3%83%88%E3%81%AE-windows-%E3%82%88%E3%81%8F%E5%AF%84%E3%81%9B%E3%82%89%E3%82%8C%E3%82%8B%E8%B3%AA%E5%95%8F-c6ca9541-8dce-4d48-0415-94a3faa2e13d)を参考に、確認してみてください）

ダウンロードが済んだら、heroku-x64.exe（あるいは、heroku-x86.exe） をダブルクリックし、表示される指示に従ってインストールしてください。

（環境により拡張子が表示されませんが、異常ではありません）

#### Heroku にコマンドラインでログインしよう

Heroku Toolbelt を無事インストールできたら、ターミナル（Mac）またはコマンドプロンプト（Windows）を起動して、次のコマンドを入力しましょう。

{% highlight sh %}
heroku login
{% endhighlight %}

`heroku: Press any key to open up the browser to login or q to exit:` と言われますのでEnterキーを押してください。するとブラウザでherokuのページが開かれます。
メールアドレスとパスワードの入力を求められたら先ほど登録したメールアドレスとパスワードを入力します。

ブラウザに以下の画面が表示されればherokuの準備はこれで終了です。

<img src="../images/heroku_logged_in.png" />

__Coachより__: Heroku か、従来のサーバーか、デプロイの利点について話してみましょう。

### アプリの準備

#### バージョン管理システム

作成したコードをバージョン管理システムに追加します。ターミナル上で次のコマンドを入力しましょう。:

{% highlight sh %}
echo public/uploads >> .gitignore
git add .
git commit -m "initial commit"
{% endhighlight %}

__Coachより__: バージョン管理システムと git について説明するちょうどいいタイミングです。`.gitignore` の説明と上記のファイルを管理対象外にしたい理由についても説明しましょう。

#### データベースのアップデート

まず、 Heroku で動くデータベースが必要です。いつものデータベースとは違います。 Gemfile を次のように変更しましょう。 :

{% highlight ruby %}
gem 'sqlite3', '~> 1.4'
{% endhighlight %}

↓

{% highlight ruby %}
group :development do
  gem 'sqlite3', '~> 1.4'
end
group :production do
  gem 'pg'
end
{% endhighlight %}

そして、ターミナル上で次のコマンドを実行してセットアップしてください。

{% highlight sh %}
bundle config set --local without 'production'
bundle install
{% endhighlight %}

{% highlight sh %}
git add .
git commit -m "Added pg gem and updated Gemfile.lock"
{% endhighlight %}

__Coachより__: RDBMS とそうでないものについて話してみましょう。Heroku 上の PostgreSQL の制限についても少し取り上げてみてください。

### アプリのデプロイ

#### アプリのcreate

Heroku のアプリを作りましょう。  
まずは世界に１つだけのアプリの名前を考えましょう！  

名前が決まったら、ターミナルでコマンドを実行します。  
例えば、アプリの名前を"my-first-app"と決めた場合、ターミナルで次のコマンドを実行してください。 :

{% highlight sh %}
heroku create your-app-name -t railsgirls-japan
{% endhighlight %}

次のようなものが見られます。 :

{% highlight sh %}
Creating ⬢ your-app-name... done
http://my-first-app.herokuapp.com/ | https://git.heroku.com/my-first-app.git
{% endhighlight %}

もし、決めたアプリの名前が既に使われていたら、以下のようなメッセージが表示されます。 :
{% highlight sh %}
Creating ⬢ your-app-name... !
 ▸    Name your-app-name is already taken
{% endhighlight sh %}

この場合は、もう一度アプリの名前を考えてなおしてみてください。

#### コードをpush

さて、 Heroku にコードを送信しましょう。 ターミナルで次のコマンドを実行してください。 :

{% highlight sh %}
git push heroku main
{% endhighlight %}

そうすると、こんな出力が見られるはずです。 :

{% highlight sh %}
Enumerating objects: 96, done.
Counting objects: 100% (96/96), done.
Delta compression using up to 4 threads
Compressing objects: 100% (79/79), done.
Writing objects: 100% (96/96), 22.59 KiB | 1.61 MiB/s, done.
Total 96 (delta 7), reused 0 (delta 0), pack-reused 0
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Building on the Heroku-20 stack
remote: -----> Determining which buildpack to use for this app
remote: -----> Ruby app detected
remote: -----> Installing bundler 2.3.10
remote: -----> Removing BUNDLED WITH version in the Gemfile.lock
remote: -----> Compiling Ruby/Rails
remote: -----> Using Ruby version: ruby-3.1.0
remote: -----> Installing dependencies using bundler 2.3.10
remote:        Running: BUNDLE_WITHOUT='development:test' BUNDLE_PATH=vendor/bundle BUNDLE_BIN=vendor/bundle/bin BUNDLE_DEPLOYMENT=1 bundle install -j4
remote:        Fetching gem metadata from https://rubygems.org/..........
...
remote: -----> Launching...
remote:        Released v6
remote:        https://my-first-app.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/my-first-app.git
 * [new branch]      main -> main
{% endhighlight %}

アプリのプッシュが終わってるのがわかりますか？ "Launching..." というテキストのところです。プッシュが成功したら **データベースのマイグレート** へ進んで下さい。

__Coachより__: どのようなファイルがプッシュされ、どのようなファイルがされなかったか話してみてください。まだであればアップロードされるファイルについて話してみたり、config以下のいくつかのファイルについて可能な範囲で話してみてください。

##### ・ pushで認証が要求された場合

もし下のように表示された場合は (Windowsでユーザー名が全角の場合に起きます) :

{% highlight sh %}
Username for 'https://git.heroku.com':
{% endhighlight %}

まず、`CTRL-C`を押しコマンドを終了します。そして次のコマンドを実行してみて下さい。

{% highlight sh %}
heroku auth:token
d42d086f-b127-4cf0-a2a9-acaf13287213
{% endhighlight %}

ターミナルに表示された文字列をコピーして下さい。上の例では文字列は d42d086f-b127-4cf0-a2a9-acaf13287213 ですが、あなたの画面では違う文字列が表示されています。

そして、git push ... コマンドを実行して下さい。


{% highlight sh %}
git push heroku main
Username for 'https://git.heroku.com':   ← 何も入力せず Enter
Password for 'https://git.heroku.com':   ← 上でコピーした文字列をペーストし Enter
{% endhighlight %}

##### ・ git push時、`Failed to install gems via Bundler.` が発生した場合

herokuの動作環境と設定が異なる場合に起きます。設定を追加して git push ... してみましょう。

{% highlight sh %}
bundle lock --add-platform x86_64-linux
git add .
git commit -m "Added platform"
git push heroku main
{% endhighlight %}

##### ・ その他のエラーの場合

画面表示を見ながらコーチと相談して問題を解決して下さい。

#### データベースのマイグレート

そして、ワークショップでローカルにやったように、データベースのマイグレートをする必要があります。 :

{% highlight sh %}
heroku run rails db:migrate
{% endhighlight %}

公共のネットワークなどを使った場合、`ETIMEDOUT: connect ETIMEDOUT (IPアドレス):5000` というエラーが起きることがあります。エラーになった場合は実行するコマンドを `heroku run:detached rails db:migrate` に変更してみてください。

そのコマンドが実行されたら、インターネットからアプリを見ることができます。このアプリの例ではURLは、 [http://my-first-app.herokuapp.com/](http://my-first-app.herokuapp.com) です。もしくは、クラウドIDE以外ならターミナルで次のコマンドを実行すれば、そのページを見に行くことができます。

{% highlight sh %}
heroku open
{% endhighlight %}

もし、これまでに出てきたコマンドの実行中に表示されるURLを見逃していた場合は、以下のコマンドを実行した時の `Web URL` の行(最後の行)を確認してください。

{% highlight sh %}
heroku apps:info
{% endhighlight %}

#### おわりに

Heroku のプラットフォームは癖がない訳ではありません。Heroku 上のアプリは ephemeral な(再起動で一部のファイルが揮発する)環境で動作しています。- これは(データベースに保存された情報と push した情報を除く)全てのファイルがアプリの再起動で消えてしまうという事です。(例えば、新しいバージョンのプログラムを push した場合)

###### [Ephemeral ファイルシステム](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem)
> Each dyno gets its own ephemeral filesystem, with a fresh copy of the most recently deployed code. During the dyno’s lifetime its running processes can use the filesystem as a temporary scratchpad, but no files that are written are visible to processes in any other dyno and any files written will be discarded the moment the dyno is stopped or restarted.
>
> (各 dyno は専用の ephemeral ファイルシステムを取得します。この領域には最新のデプロイしたプログラムもコピーされます。実行中のプロセスが dyno の生存期間にある間は、このファイルシステムを一時的なスクラッチパッドとして扱う事ができます。しかし、dynoが停止か再起動をした瞬間に出力されていたすべてのファイルはプロセスから見えなくなります)

[App](/app) では、追加した Idea レコードにファイルを添付する事ができます。このファイルはアプリの `public/uploads` フォルダ以下に配置されます。以下の手順で Heroku での ephemeral ストレージの動作を確認できます:

1. `heroku open` を実行してアプリを開きます
2. 新しい Idea に画像を付けて追加します
3. `heroku restart` を実行してアプリを再起動します
4. 追加した Idea を再度表示し、このページを reload します - 画像は表示されなくなります

##### Ephemeral ストレージの回避策

これは実際のアプリにとっては明らかに不便ですが、有名なサイトでも使われてる回避策がちゃんとあります。

最も一般的な回避策はAmazon S3(Simple Storage Service)やRackspace CloudFilesのような外部ホストの資源を利用する事です。これらのサービスは(安価な - 通常 0.1$/GB 以下の)アプリから永続的に利用可能なストレージを 'クラウド上に' 提供します(つまりファイルをどこへでも提供し得えます)。

この機能は少しだけこのチュートリアルの範囲から外れますが、以下のようなリソースを参考に、目的にあった方法を見つける事ができるでしょう。

* [How to: Make Carrierwave work on Heroku](https://github.com/carrierwaveuploader/carrierwave/wiki/How-to%3A-Make-Carrierwave-work-on-Heroku)
* [Amazon S3 - The Beginner' Guide](http://www.hongkiat.com/blog/amazon-s3-the-beginners-guide/)

いつものように、わからない事がある場合や手助けが必要な場合は担当のコーチが対応してくれます。
