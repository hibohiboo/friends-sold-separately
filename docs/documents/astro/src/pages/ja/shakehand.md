---
title: ぎゅっとはんど
description: ぎゅっとはんど
layout: ../../layouts/MainLayout.astro
---

登録者のプロフィールを一覧で確認し、共感するものに握手をするページ

## アーキテクチャ

![](../../drawio-assets/architechture-shakehand.png)

## 画面機能

- タグ種別による絞り込み
- 名前クリック時に「[僕の私の説明書 個人ページ](../friendProfile)」へと遷移
- タグ一覧
  - 握手アイコンクリック時に「favorite」を登録

## 画面部品

- 絞り込みアイコン一覧
  - 固定値

### ユーザリスト

| 項目        | 取得元             |
| ----------- | ------------------ |
| ユーザ名    | /gyutto-hand-user  |
| タグ        | /gyutto-hand-user  |
| タグ（握手) | ローカルストレージ |

## 参照 API

- ユーザ取得 API GET `/gyutto-hand-user`
- 握手情報登録 API PUT `/gyutto-hand-favorite`
