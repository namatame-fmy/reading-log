import type { Book } from '@/types/book'

/** localStorage に保存するときのキー */
export const STORAGE_KEY = 'reading-log:books'

/** localStorage から本の一覧を読み込む */
export function loadBooks(): Book[] {
  // TODO: 実装してください
  // ヒント: 未保存のときや JSON が壊れているときは空配列を返すと扱いやすい
  return []
}

/** 本の一覧を localStorage に保存する */
export function saveBooks(_books: Book[]): void {
  // TODO: 実装してください
}
