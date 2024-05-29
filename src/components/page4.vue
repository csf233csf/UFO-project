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