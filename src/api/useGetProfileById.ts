import axios from 'axios'
import type { Profile } from '@/types/profile'
import { toValue, type Ref } from 'vue'
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
})

export async function useGetProfileById(id: Ref<string>) {
  const res = await instance.get<Profile>('/' + toValue(id))
  return res.data
}
