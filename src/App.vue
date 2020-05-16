<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      items: [
        { icon: 'phone_android', text: 'Home'},
        { icon: 'playlist_add_check', text: 'Data' },
        { icon: 'photo_library', text: 'Gallery' },
        { divider: true },
      ],
    }),
  }
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>