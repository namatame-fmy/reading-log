import type { Book } from '@/types/book'

/** 値が Book の形（全プロパティが string）をしているか判定する */
function isBook(value: unknown): value is Book {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'author' in value &&
    typeof value.author === 'string' &&
    'finishedDate' in value &&
    typeof value.finishedDate === 'string' &&
    'review' in value &&
    typeof value.review === 'string'
  )
}

/** localStorage に保存する際のキー */
export const STORAGE_KEY = 'reading-log:books'

/** localStorage から本の一覧を読み込む */
export function loadBooks(): Book[] {
  try {
    const rawBooks = localStorage.getItem(STORAGE_KEY)
    if (!rawBooks) {
      return []
    }
    const parsed: unknown = JSON.parse(rawBooks)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter(isBook)
  } catch (error) {
    console.error('Failed to parse books from localStorage', error)
    return []
  }
}

/** 本の一覧を localStorage に保存する */
export function saveBooks(books: Book[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}
