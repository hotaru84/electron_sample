<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input @change="getFileContent" label="File input"></v-file-input>
        <v-select :items="iplist" @input="setip"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="cancel">CANCEL</v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="done" :disabled="isNotValid">DONE</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isNullOrUndefined } from 'util'
const os = require('os')
//const fs = require('fs')
export default {
  data: () => ({
    iplist:[]
  }),
  methods:{
    done(){
      this.$emit('done')
    },
    cancel(){
      this.$emit('cancel')
    },
    updateNic(){
      let ifaces = os.networkInterfaces();
      this.iplist = Object.values(ifaces).reduce((res,list)=>{
        return list.reduce((l,iface)=>{
          if(iface.family != 'IPv4' || iface.internal != false) return l;
          l.push(iface.address);
          return l;
        },res)
      },[])
    },
    getFileContent(file){
      //const src = fs.createReadStream(file.path,'utf8')
      this.$store.commit("setFile",{file})
      window.console.log(this.$store.getters.file)
    },
    setip(ip){
      this.$store.commit("setIpAddress",{ip})
      window.console.log(this.$store.getters.ipaddr)
    }
  },
  computed:{
    isNotValid(){
      return isNullOrUndefined(this.$store.getters.file) ||
          isNullOrUndefined(this.$store.getters.ipaddr)
    },
  },
  mounted(){
    this.updateNic()

  }
}
</script>
