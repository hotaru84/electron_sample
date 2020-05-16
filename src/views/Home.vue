<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <setup @done="e1 = 2"/>
      </v-stepper-content>
      <v-stepper-content step="2">
        <server @done="e1 = 3" @cancel="e1 = 1"/>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card
          class="mb-12"
        >

        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
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
