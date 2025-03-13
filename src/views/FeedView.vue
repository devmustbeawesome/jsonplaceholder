<script setup lang="ts">
import LoaderIcon from '@/components/__icons/LoaderIcon.vue'
import { useGetPostListByPage } from '@/api/useGetPostListByPage'
import { useAsyncData } from '@/composables/useAsyncData'
import { reactive, ref } from 'vue'
import PostList from '@/components/PostList.vue'
import vScrolledToBottom from '@/directives/vScrolledToBottom'
import type { Post } from '@/types/post'
import type { Profile } from '@/types/profile'
const postList = reactive<({ profile: Profile | undefined } & Post)[]>([])
const page = ref(0)
const {
  data: postListdata,
  error: getPostListError,
  loading: getPostListLoading,
  exec: getPostList,
} = useAsyncData<{ posts: ({ profile: Profile | undefined } & Post)[]; lastPage: number }>(
  useGetPostListByPage.bind(this, page),
  {
    immediate: false,
    default: { posts: [], lastPage: Infinity },
  },
)
const loadMore: () => Promise<void> = async () => {
  page.value++
  try {
    await getPostList()
  } catch (error) {
    page.value--
    throw error
  }
  if (postListdata.value) postList.push(...postListdata.value?.posts)
}
// onMounted(() => {
//   loadMore()
// })
</script>
<template>
  <div
    class="feed container"
    v-scrolled-to-bottom="{
      fn: loadMore,
      disabled:
        (postListdata?.lastPage && postListdata.lastPage <= page) ||
        getPostListLoading ||
        getPostListError,
    }"
  >
    <PostList :postList="postList"></PostList>
    <div v-if="getPostListError" style="text-align: center">
      <p>Ошибка загрузки постов {{ getPostListError }}</p>
      <button @click="loadMore">try again</button>
    </div>
    <LoaderIcon v-if="getPostListLoading" />
  </div>
</template>
<style></style>
