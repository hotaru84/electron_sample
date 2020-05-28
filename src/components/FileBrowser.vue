<template>
  <v-treeview
    :items="items"
    :search="search"
    item-disabled="locked"
    activatable
    item-key="name"
    :load-children="fetch"
    open-on-click
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="item.children">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
import { isNullOrUndefined } from 'util'
const fs = require('fs').promises
const path = require('path')
export default {
  props:['search','basePath'],
  data: () => ({
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-json',
      md: 'mdi-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    },
    items: [
      {
        name:"",
        path: "",
        children:[]
      },
    ],
  }),
  methods:{
    async fetch(dir){
      const dirpath = path.join(isNullOrUndefined(this.basePath) ? "" : this.basePath, dir.path, dir.name)
      const files = await fs.readdir(dirpath)
      for (let f of files) {
        const fpath = path.join(dirpath, f);
        try{
          const st = await fs.stat(fpath)
          if(st.isDirectory()) {
            const rpath = path.join(dir.path,dir.name)
            dir.children.push({name:f,path:rpath,children:[]})
          }else {
            dir.children.push({name:f, file:f.slice(f.lastIndexOf('.') + 1)})
          }
        }catch(e){
          window.console.log(e)
          dir.children.push({name:f,locked:true})
        }
      }
    }
  }
}
</script>