import axios from 'axios'
import { toValue, type Ref } from 'vue'
import type { Profile } from '@/types/profile'
import type { Post } from '@/types/post'
import type { Comment } from '@/types/comment'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})

export async function useGetPostById(post_id: Ref<number>) {
  const postData = await instance.get<Post>('posts/' + toValue(post_id))
  const profileData = await instance.get<Profile>('users/' + postData.data.userId)
  const commentsData = await instance.get<Comment[]>('posts/' + toValue(post_id) + '/comments')
  return { post: postData.data, profile: profileData.data, comments: commentsData.data }
}
