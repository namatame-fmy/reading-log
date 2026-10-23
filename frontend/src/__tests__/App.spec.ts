import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { loadBooks, saveBooks } from '@/utils/bookStorage'
import App from '../App.vue'

// localStorage への読み書きはモックに差し替え、画面の振る舞いだけを検証する
vi.mock('@/utils/bookStorage', () => ({
  loadBooks: vi.fn(),
  saveBooks: vi.fn(),
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(loadBooks).mockReturnValue([])
    // console.error の出力でテストログが汚れないように抑止する
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('追加に成功するとフォームが空になり、エラーは表示されない', async () => {
    const wrapper = mount(App)

    await wrapper.find('input[name="title"]').setValue('こころ')
    await wrapper.find('form').trigger('submit')

    expect((wrapper.find('input[name="title"]').element as HTMLInputElement).value).toBe('')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('追加に失敗するとエラーを表示し、フォームの入力を残す', async () => {
    vi.mocked(saveBooks).mockImplementationOnce(() => {
      throw new DOMException('quota exceeded', 'QuotaExceededError')
    })
    const wrapper = mount(App)

    await wrapper.find('input[name="title"]').setValue('こころ')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.find('[role="alert"]').text()).toBe('本の追加に失敗しました')
    expect((wrapper.find('input[name="title"]').element as HTMLInputElement).value).toBe('こころ')
  })
})
