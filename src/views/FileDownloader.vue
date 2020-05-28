<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-text-field
              v-model="search"
              flat
              hide-details
              prepend-inner-icon="mdi-briefcase-search"
              single-line
              solo-inverted
            ></v-text-field>
          </v-toolbar>
            <v-sheet height="300px" class="overflow-y-auto">
            <file-browser :search="search"/>
            <!-- <setup :enable="!start" />
            <server :enable="start" v-show="start"/> -->
            </v-sheet>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="start = !start" :disabled="isSettingNotValid">
              {{start?"STOP":"START"}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isNullOrUndefined } from 'util'
//import Setup from '../components/Setup'
//import Server from '../components/Server'
import FileBrowser from '../components/FileBrowser'
export default {
  components:{FileBrowser},
  data () {
    return {
      search:"",
      start:false,
    }
  },
  computed:{
    isSettingNotValid(){
      return isNullOrUndefined(this.files) || isNullOrUndefined(this.ip) || this.files.length == 0
    },
    files() {return this.$store.getters.files},
    ip() {return this.$store.getters.ipaddr},
  }
}
</script>
