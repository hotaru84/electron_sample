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
        sm="6"
        md="4"
      >
        <v-card class="elevation-12">
          <file-browser />
          <file-browser />
            <!-- <setup :enable="!start" />
            <server :enable="start" v-show="start"/> -->
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
