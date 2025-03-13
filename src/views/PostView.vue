<script setup lang="ts">
import LoaderIcon from '@/components/__icons/LoaderIcon.vue'
import PersonIcon from '@/components/__icons/PersonIcon.vue'
import { useGetPostById } from '@/api/useGetPostById'
import { useAsyncData } from '@/composables/useAsyncData'
import { computed, watch } from 'vue'

const props = defineProps<{ post_id: string }>()
const postId = computed(() => +props.post_id)
const {
  data: postData,
  error: getDataError,
  loading: getPostLoading,
  exec: getPost,
} = useAsyncData(() => useGetPostById(postId), { immediate: true })

watch(
  () => props.post_id,
  () => {
    getPost()
  },
)
</script>

<template>
  <div class="container">
    <div class="post" v-if="postData?.post">
      <h1 class="post__title">{{ postData.post.title }}</h1>
      <p class="post__body">{{ postData.post.body }}</p>
      <RouterLink
        :to="{ name: 'profile', params: { profile_id: postData.profile.id } }"
        class="post__autor"
      >
        @{{ postData.profile.username }}
      </RouterLink>
    </div>
    <ul class="comment-list" v-if="postData?.comments">
      <li
        v-for="comment in postData.comments"
        :key="comment.postId + '_' + comment.id"
        class="commment-list__item comment"
      >
        <div class="comment__autor">
          <PersonIcon /><a :href="'mailto:' + comment.email">{{ comment.email }}</a>
        </div>
        <h3 class="comment__name">{{ comment.name }}</h3>
        <p>{{ comment.body }}</p>
      </li>
    </ul>
    <LoaderIcon v-if="getPostLoading" />
    <p v-if="getDataError">ошибка загрузки поста {{ getDataError }}</p>
  </div>
  <!-- <div v-if="getProfileListError">
    {{ getProfileListError }}
  </div>
  <LoaderIcon v-if="getProfileListLoading" />
  <PostList :postList="postList"></PostList>
  <p v-if="getPostListError">ошибка загрузки постов {{ getPostListError }}</p>
  <LoaderIcon v-if="getPostListLoading" /> -->
</template>

<style>
.post {
  border-bottom: 2px solid var(--color-border-hover);
  margin-bottom: 2rem;
}
.post__title {
  color: var(--color-heading);
}
.post__autor {
  float: right;
  text-decoration: none;
  color: var(--color-heading);
}
.post__autor:hover {
  text-decoration: underline;
}
.comment-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.comment {
  border-bottom: 1px solid var(--color-border);
}
.comment__autor svg {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
.comment__autor a {
  text-decoration: none;
  color: var(--heading-color);
}
.comment__autor:hover a {
  text-decoration: underline;
}
.comment__name {
  color: var(--color-heading);
}
</style>
