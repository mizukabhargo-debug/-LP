/**
 * 陶雅LP 設定ファイル
 * ここに書かれている値だけを編集すれば、サイト全体(GA4計測・Google広告コンバージョン・
 * Stripe決済リンク・注文フォームURL)が反映されます。他のJS/HTMLファイルは編集不要です。
 *
 * 「要設定」と書かれている項目は、公開・広告配信前に必ず実際の値に置き換えてください。
 */
window.TOGA_CONFIG = {
  // GA4 測定ID (例: G-ABC1234567)
  // 取得方法: Google アナリティクス管理画面 > プロパティ設定 > データストリーム > ウェブ
  GA4_MEASUREMENT_ID: 'G-VP9KR657KK',

  // Google広告 コンバージョンID (例: AW-123456789)
  // 取得方法: Google広告管理画面 > ツールと設定 > コンバージョン > 新しいコンバージョン
 GOOGLE_ADS_CONVERSION_ID: 'AW-18468890279',
CONVERSION_LABEL_SQUARE: 'eJTJCNuI4oEdEKfN0-ZE', // 正方形 ¥77,000 税込 購入時
CONVERSION_LABEL_RECT: 'aUdpCN6I4oEdEKfN0-ZE',   // 長方形 ¥143,000 税込 購入時

  // Stripe Payment Link(Stripeダッシュボード > 決済リンク で作成)
  // 作成手順は README.md の「Stripe決済リンクの作成」を参照
  STRIPE_LINK_SQUARE: 'https://buy.stripe.com/aFa7sE1IG5DebxAemG6J201', // 正方形 ¥77,000
  STRIPE_LINK_RECT: 'https://buy.stripe.com/28EdR21IG9TufNQdiC6J200',   // 長方形 ¥143,000

  // 決済完了後のお写真・ご要望提出フォーム
  ORDER_FORM_URL: 'https://forms.gle/ZQbJrZpRBnLcM4pb7',

  // お問い合わせ先メールアドレス
  CONTACT_EMAIL: 'info@bhargo.co.jp',

  // 価格(円)。特定商取引法表記・LP表示に使用。税抜価格は本体からの逆算(税込÷1.1)。
  PRICE: {
    SQUARE_TAX_INCLUDED: 77000,
    SQUARE_TAX_EXCLUDED: 70000,
    RECT_TAX_INCLUDED: 143000,
    RECT_TAX_EXCLUDED: 130000,
  },
};
