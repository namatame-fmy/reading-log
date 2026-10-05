import { describe, it } from 'vitest'

// ロジック実装後に it.todo を it に変えて中身を書く
describe('useBooks', () => {
  describe('addBook', () => {
    it.todo('本を追加すると books の件数が1増える')
    it.todo('追加した本に ID が採番される')
    it.todo('追加後に saveBooks が呼ばれる')
  })

  describe('removeBook', () => {
    it.todo('指定した ID の本だけが削除される')
    it.todo('存在しない ID を指定しても books は変わらない')
    it.todo('削除後に saveBooks が呼ばれる')
  })
})
