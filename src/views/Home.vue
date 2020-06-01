<template>
  <v-card class="fill-height" tile>
    <v-tabs right color="primary">
      <v-tab>
        <v-icon left>mdi-monitor-cellphone</v-icon> Control
      </v-tab>
      <v-tab>
        <v-icon left>mdi-history</v-icon> History
      </v-tab>
      <v-tab-item>
        <v-row>
          <v-col cols=12 sm=6>
            <v-sheet class="fill-height ms-2 pa-2" color="grey" style="position:relative">
              <v-img src='device-2020-05-31-102305.png' max-height="78vh" height="100%" contain />
              <v-btn small color="red" fab top right absolute class="mb-2 me-2"><v-icon>mdi-power</v-icon></v-btn>
            </v-sheet>
          </v-col>
          <v-col cols=12 sm=6>
            <v-card outlined class="mx-2">
              <v-card-subtitle color="primary">
              <v-icon left >mdi-cellphone</v-icon>DEVICE
            </v-card-subtitle>
            <v-sheet style="max-height:48vh" class="overflow-y-auto">
              <file-browser :search="search" /> 
            </v-sheet>
            </v-card>
            <v-card-actions>
              <v-spacer/>
              <v-btn depressed color="primary"><v-icon small left>mdi-download</v-icon>Download</v-btn>
              <v-spacer/>
              <v-btn depressed color="primary"><v-icon small left>mdi-upload</v-icon>Upload</v-btn>
              <v-spacer/>
            </v-card-actions>
            <v-card outlined class="mx-2 px-2">
            <v-card-subtitle color="primary">
              <v-icon left >mdi-monitor</v-icon>PC
            </v-card-subtitle>
            <v-file-input
              multiple
              show-size
              label="Target PC Folder"
              clearable />
            </v-card>
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
<style scoped>
.v-btn--fab {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>