/** 保存される本のデータ */
export interface Book {
  /** 一意な ID（crypto.randomUUID() を想定） */
  id: string
  /** タイトル */
  title: string
  /** 著者 */
  author: string
  /** 読了日（'YYYY-MM-DD' 形式。input[type=date] の値をそのまま保持） */
  finishedDate: string
  /** 感想 */
  review: string
}

/** フォームの入力値（ID は追加時に採番するので含まない） */
export type BookInput = Omit<Book, 'id'>
