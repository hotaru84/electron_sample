<template>
  <v-card class="fill-height" tile>
    <v-tabs vertical color="primary">
      <v-tab>
        <v-icon left>mdi-monitor-cellphone</v-icon> Control
      </v-tab>
      <v-tab>
        <v-icon left>mdi-history</v-icon> History
      </v-tab>
      <v-tab-item>
        <v-row>
          <v-col cols=6>
            <v-card-actions>
              <v-spacer/>
              <v-btn text color="primary"><v-icon left>mdi-cellphone-play</v-icon>Start</v-btn>
              <v-btn text color="primary"><v-icon left>mdi-cellphone-cog</v-icon>Setting</v-btn>
              <v-btn text color="primary"><v-icon left>mdi-power-standby</v-icon>Power</v-btn>
              <v-spacer/> 
            </v-card-actions>
            <v-container style="height:80vh" class="fill-height">
              <v-img src='device-2020-05-31-102305.png' max-height="75vh"  height="100%" contain/>
            </v-container>
          </v-col>
          <v-col cols=6>
            <v-card-actions>
              <v-btn text color="primary"><v-icon left>mdi-download</v-icon>Download</v-btn>
              <v-btn text color="primary"><v-icon left>mdi-upload</v-icon>Upload</v-btn>
              <v-btn text color="primary"><v-icon left>mdi-folder-search</v-icon>Search</v-btn>
            </v-card-actions>
            <v-container style="height:70vh" class="overflow-y-auto">
              <file-browser :search="search" /> 
            </v-container>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-toolbar flat>
          <v-spacer />
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
          <v-btn icon><v-icon>mdi-filter-variant</v-icon></v-btn>
        </v-toolbar>
        <v-row class="mx-2">
          <v-col md=4 sm=6>
            <v-img src='device-2020-05-31-102305.png' max-height="85vh"  height="100%" contain/>
          </v-col>
          <v-col md=8 sm=6>
            <v-sheet height="85vh" class="overflow-y-auto">
              <log-timeline />
            </v-sheet>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row>
          <v-text-field
            v-model="search"
            flat
            hide-details
            prepend-icon="mdi-briefcase-search"
            single-line
          ></v-text-field>
        </v-row>
        <v-row class="mx-4">
          <v-col cols=5>
            <v-card shaped class="pa-2">
              <v-card-title>From</v-card-title>
              <v-container style="height:70vh" class="overflow-y-auto">
                <file-browser :search="search" />
              </v-container>
            </v-card>
          </v-col>
          <v-col cols=2>
            <v-container style="height:70vh" class="fill-height">
              <v-btn block tile>DOWNLOAD<v-icon right>mdi-arrow-collapse-right</v-icon></v-btn>
              <v-btn block tile><v-icon left>mdi-arrow-collapse-left</v-icon>UPLOAD</v-btn>
            </v-container>
          </v-col>
          <v-col cols=5>
            <v-card shaped class="pa-2">
              <v-card-title>From</v-card-title>
              <v-container style="height:70vh" class="overflow-y-auto">
                <file-browser :search="search" />
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import FileBrowser from '../components/FileBrowser'
import LogTimeline from '../components/LogTimeline'
export default {
  components:{FileBrowser,LogTimeline},
  data () {
    return {
      id:0,
      search:"",
    }
  },
}
</script>
