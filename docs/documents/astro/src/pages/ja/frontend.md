---
title: フロントエンド
description: フロントエンド
layout: ../../layouts/MainLayout.astro
---

フロントエンドの構成について

## アーキテクチャ

![](../../drawio-assets/architechture-frontend.png)

AWS S3 にファイルを配置し、AWS Cloud Front で配信している。

ページは React-dom-router を使った SPA で構成されている。

SPA 用のパスの解決に Cloud Front Function を使い、で下記条件のものは`friends-shakehand/index.html`を返すようにしている。  
friends-shakehand/ で開始されている、かつ、拡張子がついていないもの。

例)

- `/friends-shakehand/profile` -> `friends-shakehand/index.html` を返す
- `/friends-shakehand/style.css` -> `friends-shakehand/style.css` を返す

## SPA

下記のライブラリを使用

| 種別         | ライブラリ名        |
| ------------ | ------------------- |
| Framework    | React               |
| ルーティング | React-dom-router    |
| 状態管理     | Redux-tool-Kit      |
| API 呼び出し | RTKQuery            |
| CSSFramework | Bulma               |
| bulma-theme  | /darkly/bulmaswatch |
