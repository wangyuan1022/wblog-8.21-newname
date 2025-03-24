WBlog
=======
[![Build Status](https://travis-ci.org/windy/wblog.svg?branch=master)](https://travis-ci.org/windy/wblog)
[![Maintainability](https://api.codeclimate.com/v1/badges/545d8372a9dda70b77fe/maintainability)](https://codeclimate.com/github/windy/wblog/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/545d8372a9dda70b77fe/test_coverage)](https://codeclimate.com/github/windy/wblog/test_coverage)

Ruby on Rails 7.xで構築された、待望のオープンソースブログシステム。

WBlogはモバイルファーストで構築されたオープンソースブログで、MITライセンスに基づいており、無料で使用できます！

~~最新情報: WBlogは現在Ruby on Rails 6.1を使用しています。~~

最新情報: WBlogはwebpackerからesbuildとsassを使用したjsbundling & cssbundlingに更新されました。

最新情報: WBlogは現在Ruby on Rails 7.1を使用しています。

[中文说明文档](/README.zh-CN.md)

特徴：

* モダンでクリーンな閲覧体験
* Markdownをサポートし、美しくフォーマットされた記事を提供
* モバイルファースト、iPhone、iPad、iMac用のレスポンシブページ
* 独立したコメントシステム、購読システム、画像管理システム

実際の例は私自身のブログ（中国語）から：<https://yafeilee.com>

いくつかの[スクリーンショット](#screenshots)

### システム要件

* Ruby（>= 3.1.2）
* Postgresql（>= 9.x）
* Nginx（>= 1.4）
* node（>= 1.18）

### 機能

* レスポンシブデザイン、iPhone、iPad、ノートブック、PCなどすべてのデバイスをサポート
* QRコード、いいねボタンにより記事を友達と簡単に共有
* 独立したコメントシステム、購読システムを所有
* Markdownサポート、コードハイライト機能は、あなたのようなプログラマーに特に便利
* パーソナライズや商業化も可能、すべてはあなた次第

### 目標

世界最高のRuby on Railsブログシステムにすること。

### 開発モードで実行する

WBlogはLinuxまたはOSXで実行する必要があります。ここではOS X 10を使用していると仮定します。

通常のRuby on Railsプロジェクトと同様に実行できます：

0. 依存関係の確認

  ```shell
  ruby -v
  # 3.1.2
  postgres  --version
  # 9.x.x
  npm -v
  # 1.18.x
  ```

1. クローンする

  `git clone git@github.com:windy/wblog.git`

  `cd wblog`

2. 依存関係のインストールと設定

  ```shell
  # Railsの依存関係をインストール
  gem install bundler
  bundle install
  # Node依存関係をインストール
  npm install yarn -g
  yarn install
  # プロジェクト設定ファイルをコピーして更新
  cp config/application.yml.example config/application.yml
  cp config/database.yml.example config/database.yml
  ```

  必要に応じて`application.yml`と`database.yml`の内容を更新してから、セットアップを実行します：

  ```shell
  bin/setup
  ```

3. 起動する

  一つのコマンドで：

  ```shell
  bin/dev
  ```

  以上です。

  または複数のターミナルを使用：

  ```shell
  # rails
  bin/rails s
  ```

  ```shell
  # jsコンパイル
  bin/yarn build --watch
  ```

  ```shell
  # cssコンパイル
  bin/yarn build:css --watch
  ```

  ブラウザで`http://localhost:3000`を開きます。

  エラーが発生した場合は、データベースのユーザー名とパスワード（デフォルトはadmin/admin）を確認してください。

4. 最初のブログを投稿する

  http://localhost:3000/admin にアクセスし、`db/seeds.rb`で設定したユーザー名とパスワードを入力します。
  その後、新しい記事を投稿します。

以上です。

### デプロイメント

WBlogは自動デプロイメントツールとして`mina`を使用し、Rackコンテナとして`puma`を使用しています。

WBlogはリバースプロキシサーバーとして`nginx`を推奨しています。

これにより非常に高速に動作します。

Ruby on Railsプロジェクトのデプロイメントは別のトピックであり、ここでは詳しく説明しません。

詳細についてはWBlog wikiを参照してください：[WBlog の発布流程(現在中国語のみ)](https://github.com/windy/wblog/wiki)

### 技術スタック

* Ruby on Rails 7.1
* Ruby 3.1.2
* Turbo
* Bootstrap 4
* mina
* slim
* puma
* Postgresql

## 関連オープンソースブログシステム

* writings.io（Ruby on Rails 4.0.2）：マルチユーザーブログシステム <https://github.com/chloerei/writings>
* jekyll（Ruby Gem、Markdown）：静的ブログシステム <http://jekyllrb.com/>
* octopress（Github Pages）：<http://octopress.org/>
* middleman（Ruby Gem）：もう一つの静的ブログシステム <https://github.com/middleman/middleman>
* robbin_site（Padrino）：<https://github.com/robbin/robbin_site>

## ライセンス

MIT。

### スクリーンショット

ホームページ：

![screenshot home](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/home.png)

モバイル用ホームページ：

![screenshot home small](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/home-small.png)

モバイル用ホームページのホバー状態：

![screenshot home hover](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/home-small-hover.png)

ブログ詳細ページ：

![screenshot post](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/post.png)

ブログ詳細ページのホバー状態：

![screenshot post hover](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/post-hover.png)

管理者ログインページ：

![screenshot admin](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/admin-login.png)

管理者ダッシュボードページ：

![screenshot admin](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/admin-dashboard.png)

管理者ブログ新規作成ページ：

![screenshot admin](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/admin-post.png)

管理者ブログ管理ページ：

![screenshot admin](https://github.com/windy/wblog/raw/master/doc/wblog_s_en/admin-posts.png)