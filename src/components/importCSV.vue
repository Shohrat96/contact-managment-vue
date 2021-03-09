<template>
    <div class="container">
      <button @click="test" >test</button>
        <!-- <div class="content">
            <div class="content-input">
                <label for="csv_file">CSV file to import</label>
                <input type="file" id="csv_file" name="csv_file" @change="loadCSV($event)">
            </div>
            <div class="content-button" v-if="parse_csv">
                <button 
                @click="$emit('handleUpload',parse_csv)"
                v-if="readyForUpload" 
                class="btn btn-primary" >Upload</button>
            </div>
        </div> -->
            <div class="panel panel-sm">
      <div class="panel-heading"> 
        <h4>CSV Import</h4>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label for="csv_file" class="control-label col-sm-3 text-right">CSV file to import</label>
          <div class="col-sm-9">
            <input type="file" id="csv_file" name="csv_file" class="form-control" @change="loadCSV($event)">
          </div>
        </div>
        <div class="col-sm-offset-3 col-sm-9">
          <div class="checkbox-inline">
            <label for="header_rows"><input type="checkbox" id="header_rows"> File contains header row?</label>
          </div>
        </div>
        
        <div class="col-sm-offset-3 col-sm-9">
          <a href="#" class="btn btn-primary">Parse CSV</a>
        </div>
        <table v-if="parse_csv">
          <thead>
            <tr>
              <th :key="key" v-for="key in parse_header"
                  @click="sortBy(key)"
                  :class="{ active: sortKey == key }">
                {{ key | capitalize }}
                <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                </span>
              </th>
            </tr>
          </thead> 
          <tr v-for="csv in parse_csv" :key="csv">
            <td v-for="key in parse_header" :key="key">
              {{csv[key]}}
            </td>
          </tr>
          
        </table>
      </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        // parse_csv: [],
        // readyForUpload:false
              channel_name: '',
      channel_fields: [],
      channel_entries: [],
      parse_header: [],
      parse_csv: [],
      sortOrders:{},
      sortKey: ''
        };
    },
      filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
    methods: {
      test(){
        console.log("value:",this.parse_csv[0]);
        this.$http.post('https://contact-managment-vue-default-rtdb.firebaseio.com/contacts.json',
            this.parse_csv[0])
      },
    csvJSON(csv){
      // var lines = csv.split("\n")
      // var result = []
      // var headers = lines[0].split(",")
      // lines.map(function(line, indexLine){
      //   if (indexLine < 1) return // Jump header line
        
      //   var obj = {}
      //   var currentline = line.split(",")
        
      //   headers.map(function(header, indexHeader){
      //   header=header.substring(1,(header.length-1)) //remove double quotes
      //     obj[header] =JSON.parse(currentline[indexHeader]) //remove double quotes
      //   })
      //   result.push(obj)
      // })
      // return result // JavaScript object
           var vm = this
      var lines = csv.split("\n")
      var result = []
      var headers = lines[0].split(",")
      vm.parse_header = lines[0].split(",") 
      lines[0].split(",").forEach(function (key) {
        vm.sortOrders[key] = 1
      })
      
      lines.map(function(line, indexLine){
        if (indexLine < 1 || indexLine===lines.length-1) return // Jump header line
        
        var obj = {}
        var currentline = line.split(",")
        
        headers.map(function(header, indexHeader){
          let objKey=header;
          let val=currentline[indexHeader];
          if (val.indexOf('"')!==-1){
            console.log("FOUNDDDd: ",val);
            val=val.substring(1,(val.length-1))
          }
          if (objKey.indexOf('"')!==-1){
            //console.log("FOUNDDDd: ",val);
            val=val.substring(1,(val.length-1))
          }
          console.log("header: ",header);
          console.log("obj[header]: ",obj[header]);
          obj[header] = val
        })
        console.log("obj: ",obj)
        result.push(obj)
      })
      
      //result.pop() // remove the last item because undefined values
      return result // JavaScript object

    },
    loadCSV(e) {
      var vm = this
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        // Handle errors load
        reader.onload = function(event) {
          var csv = event.target.result;
          vm.parse_csv = vm.csvJSON(csv)
          
        };
        reader.onerror = function(evt) {
          if(evt.target.error.name == "NotReadableError") {
            alert("Canno't read file !");
          }
        };
      } else {
        alert('FileReader are not supported in this browser.');
      }
    }
      // console.log("load start")
      // var vm = this
      // if (window.FileReader) {
      //   var reader = new FileReader();
      //   reader.readAsText(e.target.files[0]);
      //   // Handle errors load
      //   reader.onload = function(event) {
      //     var csv = event.target.result;
      //     vm.parse_csv = vm.csvJSON(csv)
      //     vm.readyForUpload=true
      //   };
      //   reader.onerror = function(evt) {
      //     if(evt.target.error.name == "NotReadableError") {
      //       alert("Canno't read file !");
      //     }
      //   };
      // } else {
      //   alert('FileReader are not supported in this browser.');
      // }
    }
  }

</script>

<style scoped>
.container{
    padding: 0;
    margin-bottom: 10px;
}
.content-input{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}
</style>