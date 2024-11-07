<script setup lang="ts">
import { GridLayout, GridItem } from 'grid-layout-plus'
import { ref, watch, ComponentPublicInstance } from 'vue'
import { useWidgetsStore } from '../store/widgetsStore'
import { widgetComponents } from '../components/widgets/widgetComponents'
import { vResizeObserver } from '@vueuse/components'

const store = useWidgetsStore()
const gridLayout = ref(null)

const updateLayout = () => {
  gridLayout.value.resizeEvent()
}

const handleResize = (entries) => {
  const [entry] = entries
  const { width, height } = entry.contentRect
  const i = entry.target.__vnode.key
  const index = store.layout.findIndex((item) => item.i === i)
  if (index !== -1) {
    const newHeight = Math.ceil(((height - 5) / 15) + 1)
    store.layout[index].h = newHeight
  }
  updateLayout()
}

const gridItemRefs = ref<ComponentPublicInstance[]>([])

watch(gridItemRefs.value, () => {
  store.updateWidgetRefs(gridItemRefs.value)
})
</script>

<template>
  <div class="body-container">
    <v-container>
      <GridLayout
        ref="gridLayout"
        v-model:layout="store.layout"
        :col-num="12"
        :row-height="5"
        is-draggable
        :is-resizable="false"
        vertical-compact
        use-css-transforms
        :auto-size="true"
      >
        <GridItem
          ref="gridItemRefs"
          class="grid-item"
          v-for="item in store.layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          drag-allow-from=".vue-draggable-handle"
          drag-ignore-from=".no-drag"
        >
          <div :key="item.i" v-resize-observer="handleResize">
            <component
              :is="widgetComponents[item.widget]" 
              :index="item.i"
              v-bind="item.props"
            />
          </div>
        </GridItem>
      </GridLayout>
    </v-container>
  </div>
</template>

<style scoped>
.body-container {
  padding-left: 14px;
  padding-right: 14px;
}

.v-container {
  padding: 0px;
}
.vgl-layout {
  --vgl-placeholder-bg: #2d3247;
}
</style>