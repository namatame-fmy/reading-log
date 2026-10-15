import { describe, it } from 'vitest'

// ロジック実装後に it.todo を it に変えて中身を書く
describe('bookStorage', () => {
  it.todo('saveBooks で保存した一覧を loadBooks で同じ内容として読み込める')
  it.todo('何も保存されていないとき loadBooks は空配列を返す')
  it.todo('保存データが壊れた JSON のとき loadBooks は空配列を返す')
})
