<template>
  <v-app>
    <v-system-bar
      app
      dense
      clipped-left
      color="primary"
    >
    <v-spacer></v-spacer>
      <v-btn tile x-small text @click="drawer = !drawer"><v-icon left>mdi-playlist-check</v-icon>device list</v-btn>
      <v-btn text tile x-small disabled><v-icon>mdi-playlist-plus</v-icon>add device</v-btn>
      <v-btn text tile x-small to="/filedownload"><v-icon>mdi-cog</v-icon>setup</v-btn>
    </v-system-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
  })
}
</script>

