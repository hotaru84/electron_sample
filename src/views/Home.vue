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
            <v-sheet class="fill-height ms-2 pa-2" color="white" style="position:relative">
              <v-img lazy-src='device-2020-05-31-102305.png' max-height="78vh" height="100%"
                  gradient="to top right, rgba(69,69,69,.3), rgba(69,69,69,.3)" contain>
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-btn icon x-large color="white"><v-icon x-large>mdi-play-circle</v-icon></v-btn> 
                    </v-row>
                  </template>
              </v-img>
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
        <v-row>
          <v-col md=4 sm=6>
            <v-img src='device-2020-05-31-102305.png' max-height="75vh" height="100%" contain/>
          </v-col>
          <v-col md=8 sm=6 class="position:relative">
            <v-sheet height="75vh" class="overflow-y-auto">
              <log-timeline />
            </v-sheet>
            <v-bottom-sheet v-model="sheet" inset>
              <template v-slot:activator="{ on }">
                <v-btn absolute fab right bottom color="secondary"
                v-on="on"
                 class="mb-4 mr-4"><v-icon>mdi-filter-variant</v-icon></v-btn>
              </template>
              <v-sheet class="text-center" height="200px">
                <v-btn
                  class="mt-6"
                  text
                  color="error"
                  @click="sheet = !sheet"
                >close</v-btn>
                <div class="my-3">This is a bottom sheet using the inset prop</div>
              </v-sheet>
            </v-bottom-sheet>
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