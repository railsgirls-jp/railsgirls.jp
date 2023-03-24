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

4. In this file, you'll need to add some YAML front matter at the top of the file so it looks like the following example, taken from this guide that you are currently viewing:

    <pre>
    ---
    layout: default
    title: Contributing a Guide
    permalink: contributing
    ---</pre>

5.　作成した新しい手引きをcommitします。

6.　commitしたら、あなたのgithubのリポジトリにpushしてください。

7.　これで、あなたの手引きを説明したpull requestを送ることができます。

こうして[Rails Girls App Tutorial](https://github.com/railsgirls/railsgirls.github.com/blob/master/_posts/2012-04-18-app.markdown)を作成する手助けができると思います。

より詳しくは [railsgirls-jp.github.com](https://github.com/railsgirls-jp/railsgirls-jp.github.com) のREADMEページをご参照ください。

ステキなRails Girlsのお手伝いの時間をくださって、ありがとうございます！
