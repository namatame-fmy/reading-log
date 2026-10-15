import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookForm from '../BookForm.vue'

describe('BookForm', () => {
  it('入力して送信すると入力値で submit を emit する', async () => {
    const wrapper = mount(BookForm)

    await wrapper.find('input[name="title"]').setValue('こころ')
    await wrapper.find('input[name="author"]').setValue('夏目漱石')
    await wrapper.find('input[name="finishedDate"]').setValue('2026-10-01')
    await wrapper.find('textarea[name="review"]').setValue('面白かった')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toEqual([
      [{ title: 'こころ', author: '夏目漱石', finishedDate: '2026-10-01', review: '面白かった' }],
    ])
  })

  it('送信後に入力欄を空に戻す', async () => {
    const wrapper = mount(BookForm)

    await wrapper.find('input[name="title"]').setValue('こころ')
    await wrapper.find('textarea[name="review"]').setValue('面白かった')
    await wrapper.find('form').trigger('submit')

    expect((wrapper.find('input[name="title"]').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('textarea[name="review"]').element as HTMLTextAreaElement).value).toBe('')
  })

  it('タイトルが空（空白のみ含む）のときは emit せず、送信ボタンも無効', async () => {
    const wrapper = mount(BookForm)

    await wrapper.find('input[name="title"]').setValue('   ')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
  })
})
