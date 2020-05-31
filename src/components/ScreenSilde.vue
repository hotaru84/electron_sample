<template>
  <v-carousel v-model="id" hide-delimiters :show-arrows="false">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"      
    >
    <v-img :src="item.src" aspect-ratio="1.5" />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    props:['id'],
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
  }
</script>