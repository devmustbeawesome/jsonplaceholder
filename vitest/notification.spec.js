import { describe, expect, test } from 'vitest'
import MyNotification from '../src/components/MyNotification.vue'
import { mount } from '@vue/test-utils'
describe('MyNotification.vue', () => {
  test('mount', async () => {
    const wrapper = mount(MyNotification, {
      props: { type: 'error' },
      slots: { default: '<span style="color: white" id="test-text">текст уведомления</span>' },
    })
    expect(wrapper.find('#test-text').text()).toBe('текст уведомления')
    expect(wrapper.classes()).toContain('notification--error')
    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.classes()).toContain('notification--warning')
    await wrapper.setProps({ type: 'success' })
    expect(wrapper.classes()).toContain('notification--success')
  })
  test('click', async () => {
    const wrapper = mount(MyNotification, {
      props: { type: 'error' },
      slots: { default: '<span style="color: white">текст уведомления</span>' },
    })
    const button = wrapper.find('.notification__hide-button')
    await button.trigger('click')
    console.dir(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('hide-notification')
  })
})
