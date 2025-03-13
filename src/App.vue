<script setup lang="ts"></script>

<template>
  <header class="header">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" height="40" />
    <ul role="navigation" class="header__link-list">
      <li>
        <router-link
          :to="{ name: 'profiles' }"
          class="header__link-list__item"
          activeClass="header__link-list__item--active"
          >Profiles</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'feed' }"
          class="header__link-list__item"
          activeClass="header__link-list__item--active"
          >Feed</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'add-post' }"
          class="header__link-list__item"
          activeClass="header__link-list__item--active"
          >what's new</router-link
        >
      </li>
    </ul>
  </header>
  <div class="views-body">
    <router-view name="left-sidebar" v-slot="{ Component }">
      <aside class="left-sidebar" v-if="Component">
        <component :is="Component"></component>
      </aside>
    </router-view>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
  <footer class="footer">
    <div class="container">© 2025, @devmustbeawesome</div>
  </footer>
</template>

<style>
.header {
  position: sticky;
  padding: 1rem;
  left: 0;
  top: 0;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
}

.views-body {
  flex: 1;
  clear: both;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
}
.left-sidebar {
  position: sticky;
  left: 0;
  top: calc(40px + 2rem);
  background-color: var(--color-background-mute);
  padding: 1rem;
}
main {
  flex: 1;
}
aside {
  width: 30%;
  max-width: 500px;
}

.header__link-list {
  list-style: none;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  gap: 1rem;
}
.header__link-list__item {
  font-size: 1.5rem;
  color: var(--color-text);
  text-decoration: none;
}
.header__link-list__item:hover {
  background-color: var(--color-background-mute);
  border-radius: 1rem;
}
.header__link-list__item--active {
  color: var(--color-heading);
  text-decoration: underline var(--color-heading);
}
.footer {
  border-top: 1px solid var(--color-border);
}
</style>
