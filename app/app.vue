<template>
  <div>
    <v-app>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </v-app>
  </div>
</template>

<style scoped>
.v-application {
  background-color: #212121 !important;
}

.v-virtual-scroll__container,
.v-virtual-scroll,
.v-scroll-y {
  background-color: transparent !important;
}
</style>
