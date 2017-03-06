---
layout: default
title: Rails Girls インストール・レシピ(Windows)
permalink: win_another_install
---

# Rails Girls インストール・レシピ(Windows)
<span class="muted">クッキングタイム: 5分 (作業時間) / 15-30分 (待ち時間)</span>

## インストール

1. [ここ](https://github.com/sho-h/ruby_env/archive/master.zip)からRuby本体とRails一式をダウンロードして `C:\ruby_env` となるように展開します
2. `C:\ruby_env\cmd.bat` へのショートカットをデスクトップに作成します
3. `C:\ruby_env\src` へのショートカットをデスクトップに作成します
4. デスクトップの `cmd.bat` を実行してから以下のコマンドを実行します

{% highlight sh %}
rails -v
{% endhighlight %}

もしもRailsのバージョンが5よりも小さい場合は 以下のコマンドを実行することでバージョンアップできます。

{% highlight sh %}
gem update rails --no-document
{% endhighlight %}

これで完了です。今後コマンドを実行する手順を実施する時は同じようにデスクトップの`cmd.bat`から実行してください。プログラムは同じように`src`以下に作成すると移動しやすいです。

また、以降のレシピで使用しますので、[ここ](http://git-scm.com/downloads)からGitをダウンロード、インストールしてください。

では、元のレシピに戻って作業を続けてください。

## アンインストール

1. `C:\ruby_env\src`以下で作成したプログラムをバックアップします(必要な場合のみ)
2. `C:\ruby_env\`を削除します
3. デスクトップに作成したショートカットを削除します

これで完了です。

gitも不要になった場合はコントロールパネルから`プログラムと機能`に進んでアンインストールしてください。

*コーチの方へ*: 本手順にてインストールを行った場合はレジストリ等は書き換えられる事はありません。インストールしたgemなども`C:\ruby_env\`以下に展開されているため、元々の環境は汚れていません。もし参加者の方が削除して大丈夫かなどが気になるようでしたら少し説明してあげてください。
