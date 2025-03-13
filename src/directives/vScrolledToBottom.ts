/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DirectiveBinding } from 'vue'
type ScrolledToBottomBind = {
  fn: () => Promise<void>
  disabled: boolean
}
let scrollHandler: { (): Promise<void> }

const name = 'scrolled-to-bottom'
const mounted = (el: HTMLElement, binding: DirectiveBinding<ScrolledToBottomBind>) => {
  scrollHandler = async function scrollHandler() {
    while (el.getBoundingClientRect().bottom - 100 < document.documentElement.clientHeight) {
      try {
        await binding.value.fn()
      } catch (error) {
        document.removeEventListener('scroll', scrollHandler)
        console.log(error)
        break
      }
    }
  }
  document.addEventListener('scroll', scrollHandler)
  scrollHandler()
}

const updated = (el: HTMLElement, binding: DirectiveBinding) => {
  if (binding.oldValue.disabled != binding.value.disabled && binding.value.disabled)
    document.removeEventListener('scroll', scrollHandler)
  else {
    document.addEventListener('scroll', scrollHandler)
    // scrollHandler()
  }
}
const unmounted = (el: HTMLElement, binding: DirectiveBinding<ScrolledToBottomBind>) => {
  document.removeEventListener('scroll', scrollHandler)
}
const directive = {
  name,
  mounted,
  updated,
  unmounted,
}

export default directive
