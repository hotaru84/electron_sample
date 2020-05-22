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
            <v-toolbar-title>Setup</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
            <setup :enable="!start" />
            <server :enable="start" v-show="start"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="serverStart = !serverStart" :disabled="isSettingNotValid">
              {{serverStart?"STOP":"START"}}
            </v-btn>
          </v-card-actions>
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
  components:{Setup, Server},
  data () {
    return {
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
