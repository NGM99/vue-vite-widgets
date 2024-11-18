<script setup lang="ts">
import { ref } from 'vue'
import { useWidgetsStore } from '../../store/widgetsStore'

const store = useWidgetsStore()
const menu = ref(false)
const menuItems = [
  {
    title: 'Form',
    w: 6,
    h: 10,
    widget: 'Form',
    props: {}
  },
  {
    title: 'Table',
    w: 12,
    h: 12,
    widget: 'Table',
    props: {}
  },
  {
    title: 'Customer Table',
    w: 4,
    h: 12,
    widget: 'CustomerTable',
    props: {}
  },
]
</script>

<template>
  <div class="header-container">
    <v-container
      class="navbar-container d-flex align-center justify-end"
    >
      <v-menu
        v-model="menu"
        :close-on-content-click="true"
        location="bottom left"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="indigo-lighten-2"
            icon="mdi-plus"
            variant="text"
          />
        </template>
  
        <v-card min-width="200" class="menu-card-container">
          <v-list>
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
            >
              <v-list-item-title
                @click="store.addWidget({
                    w: item.w, 
                    h: item.h, 
                    widget: item.widget,
                    props: item.props,
                  })"
              >
                <v-btn
                  varinat="text"
                  class="w-100"
                  color="indigo-lighten-2"
                >
                  {{ item.title }}
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-container>
  </div>
</template>

<style scoped>
.header-container {
  padding-top: 16px;
  height: 84px;
  padding-left: 24px;
  padding-right: 24px;
}

.navbar-container {
  background-color: #2d3247;
  border-radius: 6px;
  height: 54px;
  box-shadow: 0 2px 8px rgba(19, 17, 32, 0.18), 0 0 transparent, 0 0 transparent;
  margin: 0px;
}

.menu-card-container {
  background-color: #2F3349 !important;
  border-radius: 6px;
  margin-top: 8px;
}

.v-list {
  background-color: #2F3349 !important;
  border-radius: 6px !important;
}
</style>