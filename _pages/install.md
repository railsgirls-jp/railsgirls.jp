---
layout: default
title: Rails Girls インストール・レシピ
permalink: install
---

# Rails Girls インストール・レシピ

<span class="muted">クッキングタイム: 5分 (作業時間) / 15-30分 (待ち時間)</span>

Ruby on Rails上にアプリケーションを作るためには、
あなたのコンピュータに必要なソフトウェアと開発環境をセットアップする必要があります。

あなたのオペレーティングシステムの説明をご覧ください。
もし、なにか問題が発生してもあわてずにコーチに声をかけてください。
コーチと一緒に問題を解決しましょう。

* [macOS 用セットアップ](#setup_for_macos)
* [Windows 用セットアップ](#setup_for_windows)
* [Windows 用セットアップ（WSLが使えない方向け）](#setup_for_windows_without_wsl)
* [Linux 用セットアップ](#setup_for_linux)
* [Alternative Installment for all OS](#virtual-machine)
* [クラウドサービスを利用する](#using-a-cloud-service)

*コーチの方へ*:
インストール中に問題が発生した場合、この [Troubleshooting](https://github.com/railsgirls-jp/railsgirls-jp.github.io/wiki/Troubleshooting)  のページを参考にして下さい。

<hr />

## <a id="setup_for_macos">macOS 用セットアップ</a>

### *1.* オペレーティング・システムのバージョンを調べましょう。

Appleメニューをクリックして *About This Mac* (図 1) を選びます。

![Apple menu](/images/apple_menu.png "Apple menu")

図 1

### *2.* 開いたウィンドウに使用しているオペレーティング・システムのバージョンが表示されます。(図 2)。

バージョン番号が 10.`n` （`n` は 6 から 15 の間）で始まる、もしくはそれ以上の場合、このドキュメントに従って進めます。
これ以下のバージョンだったら、イベントでコーチと一緒にセットアップします。

![About this Mac dialog](/images/about_this_mac.png "About this Mac dialog")

図 2

### *3.* rbenv を使って Ruby と Ruby on Rails をインストール(Mac OS X 10.9 以上の場合):

Mac OS X 10.9 以上の場合は、Homebrew と rbenv を使って環境をつくります。

#### 3-1. Command line tools をターミナルからインストール:

{% highlight sh %}
xcode-select --install
{% endhighlight %}

#### 3-2. [Homebrew](http://brew.sh/)をインストール:

{% highlight sh %}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
{% endhighlight %}

#### 3-3. [rbenv](https://github.com/rbenv/rbenv)をインストール:

macOS Catalinaからデフォルトのshellがbashからzshに変更されています。 `echo $SHELL` を実行した結果が `bin/bash` のようにbashであれば以下のコマンドの通りで問題ありません。もしも結果が `bin/zsh` のようにzshであるときは、以下の `.bash_profile` を `.zshrc` に置き換えて実行してください。

{% highlight sh %}
brew update
brew install rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
{% endhighlight %}

#### 3-4. rbenvを使ってRubyをインストール:

"rbenv install -l" コマンドでrbenvでインストール可能なRubyのバージョンを確認できます。

{% highlight sh %}
rbenv install 3.2.1
{% endhighlight %}

※もしも "OpenSSL::SSL::SSLError: ... : certificate verify failed" エラーが起きた場合は、以下の手順を試してみてください。

{% highlight sh %}
brew install curl-ca-bundle
cp /usr/local/opt/curl-ca-bundle/share/ca-bundle.crt `ruby -ropenssl -e 'puts OpenSSL::X509::DEFAULT_CERT_FILE'`
{% endhighlight %}

#### 3-5. デフォルトのRuby を設定:

{% highlight sh %}
rbenv global 3.2.1
{% endhighlight %}

#### 3-7. Railsのインストール:

{% highlight sh %}
gem install rails --no-document
{% endhighlight %}

### *4.* コードを編集するのに必要なテキストエディタをインストールする。

このワークショップでは エディタとして、Visual Studio Code を推奨しています。

* [Visual Studio Codeをダウンロードしてインストールする](https://code.visualstudio.com/)

Mac OS X 10.9 およびそれ以前のバージョンでは、 Visual Studio Codeは非対応ですが、  
Mac OS X 10.7〜10.9までは  [Sublime Text 3](http://www.sublimetext.com/3)  が、 
Mac OS X 10.6では  [Sublime Text 2](http://www.sublimetext.com/2) が、利用可能です。


### *5.* 動作確認

コーチの方に以下の方法で動作確認をしてもらってください。

*コーチの方へ*:

以下のコマンドでRailsが正しくインストールされているか確認してください。

{% highlight sh %}
rails new sample
cd sample
rails g scaffold book
rails db:migrate
rails server
{% endhighlight %}

ブラウザのURL欄に `http://localhost:3000/books` と入力して、画面が表示されれば成功です。

作ったプロジェクトは削除しておきましょう。

<hr />

## <a id="setup_for_windows">Windows 用セットアップ</a>

### *1.* WSLの導入

*※ここから先の方法を実行するにはWindowsのパスワードが必要になります。事前に確認をしておいてください。*

*※WSLでのペーストは右クリックで行います。*

まずは下記の[コマンドを利用する方法](#wsl_with_command)でのインストールを行います。もし問題が生じた場合、[画面から設定を行う方法](#wsl_with_gui)を利用します。

#### <a id="wsl_with_command">コマンドを利用する方法</a>

**以下の内容は [マイクロソフトの公式ドキュメント](https://learn.microsoft.com/ja-jp/windows/wsl/install) に記載されている内容を元にしています。**

まず画面左下の検索ボックスをクリックし、"powershell"と入力します。"Microsoft Powershell"アプリケーションが検索結果に出てきますので、**右クリックをして「管理者として実行」を選択してください。**

実行すると"Microsoft Powershell"アプリケーションが立ち上がります。そこに以下のコマンドを入力し、エンターキーを押します。

```
wsl --install
```

インストールが成功した場合（成功したかどうかの確認が難しい場合はコーチに確認してください）、続けて以下のコマンドを実行します。

```
wsl
```

ユーザー名とパスワードの入力を促す画面が表示されていれば成功です（この画面を以後「*Bashウィンドウ*」と呼びます）。適当なユーザー名（半角英数小文字のみ）とパスワードを入力しましょう（パスワードは2回入力する必要があり、画面には表示されませんが正しく入力されています）

インストールが何らかの理由で失敗した場合は、[画面から設定を行う方法](#wsl_with_gui)を試してみましょう。

#### <a id="wsl_with_gui">画面から設定を行う方法</a>

画面左下のWindowsボタンを押し、出てきた歯車ボタンを押して「設定」アプリケーションを開きます。

![WSL install setting](/images/windows_install/wsl_install_setting1.png "wsl install setting")

設定アプリケーションの検索窓に「Windows の機能の有効化または無効化」と入力します。（最後まで入力しなくてもOKです）

![WSL install setting](/images/windows_install/wsl_install_setting2.png "wsl install setting")


以下の画面が表示されたら、「Linux 用 Windows サブシステム」にチェックを入れ、マシンを再起動します。

![WSL install select wsl](/images/windows_install/wsl_install_select_wsl.png "wsl install select wsl")

続けて「Microsoft Store」を開きます。

![WSL install open store](/images/windows_install/wsl_install_open_store.png "wsl install open store")


検索窓に「Ubuntu」と入力して「Ubuntu」アプリケーションをインストールします（「Ubuntu 18.04 LTS」「Ubuntu 20.04 LTS」ではなく、「Ubuntu」をインストールするようにしてください）。

![WSL install select ubuntu](/images/windows_install/wsl_install_select_ubuntu.png "wsl install select ubuntu")

以下の画面が表示されるので、 '入手'ボタン、'開く'ボタンをクリックします。

![WSL install get ubuntu](/images/windows_install/wsl_install_get_ubuntu.png "wsl install get ubuntu")
![WSL install start ubuntu](/images/windows_install/wsl_install_start_ubuntu.png "wsl install start ubuntu")

「Ubuntu」アプリケーションが起動すればWSLのインストールは成功です。

起動したアプリケーション（ここからは*Bashウィンドウ*と呼びます）にはユーザー名とパスワードの入力を促す画面が表示されていますので、適当なユーザー名（半角英数小文字のみ）とパスワードを入力しましょう（パスワードは2回入力する必要があり、画面には表示されませんが正しく入力されています）。

![WSL install Bash Window](/images/windows_install/wsl_install_bash_window.png "wsl install bash window")

### *2.* Rubyのインストール

以下のセクションでは、`apt`などのソフトウェアを使ってRubyの環境を構築していきます。

#### 2-1 必要なソフトウェアのインストール

{% highlight sh %}
sudo apt update
sudo apt upgrade -y
sudo apt install autoconf bison build-essential libssl-dev libyaml-dev libreadline-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev sqlite3 libsqlite3-dev -y
{% endhighlight %}

#### 2-2 rbenvのインストール

Bashウィンドウで以下のコマンドを実行してください。

{% highlight sh %}
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
{% endhighlight %}

#### 2-3 ruby-buildのインストール

Bashウィンドウで以下のコマンドを実行してください。

{% highlight sh %}
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
{% endhighlight %}

#### 2-4 Rubyのインストール

Bashウィンドウで以下のコマンドを実行してください。

{% highlight sh %}
rbenv install 3.2.1
rbenv global 3.2.1
{% endhighlight %}

作業完了後に、以下のコマンドを実行してください。

{% highlight sh %}
ruby -v
{% endhighlight %}

以下のように、インストールされたRubyのバージョンが表示されればOKです。

{% highlight sh %}
ruby 3.2.1 (2023-02-08 revision 31819e82c8) [x86_64-linux]
{% endhighlight %}

### *3.* Railsのインストール

Bashウィンドウで以下のコマンドを実行してください。

{% highlight sh %}
gem install rails --no-document
{% endhighlight %}

作業完了後に、以下のコマンドを実行してください。

{% highlight sh %}
rails -v
{% endhighlight %}

以下のように、インストールされたRailsのバージョンが表示されればOKです（バージョンの番号は違うかもしれません）。

{% highlight sh %}
Rails 7.0.4
{% endhighlight %}

<hr />

### *4.* コードを編集するのに必要なテキストエディタをインストールする。

このワークショップでは エディタとして、Visual Studio Code を推奨しています。

* [Visual Studio Codeをダウンロードしてインストールする](https://code.visualstudio.com/)

### *5.* 動作確認

コーチの方に以下の方法で動作確認をしてもらってください。

*コーチの方へ*:

以下のコマンドでRailsが正しくインストールされているか確認してください。

{% highlight sh %}
rails new sample
cd sample
rails g scaffold book
rails db:create
rails db:migrate
rails server
{% endhighlight %}

ブラウザのURL欄に `http://localhost:3000/books` と入力して、画面が表示されれば成功です。

作ったプロジェクトは削除しておきましょう。

## <a id="setup_for_windows_without_wsl">Windows 用セットアップ（WSLが使えない方向け）</a>

### *1.* Gitのインストール

[Git for Windows](https://github.com/git-for-windows/git/releases/download/v2.34.1.windows.1/Git-2.34.1-64-bit.exe) をダウンロードして実行します。

表示された画面の選択肢は全てデフォルトで、インストールします。

※ 途中、デフォルトブランチ名を設定する画面では、 `main` を設定しておくとよいでしょう。

### *2.* Rubyのインストール

[RubyInstaller](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-3.2.1-1/rubyinstaller-devkit-3.2.1-1-x64.exe) をダウンロードして実行します。


ライセンス認証画面が表示されます。  
確認の上、同意いただけるなら、「I accept the License」をチェックし、'Next'ボタンをクリックします。
![RubyInstaller Install Lincese](/images/windows_install/rubyinstaller_license.png "rubyinstaller license")


選択肢は全てデフォルトを選択し、'Install'ボタンをクリックします。
![RubyInstaller Install options](/images/windows_install/rubyinstaller_install_options1.png "rubyinstaller install options")

表示された画面で、選択肢は全てデフォルトを選択し、'Next'ボタンをクリックします。
![RubyInstaller Install options](/images/windows_install/rubyinstaller_install_options2.png "rubyinstaller install options")

Rubyのインストールが終了すると、以下の画面が表示されるので、'Finish'ボタンをクリックします。
![RubyInstaller Install Finish](/images/windows_install/rubyinstaller_install_finish.png "rubyinstaller install finish")

コマンドプロンプトが立ち上がってMSYS2のインストールに進みますのでデフォルトの選択肢(何も入力せずにエンター)を選びます。

![RubyInstaller MSYS2 install](/images/windows_install/rubyinstaller_msys2_install.png "rubyinstaller msys2 install")

コマンドプロンプトが立ち上がってMSYS2のインストールに進みますのでデフォルトの選択肢(何も入力せずにエンター)を選びます。

MSYS2のインストール後、コマンドプロンプトが自動的に閉じるので、	Windowsスタートメニューからコマンドプロンプトを起動しておきましょう。

### *3.* Railsのインストール

{% highlight sh %}
gem install rails --no-document
{% endhighlight %}

作業完了後に、以下のコマンドを実行してください。

{% highlight sh %}
rails -v
{% endhighlight %}

以下のように、インストールされたRailsのバージョンが表示されればOKです（バージョンの番号は違うかもしれません）。

{% highlight sh %}
Rails 7.0.4
{% endhighlight %}

### *4.* コードを編集するためのテキストエディタが必要になります。

このワークショップでは エディタとして、Visual Studio Code を推奨しています。

* [Visual Studio Codeをダウンロードしてインストールする](https://code.visualstudio.com/)

これで、Ruby on Railsのプログラミングを始められるまでの環境セットアップは終了です。おめでとう！

### *5.* 動作確認

コーチの方に以下の方法で動作確認をしてもらってください。

*コーチの方へ*:

以下のコマンドでRailsが正しくインストールされているか確認してください。実行後、ブラウザのURL欄に `http://localhost:3000/books` と入力して、画面が表示されれば成功です。作ったプロジェクトは削除しておきましょう。

{% highlight sh %}
rails new sample
cd sample
rails g scaffold book
rails db:migrate
rails server
{% endhighlight %}

bundle install時にsqlite3 gemのインストールでエラーになる場合は、以下を試してみてください。ridkはMSYS2用パッケージマネージャです。

{% highlight sh %}
gem uninstall sqlite3 --all
ridk exec pacman -S mingw-w64-x86_64-sqlite3
gem install sqlite3 --platform ruby
{% endhighlight %}

rails newで行われるbundle installがエラーで中断したときは、上記の修正後、 bundle install の実行を忘れないでください。

## 出るかもしれないエラー

### Gem::RemoteFetcher エラー

`rails new railsgirls` や `gem update rails` を実行すると下記のようなエラーが出るかもしれません:

{% highlight sh %}
Gem::RemoteFetcher::FetchError: SSL_connect returned=1 errno=0 state=SSLv3 read
server certificate B: certificate verify failed (https://rubygems.org/gems/i18n-0.6.11.gem)
{% endhighlight %}

これは Rubygems のバージョンが古く、更新が必要であることを意味していますので、まず Rubygems のバージョンをチェックしましょう。

{% highlight sh %}
gem -v
{% endhighlight %}

もし `3.0.3` より古いバージョンだったら、以下の手順で更新する必要があります:

[ruby-gems-update gem](https://rubygems.org/downloads/rubygems-update-3.0.3.gem) をダウンロードし、それを `c:\rubygems-update-3.0.3.gem` として保存して実行してください:

{% highlight sh %}
gem install --local c:\\rubygems-update-3.0.3.gem
update_rubygems --no-document
gem uninstall rubygems-update -x
{% endhighlight %}

Rubygems のバージョンをチェックしましょう。

{% highlight sh %}
gem -v
{% endhighlight %}

バージョンが `3.0.3` より大きいことを確かめてください。
もし失敗していたらやり直してください。

続いて、bundler gem も更新が必要となる場合があります。まず `bundle` のバージョンをチェックしましょう。

{% highlight sh %}
bundle -v
{% endhighlight %}

もし `1.17.2` より古いバージョンだったら、以下の手順で更新する必要があります:

{% highlight sh %}
gem update bundler --no-document
{% endhighlight %}

`bundle` のバージョンをチェックしましょう。

{% highlight sh %}
bundle -v
{% endhighlight %}

バージョンが `1.17.2` より大きいことを確かめてください。
もし失敗していたらやり直してください。


### 'x64_mingw' is not a valid platform エラー

`rails server` を実行すると以下のようなエラーが出ることがあります:

{% highlight sh %}
'x64_mingw' is not a valid platform
{% endhighlight %}

もし RailsInstaller を実行した後でこのエラーが出たときには、`Gemfile` というファイルをちょっとだけ編集する必要があります:

そのファイルの最後の方に下記のような行があるはずです。
もしなければ付け加えましょう:

{% highlight sh %}
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
{% endhighlight %}

このように `:x64_mingw` と書かれていたら、 `:x64_mingw` の部分を削除してください。
つまり上の行を下記のように変更するわけです:

{% highlight sh %}
gem 'tzinfo-data', platforms: [:mingw, :mswin]
{% endhighlight %}

ファイルを編集し終わったら、再びコマンドプロンプトで `bundle update` を実行してみてください。

<hr />

## <a id="setup_for_linux">Linux 用セットアップ</a>

### *1.* Install Rails

あなたの Linux ディストリビューション(Ubuntu や Fedora)に Ruby on Rails を開発する環境をインストールするには下の1行をコピーしてターミナルに貼り付け、Enter キーを押す必要があります。スクリーンに流れるテキストを眺めて少しの時間の間、楽しみにお待ち下さい。次に進むまでの間、飲み物を飲んで休憩してはいかがでしょうか。

#### Ubuntuの場合:

{% highlight sh %}
sudo apt-get install curl
bash < <(curl -sL https://raw.github.com/railsgirls/installation-scripts/master/rails-install-ubuntu.sh)
{% endhighlight %}

gnome-terminal を使って RVM インストールを行いたいときは、Ruby と Rails の正しいバージョンを確かめる前にオプションを変更する必要があるかもしれません。
[RVM documentation](http://rvm.io/integration/gnome-terminal) を参照してください。

#### Fedoraの場合:

{% highlight sh %}
bash < <(curl -sL https://raw.github.com/railsgirls/installation-scripts/master/rails-install-fedora.sh)
{% endhighlight %}

下記のアプリケーション作成コマンドを実行して、正しくインストールされたことを確かめましょう。

{% highlight sh %}
rails new railsgirls
cd railsgirls
rails server
{% endhighlight %}

### *2.* コードを編集するためのテキストエディタが必要になります。

このワークショップでは Sublime Text エディタを推奨しています。

* [Sublime Text エディタをダウンロードしてインストールする](http://www.sublimetext.com/2)

これで、Ruby on Railsのプログラミングを始められるまでの環境セットアップは終了です。おめでとう！

<hr />

## <a id="virtual-machine">仮想マシン</a>

自分のコンピュータにインストールする代わりに仮想マシン上で開発環境をセットアップすることもできます。
詳しいことは [ここ](/install/virtual-machine) を参照してください。

<hr />

## [クラウドサービスを利用する](#using-a-cloud-service) {#using-a-cloud-service}

あなたのコンピュータにRuby on Railsやエディタをインストールする代わりに、開発用のWebサービスを利用することもできます。ブラウザとネットへアクセスできる環境があればOKです。ここでは [GitHub Codespaces](https://github.co.jp/features/codespaces) を利用する手順と、[AWS Cloud9](#using-a-cloud-service-c9) を利用する手順を説明します。

もしも、別のサービスを利用している場合は、例えば 'Environment' や 'Workspace' の代わりに 'Workstation' という単語を使うなど用語の違いがあるかもしれませんが、概ね同じになっているはずです。

### [GitHub Codespaces](#using-a-cloud-service-codespaces) {#using-a-cloud-service-codespaces}

[GitHub Codespaces](https://github.co.jp/features/codespaces) はブラウザ上で開発できるサービスです。必要なものは GitHub アカウントです。無料のプランでも月60時間まで使えるため、有料の Pro プランなどへのアップグレードは不要です。

[![Codespacesの公式紹介ページ](/images/codespaces/landing-page.webp)](https://github.co.jp/)

### *1.* ブラウザを確認する

* Internet Explorer を利用している場合は、[Google Chrome](https://www.google.com/intl/ja/chrome/browser/) または [Firefox](https://www.mozilla.org/ja/firefox/new/) をインストールしてください。（一部の機能がIEでは動かない場合があります。）

### *2.* アカウントを作成する
- [GitHubの公式ページ](https://github.co.jp/)に行き、アカウントを作成しましょう。

### *3.* Codespaces のページに行く
- 画面上にある「[Codespaces](https://github.com/codespaces)」をクリックします。

![Codespacesのトップページ](/images/codespaces/top.webp)

### *4.* Templates をクリックする
- 画面左にある「[Templates](https://github.com/codespaces/templates)」をクリックします。

![Codespacesのテンプレート](/images/codespaces/template.webp)

### *5.* Use this template をクリックする
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


### [AWS Cloud9](#using-a-cloud-service-c9) {#using-a-cloud-service-c9}

[AWS Cloud9のサイト](https://aws.amazon.com/jp/cloud9/)

### *1.* ブラウザを確認する

* Internet Explorer を利用している場合は、 [Google Chrome](https://www.google.com/intl/ja/chrome/browser/) または [Firefox](https://www.mozilla.org/ja/firefox/new/) をインストールしてください。（一部の機能がIEでは動かない場合があります。）

### *2.* アカウントを作成する

* AWSのアカウントを作成し、AWS Cloud9 コンソールにサインインしましょう。
* 具体的には [個人ユーザーの AWS Cloud9 セットアップ \- AWS Cloud9](https://docs.aws.amazon.com/ja_jp/cloud9/latest/user-guide/setup-express.html) の手順で作業を進めてください。
* サインイン後に [Welcome to AWS Cloud9](https://console.aws.amazon.com/cloud9/home/product) にアクセスして次のような画面が出たらOKです。

![](/images/aws-cloud9/welcome.png)

### *3.* Ruby on Rails の開発用に Environment を設定する

* [Welcome to AWS Cloud9](https://console.aws.amazon.com/cloud9/home/product) にアクセスしてください。(サインインしていない場合は先にサインインをしてください)
* Create environment をクリックします。
* Environment name には好きな名前をつけましょう。Descriptionは任意なので空欄でも構いません。Next Step をクリックしましょう。
* Configure settings では Platform に Ubuntu Server を指定してください。その他は初期設定のままでOKです。Next Step をクリックしてください。
* Review で入力内容を確認します。Create environment をクリックしましょう。
* 利用可能になるまで少し待ってください。
* 次のような画面が開いたらOKです。

![](/images/aws-cloud9/development-environment.png)

以降の手順ではこの画像の下部にあるターミナルを使います。

### *4.* 標準でインストールされている RVM をアンインストールする

#### *4.1.* RVM 関連ファイルの削除
{% highlight sh %}
/usr/bin/sudo rm -rf $HOME/.rvm 
{% endhighlight %}

#### *4.2.* RVM 関連設定の削除

{% highlight sh %}
sed -i -e '/rvm/d' ~/.bashrc
{% endhighlight %}

#### *4.3.* AWS Cloud9 のインスタンスを再起動して操作を反映させる

AWS Cloud9 を再起動して `$GEM_HOME`, `$GEM_PATH` を更新します。

画面右上のメニューから Manage EC2 Instance をクリックしてEC2の管理画面に移動しましょう。

![](/images/aws-cloud9/to-ec2-management-console.png)

アクション をクリックして インスタンスの状態 のメニューから 再起動 をクリックしてください。

![](/images/aws-cloud9/reboot-instance.png)

AWS Cloud9 の画面に戻りましょう。少し待って利用可能な状態になったら再起動は完了です。

これで RVM が正常にアンインストールされました。

### *5.* Railsのインストール

次のコマンドを実行してしばらく待つと各種インストールが完了します。

{% highlight sh %}
bash < <(curl -sL https://raw.github.com/railsgirls/installation-scripts/master/rails-install-ubuntu.sh)
{% endhighlight %}

インストールしたRubyとRailsのバージョンを確認してみましょう。

{% highlight sh %}
source ~/.rvm/scripts/rvm
ruby -v
rails -v
{% endhighlight %}

#### *6.* 開発する

* 左側はフォルダとファイルを表示、選択できます。
* 中央部はエディタです。ここでファイルを編集します。
* 下部はターミナルです。ここでコマンドを実行します。
* 必要なものは全てブラウザにあります。ブラウザのほかにエディタやターミナルを起動する必要はありません。
* ガイドやチュートリアルを読む場合には、(Windowsマシンを利用している場合でも)Linux用のコマンドを使ってください。コマンドはクラウド上で実行され、その環境がLinuxマシンだからです。
* ガイドやチュートリアルで、サーバを起動する時のコマンドは```rails server```ではなく```rails server -b 0.0.0.0```を実行してください。何も指定しなかった場合はコマンドを実行した環境以外からはアクセスできないため、操作しているマシンからも表示がうまく行えません。
* ガイドやチュートリアルで、ブラウザから例えば http://localhost:3000 へアクセスする場合は、アドレス欄に入力するのではなく、画面上部から 'Preview' - 'Priview Running Application' を選ぶことで同じ操作ができます。
* 例えば、 http://localhost:3000/posts へアクセスしたい場合は、'Preview' - 'Priview Running Application' を選んだあと、 '/posts' をアドレス欄の末尾に加えてください。
