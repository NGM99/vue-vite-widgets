<script setup>
import { useWidgetsStore } from '@/store/widgetsStore.ts'

const store = useWidgetsStore()

const props = defineProps({
  index: String,
  title: String,
})
</script>

<template>
  <v-card
    class="card-container vue-draggable-handle"
    :title="title" 
    subtitle=""
  >
    <template v-slot:append>
      <v-btn
        color="red-lighten-2"
        icon="mdi-close"
        variant="text"
        @click="store.removeWidget(props.index)"
      />
    </template>
    <v-card-item class="no-drag pt-0">
      <slot name="body" />
    </v-card-item>
  </v-card>
</template>

<style scoped>
.v-card {
  animation: borderFade 1s ease-in-out forwards;
}

.card-container {
  color: #d0cde4;
  height: 100%;
  box-shadow: 0 2px 8px rgba(19, 17, 32, 0.18), 0 0 transparent, 0 0 transparent;
  background-color: #2F3349;
  border-radius: 6px;
}

@keyframes borderFade {
  0% {
    border: solid 2px #d0cde4;
  }
  100% {
    border: solid 2px transparent;
  }
}
</style>
