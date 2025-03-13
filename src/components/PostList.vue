<script setup lang="ts">
import type { Post } from '@/types/post'
import type { Profile } from '@/types/profile'
import { computed } from 'vue'

const props = defineProps<{
  postList?: ({ profile: Profile | undefined } & Post)[]
}>()
const postList = computed(() => props.postList)
</script>
<template>
  <ul class="post-list">
    <li class="post-list__item post" v-for="post in postList" :key="post.id">
      <div class="post__header">
        <h3 class="post__title">{{ post.title }}</h3>
        <RouterLink
          class="post__profile-link"
          v-if="post.profile"
          :to="{ name: 'profile', params: { profile_id: post.profile.id } }"
          style="float: right"
          >{{ post.profile.name }}</RouterLink
        >
      </div>
      <div class="post__body">
        <p class="post__body">{{ post.body }}</p>
      </div>

      <div class="post__footer">
        <RouterLink
          class="post__link"
          :to="{ name: 'post', params: { post_id: post.id } }"
          style="float: right"
          >comments</RouterLink
        >
      </div>
    </li>
  </ul>
</template>
<style>
.post-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.post-list__item {
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
}
.post-list__item:hover {
  border-color: var(--color-border-hover);
  background-color: var(--color-background-mute);
}
.post {
  display: flex;
  background-color: var(--color-background-soft);
  padding: 1rem;
  text-decoration: none;
}
.post__body {
  color: var(--color-text);
}
.post__title {
  color: var(--color-heading);
}

.post__profile-link {
  color: var(--color-heading);
  text-decoration: none;
}
.post__profile-link:hover {
  text-decoration: underline;
}
.post {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.post__header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
}
.post__body {
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem auto;
}
</style>
