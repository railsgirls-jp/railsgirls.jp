---
layout: default
title: Rails Girls on Engine Yard
permalink: engineyard
---

# Engine Yardを使用してインターネットに公開しよう!

*Created by Mary Jenn, [@mfjenn](https://twitter.com/mfjenn), Translated by Hiroshi SHIBATA*

#### データベースは PostgreSQL を使うように修正する

EngineYard で動かすためには使用しているデータベースを Rails がデフォルトで使用しているものから変更する必要があります。Gemfile を:
:

    gem 'sqlite3'

から、以下のように変更してください。

    group :development do
      gem 'sqlite3'
    end

    group :production do
      gem 'pg'
    end

依存関係を解決するために `bundle install --without production` を実行してください。

#### バージョン管理システム

アプリケーションを Git のリポジトリに追加しましょう。以下のコマンドをターミナルで実行してください。:

{% highlight sh %}
git init
git add .
git commit -m "initial commit"
{% endhighlight %}

__コーチより__: バージョン管理システムと git について解説する良い機会ですね。

### Rails アプリケーションを Github のリポジトリに追加します

GitHub のアカウントを作成して、EngineYard がアプリを Github から取得可能にします。このために、Github にリポジトリを作成して、アプリを push する方法は[Github](https://help.github.com/articles/create-a-repo)を参照してください。もし、動く Rails アプリケーションを持っていない場合は, [Engine Yard's sample todo app](https://github.com/engineyard/todo) を fork して自分のアプリとすることもできます。コーチの皆さんは必要に応じて助けてください。

### Engine Yard のフリー体験アカウントを作成する

Engine Yard の [Website](https://www.engineyard.com/) を開いて、500 時間の無料時間がついた体験アカウントを作成するために、"GET STARTED FREE" をクリックします。この登録時に確認メールが送信されます。メールを確認して、メールのリンクをクリックし、あなたのアカウントを作成してください。 "Engine Yard Cloud" と呼ばれる "Your available applications" の下のリンクをクリックします。これがあなたのダッシュボードになります。

### Engine Yard Cloud のアカウントを作成する

 1. アカウント名を決めてください。EnginYard では、あなたに関連した開発や組織の情報を提案します。"Start Trial"ボタンを押してください。
 2. さあ、ドロップダウンメニューを探してみましょう。でも、デフォルトのままで、普通の Rails アプリで動くようになっています。
 3. "Git Repository URI"と書いてあるテキストボックスにあなたの Github リポジトリの URI を貼り付けてください。 あなたのアプリケーションの SSH からなる URI を使うようにしてください。ヒント: このフォーマットは "git@github.com:mfjenn/blogotron.git" のようなあなたの EnginYard アプリケーションと同じ名前になっています。

### デプロイ鍵を置く

あなたは今、"Allow Engine Yard access to private repository" というページにいるはずです。

 1. ボックス内の文言をコピーして、あなたの GitHub の設定ページにアクセスしましょう。
 2. SSH ページにアクセスします。
 3. "add a key" というボタンをクリックします。
 4. Engine Yard のページでコピーした内容をここに貼り付けます。保存します。
 5. Engine Yard のページに戻って、"My deploy key is in place" というボタンをクリックします。

__コーチの方へ__: プライベートとパブリックレポジトリの違いやどのような時にどちらレポジトリを使用する方がいいのかについて話をしてみましょう。

### 環境の作成と設定

"My deploy key is in place" ボタンをクリックしたら、"Create New Environment for (Your Account Name) App" という文言のあるページに移動します。 ドロップダウンメニューの全てのオプションを見てもいいですが、今回はデフォルト設定を使いましょう。ドメイン名を設定する必要はありません。

* "Create Environment" というボタンをクリックしましょう。

#### 環境を設定する

ここでは、staging 設定を選択しましょう。

 * "Boot This Configuration" をクリックして下さい。いくつかのステータスバーが動いている新しいページに移動します。あなたのためのインスタンスを準備しています。ステータスバーが緑色の丸いアイコンになるまで待つ必要があります。通常、10分程度かかりますので、その間に休憩を取りませんか？水とかコーヒーを飲んだりしましょう。

__コーチの方へ__: staging と production の違いについて、そして、なぜ、複製を準備しておくことが重要なのかについて、話をしてみましょう。マスターとスレーブとは何かについて話をしましょう。Engine Yard で、どのようにフェイルオーバーをしているのでしょうか？なぜ、それが重要なのでしょうか？

#### アプリケーションをデプロイする

 1. 全てのアイコンが緑になれば、"Deploy" ボタンをクリックして下さい。
 2. "YOUR NAME successfully deployed HEAD" という文言が表示されるとアプリケーションのデプロイが完了したことになります。おめでとうございます！
 3. "View your application" というリンクをクリックして、起動したアプリケーションにアクセスしてみましょう。
 4. デプロイが失敗したといった通知を受けた場合には、何らかを修正する必要があります。手を上げて、コーチに助けてもらいましょう。

#### 時間を節約するためにインスタンスを停止する

アプリケーションを起動することができたら、無料で利用できる時間全てを使い尽くさないように "stop" ボタンをおして、インスタンスを停止しましょう。後から、いつでも、起動することができます。

### 追加の情報源

 * [ビデオチュートリアル(日本語)](http://www.engineyard.co.jp/jp/landing/tour)
 * [EngineYard の別のチュートリアル(英語)](https://support.cloud.engineyard.com/hc/en-us/articles/205407568-Tutorial-How-to-Deploy-the-ToDo-Application-on-a-Trial-Account)
