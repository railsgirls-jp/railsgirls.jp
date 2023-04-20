---
layout: default
title: "How to Get Rails Girls Started"
permalink: getting-started-jp
---

### Rails Girls イベントを開始させる手順
<br/>
このメモはどこからイベントを始めればいいのかを原田がまとめたもので、
日本語版独自のページです。自分の街で、Rails Girlsを開催したい方は
参考にしてください。
<br/>
<br/>


#### 1. 早めに準備をスタートさせる
<br/>
Rails Girls のガイドにも書いてあるが、最低でも２ヶ月くらいは準備期間があるといい。
２度目以降の開催なら、３週間くらいでもできなくはないが、初めてのケースでは何かと時間がかかる。
日程と場所を決め、コーチ、スポンサーを探し、参加受付サイトを準備し、ウェブサイトを作り、
参加者を選ぶ、ワークショップ中の食べ物・飲み物の手配、コーチ・ディナー／アフターパーティの手配、
ワークショップで使用するマテリアルの準備、スポンサーからいただいたお金の管理などをやらねばならない。
早くにスタートさせると同時に協力者も見つける。一人では無理。<br/>
Rails Girls Tokyoの場合、原田が言い始めたところ、かくたにさんというすばらしい協力者が
現れた。かくたにさんの多大な協力のもと、物事が進められている。
<br/>
<br/>
[ガイド](/guide)を読んで、Rails Girlsとはどのようなモノかを理解する。このガイドはとても
役に立つ。これまでにいくつものイベントを世界各地で開催してきたノウハウが詰まっている。
日本の事情に合わないなどと考えず、できるだけ従うのがイベント成功のカギではないかと思う。
ながいけれど、とにかく一度は全部に目を通しておくべき。
<br/>
<br/>

#### 2. Rails Girlsメーリングリストに参加する
<br/>
イベント開催の情報を流し合うメーリングリストに参加する。MLは英語。
[https://groups.google.com/group/rails-girls-team?hl=en](https://groups.google.com/group/rails-girls-team?hl=en)
<br/>
必ずしも参加しなくていいかもしれない。質問などは、直接 contact@railsgirls.comに投げてもいいので。
<br/>
<br/>

#### 3. Shout Out
<br/>
ここのフォームに「この街でやるよー！」と書き込む。英語。
[https://railsgirls.com/inyourcity](https://railsgirls.com/inyourcity)
<br/>
このとき、誰がこの Shout Out を Rails Gilrs ML に流してくれたかを
見ておくといい。その人が、Shout Outしたイベントの担当者らしい。
<br/>
書き込む段階で、日程や場所、コーチ、スポンサーなど全てが決まっている必要はない。
ただし、イベント開催という性格から日程と場所くらいは目処を立ててから叫びたい。
その他については、Rails Girls Team が何らかの形で助けてくれるかもしれない。
<br/>
<br/>


#### 4. Rails Girls 都市名、のメーリングリストを作る
<br/>
メールのCCでは難しい。全員にリプライするのをうっかり忘れるし、
後になってメーリングリストに参加した人には、過去の話し合いが見えない。<br/>
メーリングリストはどこでもよい。使いやすいところ／好きなところ／簡単に始められるところ
などを考慮して選べばよい。Rails Girls Tokyo は 手軽に始められるという理由で
Google Groupsを選んだ。使いやすさでは今ひとつかもしれないが、特に問題はない。
<br/>
<br/>


#### 5. 参加受付サイトを用意する
<br/>
Rails Girls Tokyo は [DoorKeeper](http://www.doorkeeper.jp/) を使用。
他に、[イベントアテンド](http://atnd.org/) がある。Google Docs を使うという手も
あるようだ。<br/>
Doorkeeperを運営している mobalean の Paul McMahon さんは協力的。
<br/>
<br/>


#### 6. railsgirls.com でイベントを告知する
<br/>
まずは、GitHub上のプロジェクト https://github.com/railsgirls/railsgirls へのRead+Write access権を
もらう必要がある。このプロジェクトは private なので一般には公開されていない。Shout Outしたときに ML に
流してくれた担当の人に、直接メールを出してお願いしてみるといい(英語)。その人か、あるいは、その人経由で
アクセス権をもらえるはず。<br/>
<br/>
プロジェクトをクローニングしたら、README に書いてあるように、テンプレートをコピーするか、日本語なら
Rails Girls Tokyoの告知ページ tokyo.html をコピーしてもいい。ただし、tokyo.html は事情にあわせて
オリジナルと違うところがある(コーチはもう足りている、他)ので、オリジナルと比べて自分のイベントに合うように
修正するのを忘れないように。<br/>
「コーチ募集中」になっていると、それなりにコーチに立候補してくれる人が現れる。なので、最初から十分な
数のコーチを確保できなかったとしても、ここで、なんとかなる可能性がある。<br/>
<br/>
Rails Girls City のロゴとイラストは自分で作ったが、もしかすると、お願いしたら作ってくれるのかもしれない。
クローニングすると assets/fonts 以下に 14.Interstate TT     \[1993 - Tobias Frere-Jones].zip が
あるので、これを使う。"Rails Girls Tokyo" の方は、InterstatePlus Medium 55 pt, color #d3360b、
"7-8th September 2012 - Japan" の方は、Interstate Bold 23 pt, color #3e3e3e にした。これが
オリジナルに近いように見えたが、他の Interstatexxx のフォントもかなり似ているものがあったので、
違うフォントでもいいかもしれない。イラストは 300 x 300 pixels 程度。<br/>
<br/>
README に書いてあるように、style.css、index.html、events.html も修正する。日付を数カ所に書くので
すべて漏れが無いことをチェックする。<br/>
<br/>
修正後、リモートリポジトリに push したら、誰かに連絡する(英語)。railsgirls.com のサイトに修正を
かけるには Deploy が必要らしい。Deploy できる人は限られているが、そこに連絡を付けてくれるはず。<br/>
<br/>
以上で、railsgirls.com でイベント告知ページが公開される。<br/>
<br/>


#### note.
<br/>
Rails Girls Guideに書いてあるように、参加希望者は意外に多いもの。
できれば、50人くらい入る部屋を見つけた方がいいかもしれない。<br/>
<br/>


