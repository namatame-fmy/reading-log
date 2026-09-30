# 読書記録アプリ（reading-log）

## 概要

本のタイトル・著者・読了日・感想を記録するアプリ。
一覧表示、検索、登録、編集、削除ができる。
データはひとまず localStorage に保存する。

## 技術スタック

- Vue 3（Composition API、`<script setup>` を使う）
- TypeScript
- Vite
- Vitest（ユニットテスト）
- ESLint / Prettier

## よく使うコマンド

- 開発サーバー起動: `npm run dev`
- テスト: `npm run test:unit`
- 型チェック: `npm run type-check`
- Lint: `npm run lint`

## コーディング規約

- Options API は使わない
- 型は `any` を使わず、明示的に定義する
- 型定義は `src/types/` にまとめる
- コンポーネント名は PascalCase

## Claude との役割分担

- 環境構築、テスト作成、コードレビュー、動作確認は任せる
- ビジネスロジック（データの追加・更新・検索などの処理）は私が書く。
  求められない限り、実装ではなく方針やヒントの提案にとどめる
- 変更後は必ず型チェックとテストを実行して結果を報告する
- 回答やコード内のコメントは日本語で書く
