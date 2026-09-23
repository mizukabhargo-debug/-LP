# 陶雅(とうが) LP

ペットの写真から作るオリジナル陶器絵付けの注文制作LP。GitHub Pagesでの公開を想定した静的サイトです。

## ファイル構成

```
index.html          トップページ(LP本体)
thanks-square.html  正方形サイズ決済後のサンクスページ(写真提出フォームへ誘導)
thanks-rect.html    長方形サイズ決済後のサンクスページ
tokushoho.html       特定商取引法に基づく表記
css/style.css        スタイル
js/config.js          ★設定はここだけ編集すればOK(GA4/Google広告/Stripe/フォームURL)
js/analytics.js       GA4・Google広告タグの読み込み
js/main.js            ナビ開閉・CTAボタンの制御
marketing/ads-plan.md Google広告キャンペーン設計書(そのまま広告管理画面に入力可能)
```

## 公開・広告配信までにやること(私の権限では実行できない手動作業)

以下は、Googleアカウント/Stripeアカウントへのログインが必要なため、私の側からは実行できません。この順番で進めてください。

### 1. GitHub Pagesで公開

1. このリポジトリの GitHub 画面 → `Settings` → `Pages`
2. `Source` を `Deploy from a branch` にし、ブランチを `main`(または本ブランチをmainにマージ後)、フォルダを `/ (root)` に設定して保存
3. 数分後に `https://toga-ceramic-paint.github.io/` で公開されます
4. 将来的に独自ドメインを使う場合は、同じPages設定画面の「Custom domain」で設定できます

### 2. Stripe決済リンクの作成(2つ)

1. [Stripeダッシュボード](https://dashboard.stripe.com/) にログイン(未開設の場合はアカウント作成、無料・数分)
2. 「商品」→「商品を追加」で以下を2つ作成
   - 商品名: `陶雅 正方形(100mm×100mm)` / 価格: `¥77,000`(税込・一括)
   - 商品名: `陶雅 長方形(160mm×140mm)` / 価格: `¥143,000`(税込・一括)
3. 各商品の「決済リンクを作成」から Payment Link を発行
4. 決済リンク作成画面の「支払い後」設定で、**「確認ページを表示せず、指定したURLにお客様を移動させる」** を選び、リダイレクト先を設定
   - 正方形 → `https://(公開後のドメイン)/thanks-square.html`
   - 長方形 → `https://(公開後のドメイン)/thanks-rect.html`
5. 発行されたリンク(`https://buy.stripe.com/...`)を `js/config.js` の `STRIPE_LINK_SQUARE` / `STRIPE_LINK_RECT` に貼り付ける

### 3. 決済後の写真・ご要望提出フォーム(作成済み)

決済完了後にご案内する専用フォームを新規作成済みです: `https://forms.gle/ZQbJrZpRBnLcM4pb7`(`js/config.js` の `ORDER_FORM_URL` に反映済み)

フォームの「回答」タブから、新規回答時のメール通知をオンにしておくことをおすすめします。

### 4. GA4プロパティの作成

1. [Google アナリティクス](https://analytics.google.com/) で新規プロパティを作成(サイト名: 陶雅)
2. 「データストリーム」→ ウェブストリームを追加し、公開後のLPのURLを設定
3. 発行された測定ID(`G-XXXXXXXXXX`)を `js/config.js` の `GA4_MEASUREMENT_ID` に貼り付ける

### 5. Google広告アカウントの作成・コンバージョン設定

`marketing/ads-plan.md` に、キーワード・広告文・予算設定までそのまま入力できる形でまとめてあります。

1. [Google広告](https://ads.google.com/) でアカウント作成
2. 「コンバージョン」を2つ作成(正方形購入・長方形購入、値は固定値でそれぞれ¥77,000/¥143,000)
3. 発行される コンバージョンID(`AW-XXXXXXXXX`)とラベルを `js/config.js` に貼り付ける
4. GA4とGoogle広告アカウントをリンク(Google広告管理画面 → ツールと設定 → リンク設定 → Googleアナリティクス)
5. `marketing/ads-plan.md` の内容でキャンペーンを作成し、配信開始

### 6. 公開前の最終チェック

- [ ] `js/config.js` の全項目(GA4 ID、Google広告ID、Stripeリンク2つ)を設定した
- [ ] `index.html` / ギャラリーのプレースホルダー画像(点線枠の箇所)を実際の作品写真に差し替えた
- [ ] Stripe決済リンクを実際にテスト購入し、`thanks-square.html`/`thanks-rect.html`への遷移とGoogleフォームへの導線を確認した
- [ ] スマートフォン表示を実機で確認した

運営統括責任者名(今井弥生)・配送エリア(日本全国/80サイズ、海外は要相談)・送料(商品代金に含む、離島のみ+1,000円)・返品特約(制作開始後は不可)は反映済みです。`tokushoho.html`の「確認中」項目はすべて解消しました。

## 画像について(最重要)

現在、作品写真はすべて点線枠のプレースホルダーです。ペットの肖像画という視覚訴求が非常に重要な商材のため、**広告を開始する前に必ず実際の高解像度の作品写真に差し替えてください**。差し替え箇所は `index.html` 内の `class="placeholder-img"` を検索すると全て見つかります。

## 注文管理シート

Googleドライブに「陶雅 注文管理シート」を作成し、共有済みです。注文が入るたびにこちらへ手動で記録してください(フォーム回答と連携した自動反映が必要な場合は別途ご相談ください)。
