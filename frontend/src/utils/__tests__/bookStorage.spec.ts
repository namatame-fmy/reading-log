import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { Book } from '@/types/book'
import { loadBooks, saveBooks, STORAGE_KEY } from '../bookStorage'

const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'こころ',
    author: '夏目漱石',
    finishedDate: '2026-10-01',
    review: '面白かった',
  },
  { id: '2', title: '羅生門', author: '芥川龍之介', finishedDate: '2026-10-05', review: '' },
]

describe('bookStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('saveBooks で保存した一覧を loadBooks で同じ内容として読み込める', () => {
    saveBooks(sampleBooks)

    expect(loadBooks()).toEqual(sampleBooks)
  })

  it('何も保存されていないとき loadBooks は空配列を返す', () => {
    expect(loadBooks()).toEqual([])
  })

  it('保存データが壊れた JSON のとき loadBooks は空配列を返す', () => {
    // console.error の出力でテストログが汚れないように抑止する
    vi.spyOn(console, 'error').mockImplementation(() => {})
    localStorage.setItem(STORAGE_KEY, '{壊れたJSON')

    expect(loadBooks()).toEqual([])
  })

  it('保存データが配列でないとき loadBooks は空配列を返す', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: '1' }))

    expect(loadBooks()).toEqual([])
  })

  it('Book の形をしていない要素は除外して読み込む', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([sampleBooks[0], { id: '2' }, null, 'abc']))

    expect(loadBooks()).toEqual([sampleBooks[0]])
  })

  it('プロパティの型が string でない要素は除外して読み込む', () => {
    const invalidBooks = [
      { ...sampleBooks[1], id: 2 },
      { ...sampleBooks[1], title: 123 },
      { ...sampleBooks[1], author: null },
      { ...sampleBooks[1], finishedDate: true },
      { ...sampleBooks[1], review: undefined },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify([sampleBooks[0], ...invalidBooks]))

    expect(loadBooks()).toEqual([sampleBooks[0]])
  })
})
