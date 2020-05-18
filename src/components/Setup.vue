<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <!--webkitdirectory -->
        <v-file-input :value="files" multiple @change="setFiles" label="File input" ></v-file-input>
        <v-select :value="ip" :items="iplist" @input="setIPAddress"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="done" :disabled="isNotValid">START</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isNullOrUndefined } from 'util'
const os = require('os')
export default {
  data: () => ({
    
  }),
  methods:{
    done(){
      this.$emit('done')
    },
    setFiles(files){
      window.console.log(files)
      this.$store.commit("setFiles",{files}) 
    },
    setIPAddress(ip){
      this.$store.commit("setIpAddress",{ip})
    }
  },
  computed:{
    isNotValid(){
      return isNullOrUndefined(this.files) ||
          isNullOrUndefined(this.ip)
    },
    files() {return this.$store.getters.files},
    ip() {return this.$store.getters.ipaddr},
    iplist(){
      return Object.values(os.networkInterfaces()).reduce((res,list)=>{
        return list.reduce((l,iface)=>{
          if(iface.family != 'IPv4' || iface.internal != false) return l;
          l.push(iface.address);
          return l;
        },res)
      },[])
    }
  },
}
</script>
