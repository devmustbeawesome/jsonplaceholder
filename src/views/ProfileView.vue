<script setup lang="ts">
import LoaderIcon from '@/components/__icons/LoaderIcon.vue'
import PersonIcon from '@/components/__icons/PersonIcon.vue'
import PostList from '@/components/PostList.vue'
import { useGetPostListByUserId } from '@/api/useGetPostListByUserId'
import { useGetProfileById } from '@/api/useGetProfileById'
import { useAsyncData } from '@/composables/useAsyncData'
import { computed, watch } from 'vue'

const props = defineProps<{ profile_id: string }>()
const profileId = computed(() => props.profile_id)
const {
  data: profile,
  error: getProfileListError,
  loading: getProfileListLoading,
  exec: getProfile,
} = useAsyncData(() => useGetProfileById(profileId), { immediate: true })
const {
  data: postList,
  error: getPostListError,
  loading: getPostListLoading,
  exec: getPostList,
} = useAsyncData(() => useGetPostListByUserId(profileId), { immediate: true, default: [] })

watch(
  () => props.profile_id,
  () => {
    getProfile()
    getPostList()
  },
)
</script>

<template>
  <div class="profile" v-if="profile">
    <PersonIcon class="profile-avatar" />
    <div class="profile-info">
      <h1 class="profile-name">{{ profile.name }} ({{ profile.username }})</h1>
      <div class="profile-info__group">
        <fieldset>
          <legend>Контактная информация</legend>
          <p>{{ profile.email }}</p>
          <p>{{ profile.phone }}</p>
          <p>{{ profile.website }}</p>
        </fieldset>
        <fieldset>
          <legend>Компания</legend>
          <p>{{ profile.company.name }}</p>
          <p>{{ profile.company.catchPhrase }}</p>
          <p>{{ profile.company.bs }}</p>
        </fieldset>
        <fieldset>
          <legend>Адрес</legend>
          <p>{{ profile.address.geo }}</p>
          <p>{{ profile.address.city }}</p>
          <p>{{ profile.address.street }}</p>
          <p>{{ profile.address.suite }}</p>
          <p>{{ profile.address.zipcode }}</p>
        </fieldset>
      </div>
    </div>
  </div>
  <div v-if="getProfileListError">
    {{ getProfileListError }}
  </div>
  <LoaderIcon v-if="getProfileListLoading" />
  <PostList :postList="postList"></PostList>
  <p v-if="getPostListError">ошибка загрузки постов {{ getPostListError }}</p>
  <LoaderIcon v-if="getPostListLoading" />
</template>

<style>
.profile-avatar {
  height: 150px;
  width: 150px;
}
.profile {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.profile-info__group {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
}
.post-list {
  list-style: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.post-list__item {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
}
.post-title {
  color: var(--color-heading);
}
</style>
