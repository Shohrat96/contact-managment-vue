<template>
    <div class="container">
        <div class="content">
            <div class="content-input">
                <label for="csv_file">CSV file to import</label>
                <input type="file" id="csv_file" name="csv_file" @change="loadCSV($event)">
            </div>
            <div class="content-button" v-if="readyForUpload">
                <button 
                @click="$emit('handleUpload',parse_csv)"
                v-if="readyForUpload" 
                class="btn btn-primary" >Upload</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        parse_header: [],
        parse_csv: [],
        sortOrders:{},
        readyForUpload:false
        };
    },

    methods: {

      csvJSON(csv){
        var vm = this
        var lines = csv.split("\n")
        var result = []
        var headers = lines[0].split(",")
        vm.parse_header = lines[0].split(",") 
        lines[0].split(",").forEach(function (key) {
          vm.sortOrders[key] = 1
      })
      
      lines.map(function(line, indexLine){
        //check for header and last-item=>undefined bug
        if (indexLine < 1 || indexLine==(lines?.length-1)) return
        
        var obj = {}
        var currentline = line.split(",")
        
        headers.map(function(header, indexHeader){
          let key=header;
          let value=currentline[indexHeader];
          
          if (indexHeader===headers.length-1){
            key=key.substring(0, (key.length-1));
            value=value?.trim();
          }
          obj[key] = value;

        })
        result.push(obj)
      })      
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
          vm.parse_csv = vm.csvJSON(csv);
          vm.readyForUpload=true;
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