<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-img :src="qrurl" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn @click="cancel">CANCEL</v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="done">DONE</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const qrcode = require('qrcode')
const http = require('http')
const fs = require('fs')
export default {
  data: () => ({
    qrurl:"",
    server:null
  }),
  methods:{
    done(){
      this.server.close()
      this.$emit('done')
    },
    cancel(){
      this.server.close()
      this.$emit('cancel')
    },
    webserver() {
      return http.createServer((req,res)=>{
        const file = this.$store.getters.file
        const rs = fs.createReadStream(file.path,'utf8')
        let reqfilename = req.url.replace('/','')
        window.console.log("req:" + reqfilename + ", res:" + file.name)
        res.writeHead(200,{'Content-Type':file.type});
        rs.pipe(res)
      })
    }
  },
  mounted(){
    qrcode.toDataURL("test")
    .then(url=>{
      this.qrurl = url
    })
    
    this.server = this.webserver()
    this.server.listen(3000,this.$store.getters.ipaddr)
  },
  beforeDestroy() {
    this.server.close()
    >window.console.log("close")
  }
}
</script>
