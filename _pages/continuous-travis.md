---
layout: default
title: Continuous Deployment - cuz less hassle
permalink: continuous-travis
---

# Travisを使用した継続的デプロイ

*Created by Floor Drees, [@floordrees](https://twitter.com/floordrees)* / *翻訳者: [@monyatto](https://twitter.com/monyatto)*

### 継続的デプロイとは何でしょうか？

継続的デプロイは継続的デリバリー「ムーブメント」の一環です。継続的デリバリーの背景にある考え方は、ソフトウェアデリバリープロセスをできる限り自動化することです。

継続的デプロイチェーンが機能すると、Gitにデプロイ（そこではテストするためにはすべてがコミットされていなければならず、デプロイするためにすべてがテストされていなければなりません）を強制します。それにより共同作業しやすくなり、デプロイが速くなります。そうすれば、アプリをさらに素晴らしいものにすることに集中できるでしょう！

数々の先進的な企業がこの波に乗っています。このガイドにおいては [Travis-ci](http://about.travis-ci.org/) を使って、GitHubからanyninesへRuby on Railsアプリの継続的デプロイのセットアップをしていきましょう。

__COACH__: 継続的デプロイの利点について話しましょう。

###Github、Travis CIとanynines

まずGithubにリポジトリが必要です。私たちには既にそれがありますね！次にanyninesを使ってデプロイする方法のガイドを最後の手順まで終えたことを確認してください。

それから、アプリのメインディレクトリに`manifest.yml`という名前のファイルを作成していきましょう。そこにデプロイについての情報を保存することができます。ターミナルで以下のコマンドを実行してください。

{% highlight sh %}
cf push
{% endhighlight %}

これはanyninesへの最初のデプロイの引き金になります。cf gemは`manifest.yml`が無いことを確認すると、基本的な設定に関する質問をしてきます。 例えば、あなたのアプリインスタンスで希望する数とメモリサイズ、どのサービスをバインドするかどうかなどについてです。中でもとりわけ重要な質問はこれらの情報を保存するかということです。
希望するmanifest.ymlファイルを作成するために、この質問には「yes」と答えてください！

一度pushが成功すると、あなたのブラウザを使ってアプリにアクセスできるようになります。以上でTravisをセットアップする準備ができました！

今の私たちには「‘real tests’」がありません。そのため次の手順では成功したテストスイートを偽造するTravisの設定ファイルを作成しましょう。まずローカル環境でアプリのディレクトリまで移動し、``.travis.yml``ファイルを作成してください。作成したファイルに次の内容を貼り付けてください。後ほどTravis gemを使って情報を追加します。

{% highlight sh %}
language: ruby
script: 'true'
{% endhighlight %}

これでアプリにTravisの設定が含まれるようになりましたが、TravisはGithubからあなたのコードを引っ張ってきて、テストを実行するタイミングをどのように知るのでしょうか？ここでGithubフックの出番です！

#### Travis CIにおけるGithubフックの有効化

コードの変更をコミットし、リポジトリにプッシュしましょう。そしてテストスイートが実行されているか、travis-ci.org を確認してください。あなたのビルドが成功したというメールも届くでしょう。

{% highlight sh %}
git add .  
git commit -m "test Travis integration"  
git push origin master
{% endhighlight %}

実際のデプロイを設定できるようになりました。travis gemを使ってみましょう。
Let's use the travis gem:
{% highlight sh %}
gem install travis
{% endhighlight %}

`travis`コマンドを使用して、anyninesデプロイをセットアップできます。
{% highlight sh %}
travis setup cloudfoundry
{% endhighlight %}

anyninesのターゲットURLを知らない場合は以下のコマンドを使用してください。
{% highlight sh %}
cf target
{% endhighlight %}

Travisのセットアップに必要なすべての情報を収集します。これには、ターゲットURL、ユーザー名、現在使用している組織とスペースが含まれます。anynines.comへのサインインが完了した後にウェルカムメールも届くでしょう。

`travis`コマンドが終了後、`.travis.yml`は以下のようになります。
{% highlight sh %}
language: ruby
script: 'true'
deploy:
  provider: cloudfoundry
  target: https://api.de.a9s.eu
  username: jane.doe@example.com
  password:
    secure: your encryped password determined by the travis gem=
  organization: railsgirls
  space: heaven
  on:
    repo: jane/railsgirls
{% endhighlight %}

``.travis.yml``の変更をコミットし、プッシュすることを忘れないようにしましょう。これは、Githubリポジトリ内で設定を有効にするために必要です。

これからは、Githubリポジトリに変更をコミットするたびに、テストが実行され、アプリがデプロイされます。その後、Travisは次のような長いログを出力します。

{% highlight sh %}
Installing deploy dependencies
Fetching: addressable-2.3.5.gem (100%)
Successfully installed addressable-2.3.5
Fetching: multi_json-1.7.9.gem (100%)
Successfully installed multi_json-1.7.9
Fetching: caldecott-client-0.0.2.gem (100%)
Successfully installed caldecott-client-0.0.2
Fetching: i18n-0.6.5.gem (100%)
Successfully installed i18n-0.6.5
Fetching: tzinfo-0.3.37.gem (100%)
Successfully installed tzinfo-0.3.37
Fetching: minitest-4.7.5.gem (100%)
Successfully installed minitest-4.7.5
Fetching: atomic-1.1.13.gem (100%)
Building native extensions.  This could take a while...
Successfully installed atomic-1.1.13
Fetching: thread_safe-0.1.2.gem (100%)
Successfully installed thread_safe-0.1.2
Fetching: activesupport-4.0.0.gem (100%)
Successfully installed activesupport-4.0.0
Fetching: builder-3.1.4.gem (100%)
Successfully installed builder-3.1.4
Fetching: activemodel-4.0.0.gem (100%)
Successfully installed activemodel-4.0.0
Fetching: cf-uaa-lib-2.0.0.gem (100%)
Successfully installed cf-uaa-lib-2.0.0
Fetching: multipart-post-1.2.0.gem (100%)
Successfully installed multipart-post-1.2.0
Fetching: rubyzip-0.9.9.gem (100%)
Successfully installed rubyzip-0.9.9
Fetching: cfoundry-4.3.6.gem (100%)
Successfully installed cfoundry-4.3.6
Fetching: interact-0.5.2.gem (100%)
Successfully installed interact-0.5.2
Fetching: json_pure-1.8.0.gem (100%)
Successfully installed json_pure-1.8.0
Fetching: mothership-0.5.1.gem (100%)
Successfully installed mothership-0.5.1
Fetching: mime-types-1.25.gem (100%)
Successfully installed mime-types-1.25
Fetching: rest-client-1.6.7.gem (100%)
Successfully installed rest-client-1.6.7
Fetching: uuidtools-2.1.4.gem (100%)
Successfully installed uuidtools-2.1.4
Fetching: cf-5.2.2.gem (100%)
Successfully installed cf-5.2.2
22 gems installed
dpl.2
Preparing deploy
Setting target to https://api.de.a9s.eu...... OK
target: https://api.de.a9s.eu
Authenticating.. .  ... OK
Switching to organization railsgirls... OK
Switching to space heaven... OK
dpl.3
Deploying application
Using manifest file manifest.yml
Uploading railsgirls... OK
Stopping railsgirls... OK
Preparing to start railsgirls... OK
Checking status of app 'railsgirls'...
  0 of 1 instances running (1 starting)
  0 of 1 instances running (1 starting)
  1 of 1 instances running (1 running)
Push successful! App 'railsgirls' available at http://railsgirls.de.a9sapp.eu
Logging out... OK
{% endhighlight %}

これらはTravisを使った継続的デプロイの準備が完了したことを示しています！