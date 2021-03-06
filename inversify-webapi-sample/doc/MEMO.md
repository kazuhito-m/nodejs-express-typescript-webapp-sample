# 開発のためのメモ

# express 関係入門記事

- https://qiita.com/nkjm/items/723990c518acfee6e473
- https://expressjs.com/ja/guide/routing.html
- https://expressjs.com/ja/guide/error-handling.html
  - エラー処理…だけど、結局「Try 書け」いか言ってない気がする
- https://node-postgres.com/guides/async-express
  - async/await の例…なんだけど、なんかこうなってない気がする。

## bodyParser 関連

- https://qiita.com/ktanaka117/items/596febd96a63ae1431f8
- https://gist.github.com/romelgomez/3c1776fab4192c7687883c1a2b972c8c
  - ぐぐって見つけた例…なのだけど「これが最適化」は不明

# TypeScript で〜な記事

- https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
  - express かつ TypeScript…なんだけど、イマイチピンとこない

# node.js から Postgres 扱う系

- https://www.kumapress.com/?p=4189
- https://blog.deezus.net/archives/259
- https://symfoware.blog.fc2.com/blog-entry-2114.html
- https://qiita.com/moroken1224/items/cf6fffd48bbc7f27947c
  - pg 自体を使うのと pool を引き出して使うの、一緒？

# ORM の比較記事

- http://www.kuma-de.com/blog/2014-12-19/6862

# HTTP に関する定石

- https://qiita.com/uenosy/items/ba9dbc70781bddc4a491

# DI 関係

## TypeScript & Inversify の入門

- https://qiita.com/BooookStore/items/2ce9aed00a3e9bf383b0
- https://hajipy.net/2018/08/inversify-basic/
- https://qiita.com/Quramy/items/e65ee58cf1fba589c81b

## inversify-express-utils 関連

- https://github.com/inversify/inversify-express-utils

## Awilix

こっちのほうが良さそうなんだけど、例が少ないなって。

- https://qiita.com/sugiyasu-qr/items/3679d5041ee547ca28eb
- https://github.com/talyssonoc/awilix-express
  - これを「TypeScript でできたら」超良さそう…なんだけどなぁ

# テスト

## supertest(express 前提の疑似 E2E テストプロダクト)

- https://qiita.com/mikakane/items/312f901850cc33b3b07b
- https://blog.ishkawa.org/2013/03/31/supertest/
- https://takatamajp.wordpress.com/2012/11/18/unit_testing_for_express_using_supertest/
- http://jestersimpps.github.io/automated-e2e-api-testing-documentation-for-node-js/

# 問題

## WebPack の minify で「クラス名が消える」ことの影響と無効化方法

DI の Inversify ならびに inversify-express-utils は「自動で DI コンテナへの登録」を実現するため、「クラス名を手がかり」に DI 登録を行う。(特に utils のコントローラは)

しかし、webpack が production モードの場合、自動的に「minify」が効き、その設定が「クラス名を消す(別の名前、例えば "e"や"o"など)」挙動をするため、期待した動きにならない。

WebPack の minify は `Terser` というのを内部で使っており、設定するには `TerserPlugin` の設定を、webpack.config.js に書かなくてはならない。

※設定は以下を参照

- https://webpack.js.org/configuration/optimization/#optimization-minimize
- https://webpack.js.org/plugins/terser-webpack-plugin/

上記から、

```javascript
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true
        }
      })
    ]
  }
};
```

あたりを設定する必要が在る。(要検証)

# その他・一般ライブラリ

## TsLint

- https://palantir.github.io/tslint/rules/
- http://neos21.hatenablog.com/entry/2017/10/25/080000

### VSCodeでtslintとフォーマッタなどを連携する方法

うまいこと設定できてない。ググった結果くらいを列挙しておく。

- http://www.atmarkit.co.jp/ait/articles/1807/27/news035.html
- https://github.com/Microsoft/typescript-tslint-plugin#configuration-options
- https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin


## 日付/moment関係
- https://qiita.com/taizo/items/3a5505308ca2e303c099
