---
layout: post
title: Rails Girls Sapporo 2nd 開催レポート
date: 2025-12-22
image: /images/blog/sapporo2nd/syugo.webp
---

<style type="text/css">
div.photos {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1em;
  gap: 5px;
}

div.photos img.photo {
  width: 100%;
  object-fit: cover;
  margin-bottom: 2.5px;
}

div.photos img.vertically-photo {
  max-width: 250px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 2.5px;
}

/* PC表示 */
@media (min-width: 768px) {
  div.photos img.photo {
    max-width: calc(50% - 2.5px);
    width: calc(50% - 2.5px);
    margin-bottom: 5px;
  }

  div.photos img.vertically-photo {
    max-width: 250px;
    margin-bottom: 5px;
  }
}

div.flex-photos img.vertically-photo {
  max-width: 350px;
  width: 100%;
  object-fit: cover;
  margin-right: 0.5rem;
}
</style>

## はじめに

[Rails Girls Sapporo 2nd](https://railsgirls.com/sapporo-2nd.html) のオーガナイザーをやらせていただいたはる（[@lemonade_37](https://x.com/lemonade_37)）・えび（[@025cm](https://x.com/025cm)）・なかがわ（[@rena1208](https://github.com/rena1208)）です！

この記事は、2025年10月17日（金）と10月18日（土）に 札幌市産業振興センター Sapporo Business HUB で開催された [Rails Girls Sapporo 2nd](https://railsgirls.com/sapporo-2nd.html) の開催レポートです。

一般財団法人さっぽろ産業振興財団との共催という形で開催し、作業しやすく雰囲気の良い会場をお貸しいただきました。ありがとうございました！

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/zentai.webp" alt="会場全体の様子">
</div>

## Rails Girls Sapporo 2nd 開催のきっかけ

オーガナイザーのはるが、2024年6月末に [えにしテック15周年記念カンファレンス](https://enishi-tech-15th-anniv-conf.peatix.com/) に参加した際に、今回コーチ・LTもしていただいた島田さん（[@snoozer05](https://x.com/snoozer05)）が、Rails Girls Japanの江森さん（[@emorima](https://x.com/emorima)）を紹介してくださいました。

そこで、札幌でのRails Girlsは10年以上開催されていないことを知りました。
札幌でも女性がプログラミングに親しめる場や、Rubyコミュニティのイベントに参加できる機会を作りたいと思い、北海道のコミュニティ内で知り合った3人で開催することになりました！

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/organizer.webp" alt="オーガナイザー紹介">
</div>

## 6回実施した「素振り会」
12年ぶりの開催となる Rails Girls Sapporo 2nd に向けて、 オーガナイザーとしても、「本当に大丈夫だろうか」「当日をスムーズに迎えられるだろうか」という不安がありました。

そんな中、江森さんから 「事前に素振り会をやるといいですよ」とアドバイスをいただいたことをきっかけに、 Sapporo 2nd では 結果的に 全6回の素振り会 を行いました。
素振り会では、当日の進行や教材を確認しながら、 実際にどこでつまずきそうか、どんな声かけが必要かをみんなで確認しました。
話し合った内容はナレッジとしてドキュメント化し、共有知にしていくことを心がけていました。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/suburikai.webp" alt="素振り会">
</div>

素振り会を通して、コーチの皆さんが自発的にドキュメントを読んで準備してくださっている様子を目にすることができました。
「Girlsのために、よりよい時間を作りたい」という思いが伝わってきて、 オーガナイザー一同、ありがたいなあと感じる場面が何度もありました。

振り返ってみると、この素振り会があったことで、 当日少し肩の力を抜いて迎えることができて、 温かい雰囲気のワークショップにつながったように感じています。

## オープニング・アイスブレイク

ワークショップ当日は、オーガナイザーの挨拶からスタートです。
オーガナイザーの紹介や当日のスケジュール、そしてオーガナイザーの思いを
お伝えさせていただきました。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/opening.webp" alt="オープニング">
</div>

オープニングの後半はアイスブレイクで「以心伝心ゲーム」を行いました！お題に対してグループで同じ答えを出すことができるかを競うこのゲーム。
グループ内で会話をするきっかけも生まれ、Girlsの皆さんやコーチの緊張もほぐれ楽しげな雰囲気になりました。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/icebreak.webp" alt="アイスブレイク">
</div>

## ワークショップ開催の様子

Rails Girls Sapporo 2ndのGirls参加者は10名でした。
Girls一人一人にマンツーマンでコーチがつき、10月17日（金）はPCの環境構築を行い、18日（土）はRuby on Railsを使用したWebアプリの開発をするワークショップが行われました。

みなさん和気あいあいと、楽しそうにWebアプリの開発を進められており、とても温かい雰囲気でした。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/workshop1.webp" alt="キタキツネグループの様子">
  <img class="photo" src="/images/blog/sapporo2nd/workshop2.webp" alt="スケッチブックで図解しながらの説明">
  <img class="photo" src="/images/blog/sapporo2nd/workshop3.webp" alt="マンツーマンでのサポートの様子">
  <img class="photo" src="/images/blog/sapporo2nd/workshop4.webp" alt="ガイドの内容をアレンジしてピンク色のウェブサイトにしている様子">
  <img class="photo" src="/images/blog/sapporo2nd/workshop5.webp" alt="エゾリスチームの様子">
  <img class="photo" src="/images/blog/sapporo2nd/workshop6.webp" alt="たくさんの枚数のスケッチブック">
  <img class="photo" src="/images/blog/sapporo2nd/workshop7.webp" alt="エゾユキウサギチームの様子">
  <img class="photo" src="/images/blog/sapporo2nd/workshop8.webp" alt="マンツーマンで図解しながらの説明">
</div>

## お昼休憩・スポンサーLTの様子

お待ちかねのランチタイム！
農家の息子さんのお弁当が5種類も並んでいて、みなさまどれにしようか目移りしつつ選ばれていました。
素敵なお昼を楽しめたのも、スポンサーの皆さまのご支援あってこそです。
ありがとうございます。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/obento.webp" alt="お弁当">
</div>

ランチタイム中には、スポンサー企業の皆さんにLTもしていただきました。
個人の学習方法のお話から、エンジニア転職を考える際に役立つ助成金の紹介まで、テーマはさまざま。どれも興味深く、聞いていて飽きない楽しい時間でした。

- フリー株式会社 / 佐藤さん
- 株式会社MIERUNE / オーガナイザー 中川さん
- 株式会社えにしテック / オーガナイザー はるさん
- STORES株式会社 / 橋本さん
- 株式会社ロッカ / 町田さん
- 株式会社SmartHR / 岸川さん
- ピクシブ株式会社 / 野間口さん（joyさん）

また、オーガナイザーのえびもLTしました！
- Middlemanに入門してみた！ / えび

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/sponsor1.webp" alt="フリー株式会社さんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/sponsor2.webp" alt="株式会社MIERUNEさんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/sponsor3.webp" alt="株式会社えにしテックさんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/sponsor4.webp" alt="STORES株式会社さんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/sponsor5.webp" alt="株式会社ロッカさんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/sponsor6.webp" alt="株式会社SmartHRさんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/sponsor7.webp" alt="ピクシブ株式会社さんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/ebilt.webp" alt="オーガナイザーえびさんのLT">
</div>

## 本のコーナー

コーチの皆様にゆかりのある本など、スタッフが持ち寄った本の展示をさせていただきました。
ワークショップの合間に、本を手に取って読んでいる参加者の姿も見られて、「置いてよかったなぁ」とうれしい気持ちになりました。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/book1.webp" alt="本のコーナーに並んでいる本1">
  <img class="photo" src="/images/blog/sapporo2nd/book2.webp" alt="本のコーナーに並んでいる本2">
</div>

## ノベルティグッズ

会場ではスポンサー様のノベルティグッズの配布も行いました。
多くの企業様からのご協力に心より感謝いたします。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/novelty1.webp" alt="GMOペパボさん：アクリルブロック">
  <img class="photo" src="/images/blog/sapporo2nd/novelty2.webp" alt="GMOペパボさん：吸着ポスター">
  <img class="photo" src="/images/blog/sapporo2nd/novelty3.webp" alt="GMOペパボさん：スタッフTシャツ">
  <img class="photo" src="/images/blog/sapporo2nd/novelty4.webp" alt="STORES株式会社さん：ツバメようかん">
</div>

## アプリ開発Done!!

Webアプリ開発完了後、チームごとに集合写真を撮りました。
なんとか全チーム無事にデプロイすることができました。お疲れ様でした！

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/team1.webp" alt="ヒグマチームデプロイ完了！">
  <img class="photo" src="/images/blog/sapporo2nd/team2.webp" alt="シマエナガチームデプロイ完了！">
  <img class="photo" src="/images/blog/sapporo2nd/team3.webp" alt="キタキツネチームデプロイ完了！">
  <img class="photo" src="/images/blog/sapporo2nd/team4.webp" alt="エゾリスチームデプロイ完了！">
  <img class="photo" src="/images/blog/sapporo2nd/team5.webp" alt="エゾユキウサギチームデプロイ完了！">
</div>

## クロージング

クロージングでは、1日の開発内容をみんなで振り返りました。
全員がデプロイまでたどり着けていて、達成感のある締めくくりになりました。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/closing.webp" alt="クロージング">
  <img class="photo" src="/images/blog/sapporo2nd/syugo.webp" alt="全体集合写真">
</div>

## アフターパーティ

アフターパーティでは、増田おはぎさんのおはぎや、オーガナイザーおすすめの北海道銘菓を準備しました！

飲み物は、リボンナポリンや富良野ホップ炭酸水など、北海道ならではのものを選んでみました。

「これどんな味なんだろう？」と参加者のみなさんが盛り上がりながらおしゃべりしている様子を見て、オーガナイザー一同、「開催してよかったなあ」としみじみ感じるひとときでした。

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/ohagi.webp" alt="増田おはぎのおはぎ">
  <img class="photo" src="/images/blog/sapporo2nd/afteroyatsu.webp" alt="アフターパーティのおやつ（北海道銘菓）">
  <img class="photo" src="/images/blog/sapporo2nd/afterkaijo.webp" alt="アフターパーティ会場の様子">
  <img class="photo" src="/images/blog/sapporo2nd/afterparty.webp" alt="アフターパーティ交流中の様子">
</div>

アフターパーティでは、コーチLT・コミュニティ紹介のLTをしていただきました！

17年以上コミュニティ活動をされている西原さんの「技術系の勉強会・コミュニティとは何か」というお話からスタートし、Girlsの皆さんが次のステップとしても参加できるSapporo Engineer Baseさんのイベントの紹介もありました。コーチLTの島田さんからは、こうした活動を通じて生まれ、継続していく「縁」についてのお話をしていただきました。

どの発表も本当に素晴らしく、資料へのリンクも掲載しましたので、ぜひご覧ください！

- [情報技術系の勉強会とコミュニティ文化](https://www.docswell.com/s/tomio2480/5JQVEN-introduction-to-study-group) / 西原さん（[@tomio2480](https://x.com/tomio2480)）
- [Sapporo Engineer Baseについて](https://sapporo-engineer-base.dev/) / 特別協力Sapporo Engineer Base&コーチ 西村さん（[@\_n13u\_](https://x.com/_n13u_)）
- [One Enishi After Another](https://speakerdeck.com/snoozer05/one-enishi-after-another) / コーチ 島田さん（[@snoozer05](https://x.com/snoozer05)）
- Rails Girls Japanについて / 江森さん（[@emorima](https://x.com/emorima)）

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/after1.webp" alt="西原さんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/after2.webp" alt="西村さんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/after3.webp" alt="島田さんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/after4.webp" alt="江森さんのLT">
  <img class="photo" src="/images/blog/sapporo2nd/afterlt.webp" alt="待機中のLT登壇者の方々">
</div>

今回の Sapporo 2nd には、なんと Sapporo 1st のオーガナイザー・omega さんも見学に来てくれました。
1st と 2nd がつながったような心地がして、不思議で少しうれしい時間でした。
差し入れのお菓子までいただき、本当にありがとうございました🍪

<div class="photos">
  <img class="photo" src="/images/blog/sapporo2nd/sasiire.webp" alt="omegaさんからの差し入れのお菓子">
</div>

## さいごに

今回の Sapporo 2nd を一緒につくり上げてくださったGirlsのみなさん、コーチのみなさん、そしてスポンサーのみなさんに心より感謝申し上げます。
無事にイベントを終えられたのも、皆さまの温かいサポートあってこそでした。

たくさん笑って、おしゃべりして、学びの多い一日になりました。
本イベントを通じて得られた出会いや気づきが、今後の皆さまの挑戦や成長につながり、また思わぬ「えにし」として結ばれることを、オーガナイザー一同願っております。


### 関連リンク

- [公式Twitter](https://x.com/railsgsapporo)
- [#railsgirlssapporo ポスト一覧](https://x.com/search?q=%23railsgirlssapporo&f=live)
- [Rails Girls Sapporo 2nd公式ウェブサイト](https://railsgirls.com/sapporo-2nd.html)
