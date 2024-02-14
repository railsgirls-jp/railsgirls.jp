---
layout: main_guide
title: Setup on Windows with WSL
description: "Install Ruby and Rails on your Windows computer and get prepared for the Rails Girls workshop."
permalink: install/windows-wsl
---

# Setup for Windows

{% include main-guide-intro.html %}

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
rbenv install 3.3.0
rbenv global 3.3.0
{% endhighlight %}

作業完了後に、以下のコマンドを実行してください。

{% highlight sh %}
ruby -v
{% endhighlight %}

以下のように、インストールされたRubyのバージョンが表示されればOKです。

{% highlight sh %}
ruby 3.3.0 (2023-12-25 revision 5124f9ac75) [x86_64-linux]
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
