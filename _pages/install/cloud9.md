---
layout: main_guide
title: AWS Cloud9 を使う
description: "Install Ruby and Rails on your Linux computer and get prepared for the Rails Girls workshop."
permalink: install/cloud9
---

# AWS Cloud9

ここでは [AWS Cloud9](https://aws.amazon.com/jp/cloud9) を利用する手順を説明します。

## *1.* ブラウザを確認する

* Internet Explorer を利用している場合は、 [Google Chrome](https://www.google.com/intl/ja/chrome/browser/) または [Firefox](https://www.mozilla.org/ja/firefox/new/) をインストールしてください。（一部の機能がIEでは動かない場合があります。）

## *2.* アカウントを作成する

* AWSのアカウントを作成し、AWS Cloud9 コンソールにサインインしましょう。
* 具体的には [個人ユーザーの AWS Cloud9 セットアップ \- AWS Cloud9](https://docs.aws.amazon.com/ja_jp/cloud9/latest/user-guide/setup-express.html) の手順で作業を進めてください。
* サインイン後に [Welcome to AWS Cloud9](https://console.aws.amazon.com/cloud9/home/product) にアクセスして次のような画面が出たらOKです。

![](/images/aws-cloud9/welcome.png)

## *3.* Ruby on Rails の開発用に Environment を設定する

* [Welcome to AWS Cloud9](https://console.aws.amazon.com/cloud9/home/product) にアクセスしてください。(サインインしていない場合は先にサインインをしてください)
* Create environment をクリックします。
* Environment name には好きな名前をつけましょう。Descriptionは任意なので空欄でも構いません。Next Step をクリックしましょう。
* Configure settings では Platform に Ubuntu Server を指定してください。その他は初期設定のままでOKです。Next Step をクリックしてください。
* Review で入力内容を確認します。Create environment をクリックしましょう。
* 利用可能になるまで少し待ってください。
* 次のような画面が開いたらOKです。

![](/images/aws-cloud9/development-environment.png)

以降の手順ではこの画像の下部にあるターミナルを使います。

## *4.* 標準でインストールされている RVM をアンインストールする

### *4.1.* RVM 関連ファイルの削除
{% highlight sh %}
/usr/bin/sudo rm -rf $HOME/.rvm 
{% endhighlight %}

### *4.2.* RVM 関連設定の削除

{% highlight sh %}
sed -i -e '/rvm/d' ~/.bashrc
{% endhighlight %}

### *4.3.* AWS Cloud9 のインスタンスを再起動して操作を反映させる

AWS Cloud9 を再起動して `$GEM_HOME`, `$GEM_PATH` を更新します。

画面右上のメニューから Manage EC2 Instance をクリックしてEC2の管理画面に移動しましょう。

![](/images/aws-cloud9/to-ec2-management-console.png)

アクション をクリックして インスタンスの状態 のメニューから 再起動 をクリックしてください。

![](/images/aws-cloud9/reboot-instance.png)

AWS Cloud9 の画面に戻りましょう。少し待って利用可能な状態になったら再起動は完了です。

これで RVM が正常にアンインストールされました。

## *5.* Railsのインストール

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

## *6.* 開発する

* 左側はフォルダとファイルを表示、選択できます。
* 中央部はエディタです。ここでファイルを編集します。
* 下部はターミナルです。ここでコマンドを実行します。
* 必要なものは全てブラウザにあります。ブラウザのほかにエディタやターミナルを起動する必要はありません。
* ガイドやチュートリアルを読む場合には、(Windowsマシンを利用している場合でも)Linux用のコマンドを使ってください。コマンドはクラウド上で実行され、その環境がLinuxマシンだからです。
* ガイドやチュートリアルで、サーバを起動する時のコマンドは```rails server```ではなく```rails server -b 0.0.0.0```を実行してください。何も指定しなかった場合はコマンドを実行した環境以外からはアクセスできないため、操作しているマシンからも表示がうまく行えません。
* ガイドやチュートリアルで、ブラウザから例えば http://localhost:3000 へアクセスする場合は、アドレス欄に入力するのではなく、画面上部から 'Preview' - 'Priview Running Application' を選ぶことで同じ操作ができます。
* 例えば、 http://localhost:3000/posts へアクセスしたい場合は、'Preview' - 'Priview Running Application' を選んだあと、 '/posts' をアドレス欄の末尾に加えてください。
