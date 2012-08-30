---
layout: default
title: 自分流の手引きを送る手順
permalink: contributing
---

# 自分流の手引きを送る手順

このサイトは、[markdown](http://daringfireball.net/projects/markdown/)で書かれたドキュメントを[jekyll](https://github.com/mojombo/jekyll)を利用して提供されています。手引きを投稿するには、次の手順に従って送ってください。

1.　この [repository on github](https://github.com/railsgirls-jp/railsgirls-jp.github.com) の"Fork"ボタンをクリックしてForkしてください。

2.　あなたがForkしたrepositoryを `git clone` しましょう。

3.　Fork -> cloneした中の `_posts` ディレクトリに、ファイル名を `YYYY-MM-DD-guide_name.markdown` としてファイルを作ります。

4.　このファイルでは、ファイルの先頭にYAMLで次のような記述が必要です。:
{% highlight yaml %}
---
layout: default
title: Name of the Guide
permalink: one-word-summary.html
---
{% endhighlight %}
5.　作成した新しい手引きをcommitします。

6.　commitしたら、あなたのgithubのリポジトリにpushしてください。

7.　これで、あなたの手引きを説明したpull requestを送ることができます。

こうして[Rails Girls App Tutorial](https://github.com/railsgirls/railsgirls.github.com/blob/master/_posts/2012-04-18-app.markdown)を作成する手助けができると思います。

ステキなRails Girlsのお手伝いの時間をくださって、ありがとうございます！
