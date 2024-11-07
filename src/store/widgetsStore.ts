import { defineStore } from 'pinia'
import { reactive, ref, nextTick, ComponentPublicInstance } from 'vue'

export const useWidgetsStore = defineStore('widgets', () => {
  // State: the store's reactive data
  const widgetRefs = ref<ComponentPublicInstance[]>([]);
  const layout = reactive<{x: number, y: number, w: number, h: number, i: string, widget: string, props: object}[]>([])


  // Actions: methods for the store to modify the state
  const updateWidgetRefs = (val) => {
    widgetRefs.value = val
  }

  const calculateOptimalPosition = (w: number, h: number) => {
    if (layout.length === 0) {
      // If there are no widgets, place the first one at (0, 0)
      return { x: 0, y: 0 }
    }
    // Find the widget with the maximum y value (last row)
    const maxYWidget = layout.reduce((maxWidget, currentWidget) =>
      currentWidget.y + currentWidget.h > maxWidget.y + maxWidget.h ? currentWidget : maxWidget
    )
    // Find all widgets in the last row
    const lastRowWidgets = layout.filter(widget => widget.y === maxYWidget.y)
  
    // Get the last widget in the row
    const lastWidgetInRow = lastRowWidgets[lastRowWidgets.length - 1]
    let nextX = lastWidgetInRow.x + lastWidgetInRow.w
  
    // Check if the widget fits in the current row
    if (nextX + w > 12) {
      // If it doesn't fit, move to the next row
      return { x: 0, y: maxYWidget.y + maxYWidget.h }
    }
    // If it fits in the current row, place it there
    return { x: nextX, y: lastWidgetInRow.y }
  }

  let index = 0
  const addWidget = async ({ w, h, widget, props }:{ w: number, h: number, widget: string, props: object }): Promise<void> => {
    const { x, y } = calculateOptimalPosition(w, h)
    const widgetIndex = index++
    layout.push({
      x,
      y,
      w,
      h,
      i: `${widgetIndex}`,
      widget,
      props,
    })
    // Scroll to the newly added widget
    await nextTick() // Wait for DOM update
    const newWidget = widgetRefs.value[layout.length - 1]?.$el // Get the new widget element
    if (newWidget) {
      newWidget.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const removeWidget = (id: string): void => {
    const index = layout.findIndex(item => item.i === id)
  
    if (index > -1) {
      layout.splice(index, 1)
    }
  }

  return {
    widgetRefs,
    updateWidgetRefs,
    addWidget,
    layout,
    removeWidget,
  }
})
