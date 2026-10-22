import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { Book, BookInput } from '@/types/book'
import { loadBooks, saveBooks } from '@/utils/bookStorage'
import { useBooks } from '../useBooks'

// localStorage への読み書きはモックに差し替え、useBooks のロジックだけを検証する
vi.mock('@/utils/bookStorage', () => ({
  loadBooks: vi.fn(),
  saveBooks: vi.fn(),
}))

const input: BookInput = {
  title: 'こころ',
  author: '夏目漱石',
  finishedDate: '2026-10-01',
  review: '面白かった',
}

const existingBooks: Book[] = [
  { id: 'a', title: '羅生門', author: '芥川龍之介', finishedDate: '2026-09-01', review: '' },
  { id: 'b', title: '坊っちゃん', author: '夏目漱石', finishedDate: '2026-09-15', review: '' },
]

describe('useBooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(loadBooks).mockReturnValue([])
  })

  it('初期状態で loadBooks の結果が books に入る', () => {
    vi.mocked(loadBooks).mockReturnValue(structuredClone(existingBooks))
    const { books } = useBooks()

    expect(books.value).toEqual(existingBooks)
  })

  describe('addBook', () => {
    it('本を追加すると books の件数が1増える', () => {
      const { books, addBook } = useBooks()

      addBook(input)

      expect(books.value).toHaveLength(1)
      expect(books.value[0]).toMatchObject(input)
    })

    it('追加した本に ID が採番される', () => {
      const { books, addBook } = useBooks()

      addBook(input)
      addBook(input)

      const [first, second] = books.value
      expect(first?.id).toEqual(expect.any(String))
      expect(first?.id).not.toBe('')
      expect(first?.id).not.toBe(second?.id)
    })

    it('保存に成功すると true を返す', () => {
      const { addBook } = useBooks()

      expect(addBook(input)).toBe(true)
    })

    it('追加後に saveBooks が呼ばれる', () => {
      const { books, addBook } = useBooks()

      addBook(input)

      expect(saveBooks).toHaveBeenCalledTimes(1)
      expect(saveBooks).toHaveBeenCalledWith(books.value)
    })
  })

  describe('removeBook', () => {
    beforeEach(() => {
      vi.mocked(loadBooks).mockReturnValue(structuredClone(existingBooks))
    })

    it('指定した ID の本だけが削除される', () => {
      const { books, removeBook } = useBooks()

      removeBook('a')

      expect(books.value).toEqual([existingBooks[1]])
    })

    it('存在しない ID を指定しても books は変わらない', () => {
      const { books, removeBook } = useBooks()

      removeBook('not-exist')

      expect(books.value).toEqual(existingBooks)
    })

    it('削除後に saveBooks が呼ばれる', () => {
      const { books, removeBook } = useBooks()

      removeBook('a')

      expect(saveBooks).toHaveBeenCalledTimes(1)
      expect(saveBooks).toHaveBeenCalledWith(books.value)
    })

    it('存在しない ID を指定したときは、変更のない一覧がそのまま保存される', () => {
      const { removeBook } = useBooks()

      removeBook('not-exist')

      expect(saveBooks).toHaveBeenCalledTimes(1)
      expect(saveBooks).toHaveBeenCalledWith(existingBooks)
    })
  })

  describe('保存に失敗したとき', () => {
    beforeEach(() => {
      vi.mocked(loadBooks).mockReturnValue(structuredClone(existingBooks))
      // console.error の出力でテストログが汚れないように抑止する
      vi.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    /** 次の saveBooks 呼び出しだけ、localStorage の容量不足を模した例外を投げる */
    function failNextSave(): void {
      vi.mocked(saveBooks).mockImplementationOnce(() => {
        throw new DOMException('quota exceeded', 'QuotaExceededError')
      })
    }

    it('addBook が失敗すると books は変わらず、エラーメッセージが入る', () => {
      const { books, addBook, errorMessage } = useBooks()
      failNextSave()

      const result = addBook(input)

      expect(result).toBe(false)
      expect(books.value).toEqual(existingBooks)
      expect(errorMessage.value).toBe('本の追加に失敗しました')
    })

    it('removeBook が失敗すると books は変わらず、エラーメッセージが入る', () => {
      const { books, removeBook, errorMessage } = useBooks()
      failNextSave()

      removeBook('a')

      expect(books.value).toEqual(existingBooks)
      expect(errorMessage.value).toBe('本の削除に失敗しました')
    })

    it('失敗後に保存が成功すると、エラーメッセージが消える', () => {
      const { addBook, errorMessage } = useBooks()
      failNextSave()
      addBook(input)

      addBook(input)

      expect(errorMessage.value).toBeNull()
    })
  })
})
