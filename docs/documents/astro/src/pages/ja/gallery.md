---
title: Gallery
description: Gallery
layout: ../../layouts/MainLayout.astro
---

[Beta](https://d3snr6xc5uvnuy.cloudfront.net/friends-shakehand/gallery?beta)
キャラクターイラストとキャラクターシートを紐づける画面

紐づけは Google Spread Sheet で行う。SpreadSheet は「閲覧者」の権限を「誰でも」に設定しておく必要がある

## アーキテクチャ (データ取得)

![](../../drawio-assets/architechture-gallery.png)

## アーキテクチャ(OGP)

twitter からのアクセスの場合、Gallery は OGP 専用の HTML を Lambda@Edge の機能を使って作成している。

![](../../drawio-assets/architechture-frontend.png)
