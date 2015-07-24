---
layout: default
title: Rails Girls on OpenShift
permalink: openshift
---

# OpenShiftでアプリを公開する

*Created by Katie Miller, [@codemiller](https://twitter.com/codemiller) / 翻訳: Uchio Kondo [@udzura](https://github.com/udzura)*

### OpenShift にサインアップする

OpenShiftとは、クラウド上のPaaS(Platform as a Service)で、公開サーバ上にアプリケーションを簡単にデプロイすることができるプラットフォームです。これはオープンソースで、Rubyで書かれています。

開始するには、 [OpenShiftオンラインアカウントを作成し](https://www.openshift.com/app/account/new)、3つまでのアプリを無料でデプロイできるようにします。サインアップをしたら、OpenShift RHCクライアントツールを以下のコマンドを発行してインストールしてください。

{% highlight sh %}
gem install rhc
rhc setup
{% endhighlight %}

上記の手順は、RubyをRVM、RailsInstallerなどでインストールした人の場合を想定しています。他の手順でインストールした場合は、[こちらのguide](https://www.openshift.com/developers/rhc-client-tools-install) にそれぞれの手順があります ( `sudo gem install rhc` と、sudoを付ける必要があるかも知れません)。

__Coachより__: OpenShiftのようなPaaSにアプリをデプロイするメリットについて話してください。特に、伝統的なサーバ管理と比べて。SSHについて、またなぜセキュアにサーバ通信をするために公開鍵をなぜアップロードしなければいかねいかについても議論してください。

### アプリケーションの準備

#### OpenShiftのアプリケーションを作成する

これから、OpenShiftでRubyのアプリケーションを、PostgreSQLを用いて作成します。OpenShiftのサンプルアプリを、手始めに利用することにしましょう。始める前に、ターミナルで、あなたが先ほど作成した `railsgirls` ディレクトリの親のディレクトリに移動してください。おそらく `projects` という名前のディレクトリになるでしょう。下記の `cd` コマンドを入力すると、 `railsgirls` ディレクトリから目的の場所に行けるでしょう。そうならなかった場合は、別の `cd` コマンドを打つことになるでしょう。

{% highlight sh %}
cd ..
pwd
{% endhighlight %}

`pwd` ('present working directory') コマンドの結果は、あなたが今 `projects` ディレクトリ(もしくはその他の、プロジェクトの親ディレクトリ)にいるということを示してくれると思います。OpenShiftアプリをクラウド上に作り、そのローカルコピーを手元に持ってくるには、次のコマンドをターミナルで実行します。

_NB: このコマンドは Ruby 2.x と Rails 4 を利用している方向けのものです。Ruby 1.9.x をインストールしている場合は、コマンド上の `ruby-2.0` を `ruby-1.9` に変更してください。Rails 3では、 `--from-code` のURLを `https://github.com/openshift/rails-example.git` に変更します。_

{% highlight sh %}
rhc app create openshiftapp ruby-2.0 postgresql-9.2 --from-code=https://github.com/openshift/rails4-example.git
{% endhighlight %}

`Are you sure you want to continue connecting (yes/no)?` のような英語のメッセージが出たら、 `yes` をタイプしてエンターキーを押してください。

アウトプットにはURLが含まれています。ブラウザを開き、そのアプリケーションURLを入力して、サンプルアプリケーションを見てみましょう (http://openshiftapp-*yourdomain*.rhcloud.com というURLになるでしょう)

__Coachへ__: Gitとは何か、なぜバージョンコントロールシステムを使うのかを説明してください。

#### バージョンコントロールをする

これで私たちはサンプルアプリをクラウド上に動かすことができましたが、実はサンプルアプリのうち、クラウドで動かすためのほんのわずかなコードをコピーする必要があります。必要なものをコピーする前に、私たちはRails GirlsアプリをGitを用いて「バージョンコントロール」する必要があります。

`railsgirls` ディレクトリーに戻り、そのプロジェクトをGitのリポジトリとして初期化します。以下のコマンドを使います:

{% highlight sh %}
cd railsgirls
git init
{% endhighlight %}

開発時にローカルでアップロードした画像をリポジトリに含めたくありません。なので、以下のコマンドを打って、Gitにそれら画像を無視するよう教えてあげましょう:

{% highlight sh %}
echo "public/uploads" >> .gitignore
{% endhighlight %}

以下のコマンドを入力し、アプリのファイルをすべてリポジトリに追加してコミットします:

{% highlight sh %}
git add --all
git commit -m "アイデアメモアプリの最初のコミット"
{% endhighlight %}

__Coachより__: 使ったGitのコマンドと `.gitignore` について説明しましょう。

#### サンプルアプリのコードをコピーする

私たちがOpenShiftでRailsアプリを走らせるには、 `.openshift` ディレクトリと `config/database.yml` ファイルをサンプルアプリからコピーする必要があります。これらふのファイルやディレクトリを `openshiftapp` ディレクトリから `railsgirls` ディレクトリにコピーします。この操作は、Windowsのエクスプローラや他のお好きなGUIツールを使ってもいいですし、代わりにターミナルで以下のコマンドを`railsgirls` ディレクトリから走らせることもできます。

<div class="os-specific">
   <div class="nix">
{% highlight sh %}
cp -r ../openshiftapp/.openshift .
cp ../openshiftapp/config/database.yml config
{% endhighlight %}
  </div>

  <div class="win">
{% highlight sh %}
xcopy /e /i ..\openshiftapp\.openshift .openshift
xcopy /y ..\openshiftapp\config\database.yml config
{% endhighlight %}
  </div>
</div>

コピーが成功したか、 `railsgirls` アプリディレクトリを見て確かめてみましょう。 `.openshift` というサブディレクトリと `config/database.yml` というファイルがあるはずです。これらには、OpenShiftに必要な環境変数、たとえば `OPENSHIFT_APP_NAME` などが含まれます。もし現在の `database.yml` ファイルがそのような変数を含まない場合は、 `.openshift/config/database.yml` 、無い場合は `openshiftapp/config/database.yml` をエディタで見て、ファイルの中身をコピーペーストしてください。

下記のコマンドで、Gitに新しいファイルや、変更したファイルを追加してコミットします。

{% highlight sh %}
git add --all
git commit -m "OpenShiftの設定を追加"
{% endhighlight %}

#### データベースを変更する

次のステップは、Rails GirlsアプリのデータベースをSQLiteからPostgreSQLに変更します。アプリの `Gemfile` を開いて下記の記述を:

{% highlight ruby %}
gem 'sqlite3'
{% endhighlight %}

以下に変更します。

{% highlight ruby %}
gem 'sqlite3', :group => [:development, :test]
gem 'pg', :group => [:production]
{% endhighlight %}

`bundle install` を実行し、依存gemのセットアップをします:

{% highlight sh %}
bundle install --without production
{% endhighlight %}

幾つかのプラットフォームでは、プラットフォームに依存したバージョンのgemをインストールしてしまい、結果クラウド上でトラブルを起こす可能性があります。これを防ぐには、 `Gemfile.lock` のファイルを見て 'sqlite3' と 'pg' のバージョンをチェックします。もし、これらgemがプラットフォーム固有の文字列、たとえば `-x86-mingw32` のようなものがあれば、消してください (例: `pg (0.16.0-x86-mingw32)` なら `pg (0.16.0)` に、  `sqlite3 (1.3.8-x86-mingw32)` なら `sqlite3 (1.3.8)` )。ファイルを保存したら、上記のbundleコマンドを再実行してください。

そしてまた、Gitでファイルを追加しコミットします:

{% highlight sh %}
git add --all
git commit -m "本番環境のデータベースをPostgreSQLに変更"
{% endhighlight %}

__Coachより__: RDB（リレーショナルデータベース）と、 SQLite と PostgreSQL の違いについて話してください。

### OpehShiftにアプリをデプロイする

これで私たちは、Rails GirlsアプリをOpenShiftにデプロイする準備ができました。Gitリポジトリに、どこにコードをプッシュすればいいか設定する必要があります。OpenShiftのコードリポジトリを取得するには、以下のコマンドを打ち、出力されたGit URLをコピーします。

{% highlight sh %}
rhc app show openshiftapp
{% endhighlight %}

いま、SSH（`ssh://`で始まる）の文字列をあなたのGit URLに変更して、以下のコマンドを発行してください。現在、OpenShiftのサンプルアプリがリポジトリに入っているため、その履歴を消せるよう '-f' オプションを用いて強制プッシュをします。その後の変更をプッシュする際は、'-f' なしで単純に 'git push' してください。

{% highlight sh %}
git remote add openshift ssh://0123456789abcdef01234567@openshiftapp-yourdomain.rhcloud.com/~/git/openshiftapp.git/
git push -f --set-upstream openshift master
{% endhighlight %}

ブラウザ上のアプリを更新して、結果を見てみましょう！

__Coachより__: Gitのリモートリポジトリについて話してください。

### ボーナスステージ

おめでとうございます！　あなたのRailsアプリケーションはいまオンラインで、素晴らしいことに世界中から見ることができます。ここからのセクションは、あなたのアプリをより素晴らしくするために学習できる追加的なステップです。

#### アップロードした画像を保存する

アプリはとてもいい感じに見えます。ですが、デプロイの「はかない側面」が由来の、潜在的な問題があります。私たちが新しいバージョンのアプリをプッシュした時、OpenShift側のリポジトリ内に保存されていたあらゆるファイルは、新しいファイルを使えるようにするために消去されます。このとき、ユーザーがアップロードした画像も一緒に消されてしまいます。この挙動を直すには、画像ファイルをOpenShiftの「永続的な」ディレクトリに保存しなければなりません。そのディレクトリのパスは、環境変数から参照することができます。

__Coachより__: 環境変数を利用することの背景やメリットを説明しましょう。

アップロードされた画像が保存されるディレクトリは現在アプリのリポジトリ内部です。そのため再起動したら消えてしまいます。アップロードディレクトリを永続歴に保管可能な場所に変更するためには、 `app/uploaders/picture_uploader.rb` というファイルを開き、

{% highlight ruby %}
def store_dir
  "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
end
{% endhighlight %}

この箇所を以下のようにします。

{% highlight ruby %}
def store_dir
  prefix = ENV['OPENSHIFT_DATA_DIR'] ? "#{ENV['OPENSHIFT_DATA_DIR']}/" : ""
  "#{prefix}uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
end

def url
  return "/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}/#{File.basename(file.path)}" if ENV['OPENSHIFT_DATA_DIR'] && file
  super
end
{% endhighlight %}

これで、画像は永続的なディレクトリにアップロードされるようになります。しかも、これらの画像は以前までと同じような画像URLで利用可能でしょう。この変更を動かすために、私たちはリポジトリの中から永続的ディレクトリに対してシンボリックリンクを追加する必要があります。それをするためには、 `.openshift/action_hooks/build` というファイルに以下のコードを追加します:

{% highlight sh %}
mkdir -p $OPENSHIFT_DATA_DIR/uploads
ln -sf $OPENSHIFT_DATA_DIR/uploads $OPENSHIFT_REPO_DIR/public/uploads

{% endhighlight %}

このアクションフックのコードは、毎回、OpenShiftのアプリがビルドされるごとに走ります。なので、二つのディレクトリのリンクは、必要なとき常に作られ、存在することになります。

変更をコミットし、クラウドにプッシュします:

{% highlight sh %}
git add --all
git commit -m "OpenShiftの環境変数を追加"
git push
{% endhighlight %}

この変更の前までにあなたのアップロードした画像はもう見ることができません。ですが、今度アップロードされたものは、アプリのデプロイを繰り返しても、永続的に見ることが可能です。

__Coachより__: シンボリックリンクについて説明してください。

#### コードをGitHubにプッシュする

いま、あなたのアプリはGitによって管理されています。GitHubのような、Gitリポジトリのホスティングサービスを使って、あなたのコードを公開したいかもしれません。GitHubにコードをプッシュするには、 [リポジトリを作成し](https://github.com/new) 、HTTPSの文字列をコピーします (たとえば *https://github.com/username/reponame.git* のようなものです)。

ターミナルで、さきほどのOpenShiftに公開したアプリのリポジトリに行き、HTTPSのURLを先ほどコピーした文字列に変更して、以下のコマンドを発行します:

{% highlight sh %}
git remote add github https://github.com/username/reponame.git
git push github master
{% endhighlight %}

'master'ブランチが、GitHubにプッシュされます。GitHubのウェブサイトに行って反映をチェックしましょう。

__Coachより__: Gitのブランチについてと、オープンソースコードの利点について話してください。

### まとめ

あなたのRailsアプリはいま [OpenShift](https://www.openshift.com/developers) クラウド上で走っています。あなたは、今後色々な変更を加え、デプロイすることができますし、アプリのURLを友達にシェアすることができます。
