<template>
  <div>
    <v-toolbar
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      prominent
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <v-btn size="x-large">Default Elevation (2)</v-btn>
        </v-col>
  
        <v-col cols="auto">
          <v-btn elevation="4" size="x-large">Elevation 4</v-btn>
        </v-col>
  
        <v-col cols="auto">
          <v-btn elevation="8" size="x-large">Elevation 8</v-btn>
        </v-col>
  
        <v-col cols="auto">
          <v-btn elevation="12" size="x-large">Elevation 12</v-btn>
        </v-col>
  
        <v-col cols="auto">
          <v-btn elevation="16" size="x-large">Elevation 16</v-btn>
        </v-col>
  
        <v-col cols="auto">
          <v-btn elevation="20" size="x-large">Elevation 20</v-btn>
        </v-col>
  
        <v-col cols="auto">
          <v-btn elevation="24" size="x-large">Elevation 24</v-btn>
        </v-col>
      </v-row>
    </v-container>
  <v-container>
    <v-row justify="space-between">
      <v-col v-for="cursor in cursors" :key="cursor" cols="3">
        <v-btn
          :class="`cursor-${cursor}`"
          :text="cursor"
          block
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-row
    justify="center"

    style="min-height: 160px;"
  >
    <v-col class="shrink">
      <v-btn
        class="ma-2"
        color="primary"
        @click="expand = !expand"
      >
        Expand Transition
      </v-btn>

      <v-expand-transition>
        <v-card
          v-show="expand"
          class="mx-auto bg-secondary"
          height="100"
          width="100"
        ></v-card>
      </v-expand-transition>
    </v-col>

    <div class="mx-4 hidden-sm-and-down"></div>

    <v-col class="shrink">
      <v-btn
        class="ma-2"
        color="secondary"
        @click="expand2 = !expand2"
      >
        Expand X Transition
      </v-btn>

      <v-expand-x-transition>
        <v-card
          v-show="expand2"
          class="mx-auto bg-secondary"
          height="100"
          width="100"
        ></v-card>
      </v-expand-x-transition>
    </v-col>
  </v-row>
  <div class="text-center">
    <v-menu transition="fab-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          dark
          v-bind="props"
        >
          Fab Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
        >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
  <div class="text-center">
    <v-menu transition="fade-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          dark
          v-bind="props"
        >
          Fade Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
        >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
  </template>

<script>
export default {
  data: () => ({
    cursors: [
      'auto',
      'default',
      'grab',
      'grabbing',
      'help',
      'move',
      'none',
      'not-allowed',
      'pointer',
      'progress',
      'text',
      'wait',
    ],
    expand: false,
      expand2: false,
  }),
}
</script>

<style scoped>
/* .pa4{
    background-image: url('/images/Slide 16_9 - 19.png');
} */

.absolute-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index:-1;
}



.pa4{
    color:white;
    padding:50px;
}
</style>