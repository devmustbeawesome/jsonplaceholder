import axios from 'axios'
import type { Post } from '@/types/post'
import { toValue, type Ref } from 'vue'
import type { Profile } from '@/types/profile'
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})
const _limit = 5

export async function useGetPostListByPage(page: Ref<number>) {
  const profileList = (await instance.get<Profile[]>('users/')).data.reduce(
    (map, profile) => map.set(profile.id, profile),
    new Map<number, Profile>(),
  )
  const res = await instance.get<Post[]>('posts/', {
    params: {
      _page: toValue(page) || 1,
      _limit,
    },
  })
  const posts = res.data.map((post) => ({
    ...post,
    profile: profileList.get(post.userId),
  }))
  return { posts: posts, lastPage: Math.ceil(res.headers['x-total-count'] / _limit) || 0 }
}
