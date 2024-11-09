<script setup lang="ts">
import WidgetCard from '../../components/base/WidgetCard.vue'
import { useWidgetsStore } from '../../store/widgetsStore'

const store = useWidgetsStore()

</script>

<template>
  <WidgetCard
    :title="'New Contact'"
  >  
    <template #body>
      <v-container>
        <div class="text-subtitle-2 mb-2">Default</div>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="i in 3"
            :key="i"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat."
            title="Item"
          ></v-expansion-panel>
        </v-expansion-panels>
        <v-btn
          class="mt-1"
          @click="store.addWidget({
            w: 4, 
            h: 10, 
            widget: 'Table',
            props: {},
          })"
        >
          Add Widget
        </v-btn>
      </v-container>
    </template>
  </WidgetCard>
</template>