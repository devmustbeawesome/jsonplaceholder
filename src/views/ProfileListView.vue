<script setup lang="ts">
import LoaderIcon from '@/components/__icons/LoaderIcon.vue'
import PersonIcon from '@/components/__icons/PersonIcon.vue'
import { useGetProfileList } from '@/api/useGetProfileList'
import { useAsyncData } from '@/composables/useAsyncData'
const {
  data: profileList,
  error: getProfileListError,
  loading: getProfileListLoading,
  // exec: getProfileList,
} = useAsyncData(() => useGetProfileList(), { immediate: true })
</script>
<template>
  <ul class="profile-list" v-if="profileList">
    <li class="profile-list__item" v-for="profile in profileList" :key="profile.id">
      <RouterLink
        :to="{ name: 'profile', params: { profile_id: profile.id } }"
        class="profile"
        activeClass="profile--active"
      >
        <PersonIcon class="profile__avatar" />
        <h2 class="profile__name">{{ profile.name }}</h2>
      </RouterLink>
    </li>
  </ul>
  <div v-if="getProfileListError">
    {{ getProfileListError }}
  </div>
  <LoaderIcon v-if="getProfileListLoading" />
</template>
<style>
.profile-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.profile-list__item {
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
}
.profile-list__item:hover {
  border-color: var(--color-border-hover);
  background-color: var(--color-background-mute);
}
.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--color-background-soft);
  padding: 1rem;
  text-decoration: none;
  color: var(--color-heading);
}

.profile:hover .profile__name {
  text-decoration: underline;
}
.profile__avatar {
  height: 2rem;
  width: 2rem;
  stroke: var(--color-heading);
}
.profile--active {
  color: #50b991;
}
</style>
