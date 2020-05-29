<template>
  <v-card class="fill-height" tile>
    <v-tabs grow dark center-active background-color="primary">
      <v-tab>
        <v-icon left>mdi-monitor</v-icon> Control
      </v-tab>
      <v-tab>
        <v-icon left>mdi-history</v-icon> Log
      </v-tab>
      <v-tab>
        <v-icon left>mdi-cellphone-link</v-icon>File copy
      </v-tab>
      <v-tab-item>
        <screen-slide :id.sync="id"/>
      </v-tab-item>
      <v-tab-item>
        <v-toolbar flat>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-toolbar>

        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="top"
            justify="center"
          >
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <screen-slide :id.sync="id"/>
            </v-col>
            <v-col
              cols="12" sm="6" md="6">
              <v-sheet height="550px" class="overflow-y-auto">
              <log-timeline />
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-toolbar dense flat>
          <v-text-field
            v-model="search"
            flat
            hide-details
            prepend-icon="mdi-briefcase-search"
            single-line
          ></v-text-field>
        </v-toolbar>
        <v-sheet height="600px" class="overflow-y-auto">
         <file-browser :search="search"/>
        </v-sheet>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import ScreenSlide from '../components/ScreenSilde'
import FileBrowser from '../components/FileBrowser'
import LogTimeline from '../components/LogTimeline'
export default {
  components:{FileBrowser,ScreenSlide,LogTimeline},
  data () {
    return {
      id:0,
      search:"",
    }
  },
}
</script>
