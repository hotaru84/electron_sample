<template>
  <v-form>
    <v-file-input
     :value="files"
      @change="setFiles"
      multiple
      show-size
      :disabled="!enable"
      prepend-icon="mdi-upload"
      clearable />
    <v-select
      prepend-icon="mdi-access-point-network"
      :disabled="!enable"
      :value="ip"
      :items="iplist"
      @input="setIPAddress"/>
  </v-form>
</template>

<script>
const os = require('os')
export default {
  props:['enable'],
  data: () => ({
    
  }),
  methods:{
    setFiles(files){
      window.console.log(files)
      this.$store.commit("setFiles",{files}) 
    },
    setIPAddress(ip){
      this.$store.commit("setIpAddress",{ip})
    }
  },
  computed:{
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
