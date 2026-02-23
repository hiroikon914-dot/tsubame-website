# つばめ装業 Webサイト

横浜市緑区を拠点にする塗装業「つばめ装業」のウェブサイトです。

---

## ファイル構成

```
/
├── index.html          トップページ
├── about.html          職人紹介（コンさん紹介）
├── services.html       サービス内容
├── works.html          施工事例
├── pricing.html        料金目安・概算シミュレーター
├── faq.html            よくある質問
├── contact.html        お問い合わせ
├── privacy.html        プライバシーポリシー
├── sitemap.xml         Googleクロール用サイトマップ
├── robots.txt          クローラー設定
└── assets/
    ├── css/style.css   デザイン（色・レイアウト）
    ├── js/main.js      動作（計算・アコーディオン・ハンバーガー）
    └── img/            写真ファイルを入れるフォルダ
```

---

## よくある編集箇所

### 🔗 LINEのURLを変更したい
全ファイルの `https://lin.ee/XXXXXXXXX` を実際のURLに置き換えてください。
VSCodeの「検索と置換」（Ctrl+Shift+H）で一括置換が便利です。

---

### 📞 電話番号を変更したい
`contact.html` の以下の部分を変更：
```html
<div class="tel-number">090-xxxx-xxxx</div>
```

---

### 📷 写真を差し替えたい
1. `assets/img/` フォルダに写真を入れる（例：`work1-before.jpg`）
2. HTMLの `<div class="work-img-placeholder">` を以下に書き換える：
```html
<img src="assets/img/work1-before.jpg" alt="外壁塗装 Before">
```

---

### 💰 単価を変更したい
`assets/js/main.js` の `PRICING` オブジェクトを編集：
```js
const PRICING = {
  gaiheki: {              // 外壁塗装（1坪あたり・税込）
    omakase:  { min: 8000,  max: 12000 },
    shikkari: { min: 13000, max: 18000 },
    kodawari: { min: 19000, max: 28000 },
  },
  ...
};
```

---

### 📝 Q&Aを追加したい（faq.html）
以下のブロックをコピーして `faq-list` の中に追加：
```html
<div class="faq-item">
  <div class="faq-q">
    <span class="faq-q-text">質問文をここに</span>
    <span class="faq-toggle">+</span>
  </div>
  <div class="faq-a">
    <p class="faq-a-inner">回答文をここに</p>
  </div>
</div>
```

---

### 📷 Instagramの投稿を埋め込みたい
1. Instagramで投稿を開く → 「…」→「埋め込む」→ コードをコピー
2. `<div class="insta-placeholder">` をそのコードに置き換える
3. `</body>` の直前に以下を追加：
```html
<script async src="//www.instagram.com/embed.js"></script>
```

---

### 📧 フォームを実際にメール送信したい
[FormSpree](https://formspree.io)（無料）に登録して：
```html
<form class="contact-form" action="https://formspree.io/f/あなたのID" method="POST">
```

---

## カラー変更

`assets/css/style.css` 先頭の `:root {}` を編集：
```css
--primary: #1B6CA8;   /* メインカラー（つばめブルー） */
--accent:  #F28C28;   /* アクセント（温かみオレンジ） */
```

---

## GitHub Pages 公開方法

1. リポジトリを GitHub に push
2. Settings → Pages → Branch: main / root → Save
3. 数分後に `https://ユーザー名.github.io/リポジトリ名/` で公開される

公開後は [Google Search Console](https://search.google.com/search-console) に登録して
`sitemap.xml` のURLを送信するとGoogleへのインデックスが早まります。
