import axios from 'axios'
import type { Profile } from '@/types/profile'
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
})

export async function useGetProfileList() {
  const res = await instance.get<Profile[]>('/')
  return res.data
}
