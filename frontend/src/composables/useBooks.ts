import { ref } from 'vue'
import type { Book, BookInput } from '@/types/book'

/** 本の一覧と、それを操作する関数をまとめた composable */
export function useBooks() {
  const books = ref<Book[]>([])

  /** 本を追加する */
  function addBook(_input: BookInput): void {
    // TODO: 実装してください
    // ヒント: ID を採番 → books に追加 → 保存
  }

  /** 本を削除する */
  function removeBook(_id: string): void {
    // TODO: 実装してください
  }

  return { books, addBook, removeBook }
}
