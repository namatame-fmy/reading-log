# reading-log フロントエンド（Vue）

アプリ全体の概要と Claude との役割分担は、ルートの `CLAUDE.md` を参照。

## 技術スタック

- Node.js 24 系（`.nvmrc` で指定。`package.json` の `engines` は `^22.18.0 || >=24.12.0`）
- Vue 3（Composition API、`<script setup>` を使う）
- TypeScript
- Vite
- Vitest（ユニットテスト）
- ESLint / Prettier

## よく使うコマンド

すべて `frontend/` で実行する。

- 開発サーバー起動: `npm run dev`
- テスト: `npm run test:unit`
- 型チェック: `npm run type-check`
- Lint: `npm run lint`

## コーディング規約

- Options API は使わない
- 型は `any` を使わず、明示的に定義する
- 型定義は `src/types/` にまとめる
- コンポーネント名は PascalCase

## 変更後の確認

- フロントエンドを変更したら、必ず `npm run type-check` と `npm run test:unit` を実行して結果を報告する
