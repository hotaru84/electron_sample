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
        <v-card class="elevation-12 pa-2">
          <setup :enable="!start" />
          <v-card-actions>
            <v-btn outlined color="primary" @click="start = !start" :disabled="isSettingNotValid">
              <div v-if="start">
                <v-icon>mdi-pencil</v-icon> Edit
              </div>
              <div v-else>
                <v-icon>mdi-qrcode</v-icon> DOWNLOAD LINK
              </div>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="start">
              <v-card-text>
                <server :enable="start" v-show="start"/>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isNullOrUndefined } from 'util'
import Setup from '../components/Setup'
import Server from '../components/Server'

export default {
  components:{Setup,Server},
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
