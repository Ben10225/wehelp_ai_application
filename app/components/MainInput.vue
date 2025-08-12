<template>
  <div class="title" :class="{ disappear: nowIndex !== -1 }">WeHelpGPT</div>
  <div class="wrapper">
    <div :style="{ color: props.waiting ? '#666' : '#fff' }">
      {{ inputText }}
    </div>
    <div style="position: absolute; right: 20px; bottom: 12px">
      <v-icon
        color="#fff"
        size="28"
        style="cursor: pointer"
        :disabled="props.waiting || nowIndex === qa.length - 1"
        @click="handleClick"
        >mdi-arrow-up-bold-circle</v-icon
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { qa } from "@/consatant";

const nowIndex = defineModel<number>({
  default: 0,
});

const props = defineProps<{
  waiting: boolean;
}>();

const inputText = computed(() => {
  let text = "";

  if (nowIndex.value < qa.length - 1) {
    text = qa[nowIndex.value + 1]!.question[0]!;
  }

  return text;
});

const handleClick = () => {
  if (nowIndex.value >= qa.length - 1) return;
  nowIndex.value++;
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 80px;
  background-color: #303030;
  border-radius: 20px;
  padding: 12px 20px;
  position: relative;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #fff;
  text-align: center;
}

.title.disappear {
  opacity: 0;
  visibility: hidden;
}
</style>
