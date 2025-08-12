<template>
  <div>
    <!-- chat -->
    <div class="wrapper">
      <div v-show="nowIndex !== -1">
        <div ref="messagesContainer" class="chat-wrapper">
          <ChatMessage
            v-for="(msg, i) in message"
            :key="i"
            :message="msg"
            :is-last-user="i === message.length - 2"
            :is-last-ai="i === message.length - 1"
            :now-index="nowIndex"
            @done="waiting = false"
          />
        </div>
      </div>
    </div>

    <!-- input -->
    <div class="main-input" :class="{ fixedBottom: nowIndex !== -1 }">
      <MainInput v-model="nowIndex" :waiting="waiting" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { qa } from "~/consatant";

const nowIndex = ref(-1);
const waiting = ref(false);

const result: {
  role: "user" | "ai";
  content: string[];
}[] = Array.from({ length: qa.length * 2 }, (_, i) => {
  return {
    role: i % 2 === 0 ? "user" : "ai",
    content: i % 2 === 0 ? qa[i / 2]!.question : qa[(i - 1) / 2]!.answer,
  };
});

const message = ref<
  {
    role: "user" | "ai";
    content: string[];
  }[]
>([]);

watch(nowIndex, () => {
  message.value.push(result[nowIndex.value * 2]!);
  message.value.push(result[nowIndex.value * 2 + 1]!);

  waiting.value = true;
});

onMounted(() => {
  nowIndex.value = -1;
});
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  /* max-width: 768px; */
}

.chat-wrapper {
  display: flex;
  flex-direction: column;

  padding: 50px 10px;
  width: 768px;
}

.main-input {
  width: 768px;
  position: fixed;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 50%);
  transition: all 0.6s ease;
  /* margin: 0 auto; */
  /* padding: 16px; */
}

.fixedBottom {
  bottom: 130px;
}
</style>
