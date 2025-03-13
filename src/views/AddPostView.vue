<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import LoaderIcon from '@/components/__icons/LoaderIcon.vue'
import { useAddPost } from '@/api/useAddPost'
import { useAsyncData } from '@/composables/useAsyncData'
import { useGetProfileList } from '@/api/useGetProfileList'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import SuccessIcon from '@/components/__icons/SuccessIcon.vue'
const {
  data: postData,
  error: getDataError,
  loading: getPostLoading,
  exec: sendPost,
} = useAsyncData(
  async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) return
    return useAddPost(postFormData)
  },
  { immediate: false },
)
const postFormData = reactive({
  title: '',
  body: '',
  userId: '',
})

const {
  data: profileList,
  error: getProfileListError,
  loading: getProfileListLoading,
  // exec: getProfileList,
} = useAsyncData(() => useGetProfileList(), { immediate: true })

const rules = {
  title: { required, $lazy: true },
  body: { required, $lazy: true },
  userId: {
    required,
    $lazy: true,
  },
}
const v$ = useVuelidate(rules, postFormData)
const resetForm = () => {
  postFormData.title = ''
  postFormData.body = ''
  postFormData.userId = ''
  v$.value.$reset()
  postData.value = undefined
}
</script>

<template>
  <div class="container">
    <div class="post-form__wrapper" v-if="postData == undefined && !getDataError">
      <h1 style="color: var(--color-heading)">Загрузить новый пост</h1>
      <form action="" class="post-form" @submit.prevent="sendPost">
        <div class="post-form__item-wrapper">
          <label for="post-form__title-input" class="post-form__label"> Заголовок поста </label>
          <input
            type="text"
            v-model="v$.title.$model"
            id="post-form__title-input"
            class="post-form__title-input"
            :class="{ 'post-form__title-input--error': v$.title.$errors.length }"
            placeholder="Введите заголовог поста"
          />
        </div>
        <div class="post-form__item-wrapper">
          <label for="post-form__body-input" class="post-form__label"> Текст поста </label>
          <textarea
            v-model="v$.body.$model"
            class="post-form__body-input"
            :class="{ 'post-form__body-input--error': v$.body.$errors.length }"
            id="post-form__body-input"
            placeholder="Текст поста"
          ></textarea>
        </div>
        <div class="post-form__item-wrapper">
          <label for="post-form__autor-select" class="post-form__label"> Автор поста </label>
          <select
            v-model="postFormData.userId"
            id="post-form__autor-select"
            class="post-form__autor-select"
            :class="{ 'post-form__autor-select--error': v$.userId.$errors.length }"
          >
            <option disabled selected value="">Выберите автора</option>
            <option v-for="profile in profileList" :key="profile.id" :value="profile.id">
              {{ profile.name }}
            </option>
          </select>
        </div>
        <ul class="error-list">
          <li class="error-list__item" v-for="error of v$.$errors" :key="error.$uid">
            <strong>{{ error.$validator }}</strong>
            <small> on property</small>
            <strong>{{ error.$property }}</strong>
            <small> says:</small>
            <strong>{{ error.$message }}</strong>
          </li>
        </ul>
        <div class="post-form__footer">
          <button class="post-form__submit-button">send</button>
        </div>
      </form>
    </div>
    <div v-if="getPostLoading" class="loading-wrapper">
      <LoaderIcon />
    </div>
    <div v-if="getDataError">
      <p v-for="(error, index) in getDataError" :key="index">
        {{ error }}
      </p>
    </div>
    <div v-if="postData" class="success-wrapper">
      <SuccessIcon style="width: 100px; height: 100px" />
      <p>Пост успешно отправлен</p>
      <button @click="resetForm">Отправить еще</button>
    </div>
  </div>
</template>

<style>
.post-form {
  width: fit-content;
  min-width: 500px;
}
.post-form__label {
  padding-left: 0.5rem;
  display: block;
}
.post-form__item-wrapper {
  width: 100%;
  max-width: 500px;
}

.post-form__title-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-text);
}
.post-form__title-input:hover {
  border-color: var(--color-border-hover);
}
.post-form__body-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-text);
  resize: vertical;
}
.post-form__autor-select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-text);
  text-indent: 0;
}
.post-form__footer {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: right;
}
.post-form__submit-button {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  background-color: rgb(64, 182, 129);
}
.error-list {
  color: red;
}
.post-form__autor-select--error,
.post-form__body-input--error,
.post-form__title-input--error {
  border-color: red;
}
.success-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.loading-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(13, 26, 37, 0.658);
  top: 0;
  left: 0;
}
</style>
