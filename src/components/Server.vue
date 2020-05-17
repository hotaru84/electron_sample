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
        <v-btn color="primary" @click="start">START</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isNullOrUndefined } from 'util'
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
      this.server = null
      this.$emit('cancel')
    },
    webserver() {
      return http.createServer((req,res)=>{
        const files = this.files
          .filter(f=>f.name == req.url.replace('/',''))
        if(files.length > 0){
          window.console.log("found:" + files[0])
          const rs = fs.createReadStream(files[0].path)
          res.writeHead(200,{
            'Content-Type':files[0].type,
            "Content-Length": files[0].size
            });
          rs.pipe(res)
        } else {
          window.console.log("not found:" + req.path)
          res.writeHead(404, {'Content-Type': 'text/plain',
          });
          res.end('my notfound! : ' + req.path);
        }
      })
    },
    start(){
      if(isNullOrUndefined(this.server)){
        if(this.files != null && this.files.length > 0){
          qrcode.toDataURL("http://" + this.ip + ":3000/" + this.files[0].name)
          .then(url=>{
            this.qrurl = url
          })
        }
        this.server = this.webserver()
        this.server.listen(3000,this.$store.getters.ipaddr)
      } else {
        this.server.close()
        this.server = null
      }
    },
  },
  computed:{
    files() {return this.$store.getters.files},
    ip() {return this.$store.getters.ipaddr},
  }, 
  beforeDestroy() {
    this.server.close()
  }
}
</script>
