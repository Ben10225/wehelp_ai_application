<template>
  <div
    ref="userMessageRef"
    class="message with-scroll-margin"
    :class="{
      'from-user': message.role === 'user',
      'from-ai': message.role === 'ai',
    }"
  >
    <template v-if="message.role === 'ai'">
      <div
        v-if="isLastAi"
        :style="{
          height: `calc(100vh - 350px)`,
        }"
        style="border: 0px solid red"
      >
        <div class="message-text">
          {{ displayedText }}
        </div>
      </div>

      <div v-else class="message-text">
        {{ displayedText }}
      </div>

      <!-- <div
        v-if="isLastAi"
        :style="{
          height: `calc(100vh - 400px)`,
        }"
        style="border: 1px solid red"
      ></div> -->
    </template>
    <template v-else>
      {{ props.message.content[0] }}
    </template>
  </div>
</template>

<script setup lang="ts">
import type { VNodeRef } from "vue";

const props = defineProps<{
  message: {
    role: "user" | "ai";
    content: string[];
  };
  isLastUser: boolean;
  isLastAi: boolean;
  nowIndex: number;
}>();

const emit = defineEmits<{
  (e: "done"): void;
}>();

const userMessageRef = ref<VNodeRef | null>(null);

const displayedText = ref("");

const typeWriterEffect = (text: string, groupSize = 3, speed = 35) => {
  displayedText.value = "";
  let i = 0;

  const interval = setInterval(() => {
    displayedText.value += text.slice(i, i + groupSize);
    i += groupSize;
    if (i >= text.length) {
      clearInterval(interval);
      emit("done");
    }
  }, speed);
};

onMounted(async () => {
  if (props.message.role === "user" && props.isLastUser) {
    await nextTick();

    userMessageRef.value?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (props.message.role === "ai") {
    setTimeout(() => {
      typeWriterEffect(props.message.content.join("\n"));
    }, 1200);
  }
});
</script>

<style scoped>
.message {
  max-width: 80%;
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 8px;
  word-break: break-word;
}

.from-user {
  width: fit-content;
  background-color: #2e2e2e;
  color: #fff;
  align-self: flex-end;
  border-radius: 10px;
}

.from-ai {
  width: fit-content;
  max-width: 600px;
  color: #fff;
  align-self: flex-start;
  border-radius: 10px;
  align-self: flex-start;
  margin-bottom: 80px;
}

.message-text {
  white-space: pre-line;
  line-height: 27px;
}

.with-scroll-margin {
  scroll-margin-top: 50px;
}
</style>
