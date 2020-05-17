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
        const files = this.$store.getters.files
          .filter(f=>f.name == req.url.replace('/',''))
        if(files.length > 0){
          window.console.log("found:" + files[0])
          const rs = fs.createReadStream(files[0].path,'utf8')
          res.writeHead(200,{'Content-Type':files[0].type});
          rs.pipe(res)
        } else {
          window.console.log("not found:" + req.path)
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('my notfound! : ' + req.path);
        }
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
