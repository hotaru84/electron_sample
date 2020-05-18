<template>
  <v-img :src="qrurl" />
</template>

<script>
import { isNullOrUndefined } from 'util'
const qrcode = require('qrcode')
const http = require('http')
const fs = require('fs')
export default {
  props:["enable"],
  data: () => ({
    qrurl:"",
    server:null
  }),
  methods:{
    cancel(){
      this.stop()
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
        this.server = this.webserver().listen(3000,this.$store.getters.ipaddr)
      }
    },
    stop(){
      if(isNullOrUndefined(this.server)) return;
      this.server.close()
      this.server = null
    }
  },
  computed:{
    files() {return this.$store.getters.files},
    ip() {return this.$store.getters.ipaddr},
  }, 
  watch:{
    enable(v){
      if(v)this.start()
      else this.stop()
    }
  },
  beforeDestroy() {
    this.stop()
  }
}
</script>
