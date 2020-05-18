<template>
  <v-stepper v-model="e1">
    <v-stepper-items>
      <v-stepper-content step="1">
        <setup @done="e1 = 2"/>
      </v-stepper-content>
      <v-stepper-content step="2">
        <server :enable="e1==2" @cancel="e1 = 1"/>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Setup from '../components/Setup'
import Server from '../components/Server'
  export default {
    components:{Setup, Server},
    data () {
      return {
        e1: 1,
      }
    },
  }
</script>
