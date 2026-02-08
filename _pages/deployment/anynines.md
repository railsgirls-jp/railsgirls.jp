---
layout: main_guide
title: anyninesであなたのアプリをオンラインにあげよう
permalink: deployment/anynines
---

# anyninesであなたのアプリをオンラインにあげよう
*Created by Floor Drees, [@floordrees](https://twitter.com/floordrees)* / *Translated by moegi, [@moegi_web](https://twitter.com/moegi_web)*

{% coach %}
anyninesを導入した場合とアメリカのデータセンターを利用した場合の利点について話してみましょう。
{% endcoach %}

### anyninesをインストールしよう
1. [anyninesのアカウントを作成します。](https://anynines.com/)

2. anyninesを利用するための[コマンドラインインターフェイスをダウンロードし、インストールします。](https://anynines.zendesk.com/hc/en-us/community/posts/234540388-How-to-install-the-CLI-v6)

3. 次に、anyninesのAPIエンドポイントを選択し、ユーザー資格情報を使用して認証します。

{% highlight sh %}
cf api https://api.de.a9s.eu
cf login -u [your@email] -p [yourpassword]
{% endhighlight %}

うまくいかない場合は、以下のコマンドを使用してください。

{% highlight sh %}
cf login
{% endhighlight %}

... メールアドレスとパスワードの入力を求められるでしょう。

`cf`とは何でしょうか？これは[Cloud Foundry](https://www.cloudfoundry.org/)の略で、anynines の裏側で使用しているシステムです。

### アプリをオンラインにプッシュする

このソースコードをローカル環境からanyninesにプッシュしてみましょう。
{% highlight sh %}
$> cf push [application-name-of-your-choosing]
{% endhighlight %}

サンプルアプリの起動にはMySQLデータベースが必要なため、これでは失敗してしまいます。まずは、MySQLデータベースを作成してみましょう。以下のコマンドは、無料のサービスプランを使用してMySQLサービスを作成します。プラン名の後に、サービスインスタンスの名前を指定する必要があります。この名前は、このサービスインスタンスを参照するための以降のコマンドで使用されます。
{% highlight sh %}
$> cf create-service mysql Pluto-free [service-name-you-can-choose]
{% endhighlight %}
(実際にはどんな名前でも構いません。ただ名前は大切です！)

次に、MySQLサービスインスタンスをアプリケーションにバインドして、アプリケーションに MySQLインスタンスへのアクセスを許可するために、次のように入力します。

{% highlight sh %}
$> cf bind-service [app-name-you-have-chosen-above] [service-name-you-have-chosen-above]
{% endhighlight %}

最後に、サービスバインディングが有効であることを確認するためにアプリケーションを再起動する必要があります。
{% highlight sh %}
$> cf restart [app-name-you-have-chosen-above]
{% endhighlight %}

これが表示されるでしょう。
{% highlight sh %}
Creating service postgresql-d2197... OK
Binding postgresql-d2197 to railsgirls... OK
{% endhighlight %}

これで終わります... `Push successful! App 'railsgirls' available at railsgirls.de.a9sapp.eu`. よくやりましたね!

### バージョン管理

新しいコードをバージョン管理に追加する必要があります。これを行うには、ターミナルで次のコマンドを実行します。

{% highlight sh %}
git status
git add .
git commit -m "add anynines deployment"
{% endhighlight %}

{% coach %}
バージョン管理システムと git についてまだ話していない場合は、この機会に話してみましょう。
{% endcoach %}

### ヘルプ
`cf help`と入力すると、使用可能なすべてのcfサブコマンドを確認できます。あなたのターミナルに答えが見つからない場合、anyninesチームが答えを持っているでしょう。support@anynines.com にメールを送信してください。

デプロイを楽しんでください！
