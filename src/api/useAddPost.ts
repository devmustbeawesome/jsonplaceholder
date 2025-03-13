import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})

export async function useAddPost(post: { title: string; body: string; userId: string }) {
  const postData = await instance.post<unknown>('posts/', post, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return postData
}
