import { ref, type Ref } from 'vue'
interface useAsyncDataOptions {
  immediate?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default?: any
}
export function useAsyncData<T>(
  fn: () => Promise<T> | undefined,
  options: useAsyncDataOptions = { immediate: false, default: undefined },
) {
  const data: Ref<T | undefined> = ref(options.default)
  const error: Ref<unknown> = ref(null)
  const loading = ref(false)
  const exec: () => Promise<void> = async () => {
    data.value = options.default
    error.value = null
    loading.value = true
    try {
      const res = await fn()
      data.value = res
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }
  if (options.immediate) {
    exec()
  }

  return { exec, data, error, loading }
}
