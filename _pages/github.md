---
layout: default

title: GitHubにpushしてみよう ( How to Push to GitHub )

permalink: github
---

# GitHubに自分のアプリをPushする

*Created by Alyson La, [@realalysonla](https://www.twitter.com/realalysonla)*
*[Original page](https://railsgirls.com/)*
*Translated by Yuki Torii [@yotii23](https://www.twitter.com/yotii23)*

## はじめる前に必要な準備

### Git と GitHub

* Gitがインストールされているか確認する

	* ターミナルで

{% highlight sh %}
git --version
{% endhighlight %}

と入力してください (1.8以上のver.が表示されるのが望ましいです)

* もしインストールされていなければ, [ここ](http://git-scm.com/downloads)からGitをダウンロードする

* ターミナルで

{% highlight sh %}
git config --global user.name "your-name"
{% endhighlight %}
 と

{% highlight sh %}
git config --global user.email "your-email"
{% endhighlight %}

 をタイプしてください。("your-name","your-email" は自分の名前とEmailを英数字で入れてください。)

{% highlight sh %}
git config --list
{% endhighlight %}

 とタイプしてみて、nameとemailの設定が反映されていることを確認してみましょう。

* [GitHub](https://github.com)でアカウントを作成します(無料です）。すでにアカウントがある人はログインしてください。

**Coachより:** gitとバージョン管理、そしてオープンソースについてちょっと話してください。

## 自分のアプリを、コマンドラインでGitHubにPushする

GitHubの自分のプロフィールページで、Repositories タブから 'New' ![screen shot 2017-01-25](../images/github-new-button.png) をクリックしましょう。
名前(例：rails-girls)と、アプリについての短い説明をつけて、"public"レポジトリを選び、"create repository"をクリックします。

コマンドライン上で、`cd`で自分のrailsgirlsフォルダに入り、次のように入力します:

{% highlight sh %}
git init
{% endhighlight %}

これによって、自分のプロジェクトのgitレポジトリが初期化されます。

*メモ:* 最近のRailsではrails newの時にgit initを実行するようになっていますが間違って2度実行しても問題ありません。

`README.md` というファイルが、railsgirlsディレクトリに存在するか確認します:

<div class="os-specific">
  <div class="nix">
{% highlight sh %}
ls README.md
{% endhighlight %}
  </div>
  <div class="win">
{% highlight sh %}
dir README.md
{% endhighlight %}
  </div>
</div>

存在しない場合は、以下の通りにタイプして、"README.md" というファイルを作成します。

<div class="os-specific">
  <div class="nix">
{% highlight sh %}
touch README.md
{% endhighlight %}
  </div>
  <div class="win">
{% highlight sh %}
type nul > README.md
{% endhighlight %}
  </div>
</div>

**Coachより:** `README.md` についてちょっと話してください。

次に、以下のように入力してください:

{% highlight sh %}
git status
{% endhighlight %}

これで、現在あなたのワーキングディレクトリ内にある、全てのファイルの一覧が表示されます。

**Coachより:** あなたのお気に入りのgitコマンドについて話をしてください。

次に、すでに[Heroku guide](/heroku)の章で実行していなければ以下のように入力してください:

{% highlight sh %}
echo public/uploads >> .gitignore
{% endhighlight %}

これは、アップロードしたファイルをgitの管理対象から除外するようにしています。

**Coachより:** アップロードしたファイルがgitの管理対象になるとどのような問題があるか話してみてください。

次に、以下のように入力してください:

{% highlight sh %}
git add .
{% endhighlight %}

これは、すべてのファイルと変更をステージング領域に追加します。

次に、以下のように入力してください:

{% highlight sh %}
git commit -m "first commit"
{% endhighlight %}

これによって、"first commit"というメッセージとともに全てのファイルがコミットされます。

### GitHub に SSH キーを設定する

#### 既存の SSH キーを確認する

すでに SSH キーがつくられているかを確認します。ターミナルで以下のように入力してください。
Windows の場合は Git Bash を開いて実行してください。

{% highlight sh %}
ls -al ~/.ssh
{% endhighlight %}

~/.ssh ディレクトリ内のファイルが一覧で表示されますので `xxx.pub` という公開 SSH キーがあるかを確認しましょう。
デフォルト設定でつくられている場合、次のような名前になっています。
- id_rsa.pub
- id_ecdsa.pub
- id_ed25519.pub

#### SSH キーを生成する

（既存の SSH キーを使う場合は、この手順はスキップしてください。）

SSH キーが存在しなかった場合、または、持っている SSH キーとは別のものを生成したい場合には新しい SSH キーをつくります。

ターミナル（Windows の場合は Git Bash）で以下のコマンドを実行してください。（your_email@example.com の部分にはあなたのメールアドレスが入ります。）

{% highlight sh %}
ssh-keygen -t ed25519 -C "your_email@example.com"
{% endhighlight %}

すると以下のようなメッセージが表示されます。

{% highlight sh %}
Generating public/private ed25519 key pair.
Enter file in which to save the key (/Users/your-name/.ssh/id_ed25519):
{% endhighlight %}

SSH キーを保存するファイルを聞かれますので、
デフォルトの `~/.ssh/id_ed25519` で問題なければ何も入力せずに Enter を押します。
変更したい場合は、任意のファイルパスを指定しましょう。

{% highlight sh %}
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
{% endhighlight %}

次に SSH キーを使うときのパスフレーズを設定します。
入力してもターミナル上では何も表示されませんので間違えないように入力しましょう。

#### GitHub アカウントに SSH キーを追加する

GitHub に登録する 公開 SSH キーをクリップボードにコピーします。
（任意のファイルに SSH キーを生成した場合は、`~/.ssh/id_ed25519.pub` の部分を読み替えてください。）

##### macOS の場合
{% highlight sh %}
pbcopy < ~/.ssh/id_ed25519.pub
{% endhighlight %}

##### Windows の場合
{% highlight sh %}
clip < ~/.ssh/id_ed25519.pub
{% endhighlight %}

ブラウザで GitHub のサイトにアクセスし、Settings（設定） の [SSH and GPG keys ページ](https://github.com/settings/keys) を開きます。
（ヘッダーのプロフィールアイコンをクリックして、[Settings] > [SSH and GPG keys] から遷移することもできます。）

[New SSH key] ボタンをクリックして新規登録ページを開き、以下の情報を入力します。

- **Title**
  - 登録する SSH キーを説明するタイトルを入力します
- **Key**
  - クリップボードにコピーした SSH キーを貼り付けます。（macOS は `⌘ + v` 、Windows は `Ctrl + v` で貼り付けられます。）

[Add SSH key] ボタンをクリックします。
GitHub のパスワードの入力を求められた場合はメッセージに従って入力します。

### GitHub にソースコードをプッシュする

次に、以下のように入力してください(usernameの部分は、あなたのGitHubでのユーザー名が入ります):

{% highlight sh %}
git remote add origin git@github.com:username/rails-girls.git
{% endhighlight %}

_あなたのGitHubのリポジトリページには、リポジトリURLの一覧が表示されています。いちいち手で入力するより、その一覧から気軽にコピー&ペーストしましょう。GitHubのリポジトリページから、URLの隣のクリップボードアイコンをクリックすることで、コピー&ペーストすることが出来ます。_

このコマンドは"origin"という名前のリモート、あるいは _コネクション_ を作ります。これは、先ほど作ったGitHubのリポジトリを指しています。


では、以下のように入力してみましょう:

{% highlight sh %}
git push -u origin main
{% endhighlight %}

これによって、あなたの"main"ブランチのコミットが、GitHubに送られます。

おめでとうございます、これでアプリケーションはGitHubに載りました。上でoriginに指定したhttps://github.com/username/rails-girlsのURLをブラウザでチェックしてみましょう。 (.git部分は外します）

もし続けてファイルを変更し、GitHubにpushしたい場合は、次の三つのコマンドで行うことが出来ます。

{% highlight sh %}
git add .

git commit -m "type your commit message here"

git push origin main
{% endhighlight %}

## 次に何をする？

### オープンソースコミュニティーに参加する

 * GitHubで、RailsGirlsの仲間やコーチをフォローします
 * 彼らのプロジェクトにstar、watchします
 * レポジトリを[Fork](https://help.github.com/articles/fork-a-repo)し、クローンしてきて、自分のフォークに変更をpushします。その変更を[pull request](https://help.github.com/articles/using-pull-requests)でフォーク元にシェアしてみましょう!
 * バグを見つけたら、プロジェクトにissueを作成しましょう
 * 他のオープンソースプロジェクトを調べます。プログラミング言語やキーワードで検索してみましょう。

### Gitについてもっと学ぶ

 * [trygit.org](http://try.github.io/)をチェックアウトする
 * [GITチートシート](https://github.github.com/training-kit/downloads/ja/github-git-cheat-sheet/)([PDF](https://github.github.com/training-kit/downloads/ja/github-git-cheat-sheet.pdf))を使う
 * [git-scm.org](http://git-scm.com/)でGitコマンドを眺めてみる





