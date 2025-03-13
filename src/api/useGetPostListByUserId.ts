import axios from 'axios'
import type { Post } from '@/types/post'
import { toValue, type Ref } from 'vue'
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
})

export async function useGetPostListByUserId(id: Ref<string>) {
  const res = await instance.get<Post[]>('/' + toValue(id) + '/posts')
  const posts = res.data.map((post) => ({
    ...post,
    profile: undefined,
  }))
  return posts
}
