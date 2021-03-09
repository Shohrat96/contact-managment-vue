<template>
  <div class="container">
    <h1 class="title">Contacts Page</h1>
    <div class="content">


    <vue-csv-import
        v-model="csv"
        :fields="{name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}"
    >
        <vue-csv-toggle-headers></vue-csv-toggle-headers>
        <vue-csv-errors></vue-csv-errors>
        <vue-csv-input></vue-csv-input>
        <vue-csv-map></vue-csv-map>
    </vue-csv-import>

      <csv-import @handleUpload="handleUpload" ></csv-import>
      <modal-info v-if="infoModal.show" :infoModal="infoModal"></modal-info>
      <table>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Father Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
        <single-contact
        @showModalInfo="showModalInfo"
        @deleteContact="deleteContact" 
        v-for="contact in contacts" :key="contact.id" 
        :contact="contact"></single-contact>
      </table>
      <!-- <single-contact :key="contact.id" v-for="contact in contacts" :contact="contact"></single-contact> -->
    </div>
  </div>
</template>

<script>
import SingleContact from '../components/SingleContact';
import ModalInfo from '../components/ModalInfo';
import ImportCsv from '../components/importCSV';
import HttpRequests from '../mixins/HttpRequests';
import { VueCsvImport } from 'vue-csv-import';

export default {
  name: 'ContactsPage',
  components:{
    'single-contact':SingleContact,
    'modal-info':ModalInfo,
    'csv-import' :ImportCsv,
    'vue-csv-import':VueCsvImport
  },
  mixins:[HttpRequests],
  data(){
    return {
      contacts:[],
      infoModal:{
        show:false,
        contact:{}
      },
      csv:null
    }
  },
  props: {

  },
  methods:{
    test(){
      console.log("value: ",this.csv)
    },
    deleteContact(id){
      this.contacts=this.contacts.filter(contact=>contact.id!==id)
    },
    showModalInfo(contact){
      this.infoModal.contact=contact;
      this.infoModal.show=true;
    },
    handleUpload(contactsArr){
      console.log("arr: ",contactsArr[0]);
      this.postRequest(contactsArr[0])
      // contactsArr.forEach(contact => {
      //   let result=this.postRequest(contact);
      //   result.then(()=>this.contacts.unshift(contact));
      // });
    }
  },
  created(){
    this.getAllContactsRequest()
    .then(data=>data.json())
    .then(dataParsed=>{
      let result=[];
      result=Object.keys(dataParsed).map(key=>{
        dataParsed[key].id=key;
        return dataParsed[key ]
      })
      this.contacts=result;
    })
    
  }
}
</script>

<style scoped>
.title{
  text-align: center;
}
.content{
  max-width: 90%;
  padding: 10px;
  margin: 0 auto;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #dddddd;
}

th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

</style>
