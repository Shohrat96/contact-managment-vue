<template>
  <div class="container">
    <h1 class="title">Contacts Page</h1>
    <div class="content">
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

export default {
  name: 'ContactsPage',
  components:{
    'single-contact':SingleContact,
    'modal-info':ModalInfo,
    'csv-import' :ImportCsv,
  },
  mixins:[HttpRequests],
  data(){
    return {
      contacts:[],
      infoModal:{
        show:false,
        contact:{}
      },
    }
  },
  props: {

  },
  methods:{
    deleteContact(id){
      this.contacts=this.contacts.filter(contact=>contact.id!==id)
    },
    showModalInfo(contact){
      this.infoModal.contact=contact;
      this.infoModal.show=true;
    },
    handleUpload(contactsArr){
      // this.postRequest(contactsArr[0])
      contactsArr.forEach(contact => {
        let result=this.postRequest(contact);
        result.postRqst.then((res)=>{
          const newContact={
            ...result.newContact,
            id:res.body.name
          }
          this.contacts.unshift(newContact);
        });
      });
    }
  },
  mounted(){
    this.getAllContactsRequest()
    .then(data=>data.json())
    .then(dataParsed=>{
      let result=[];
      result=Object.keys(dataParsed).map(key=>{
        dataParsed[key].id=key;
        return dataParsed[key]
      })
      this.contacts=result;
      console.log("result: ",result)
    })
    console.log("mounted, contacts: ",this.contacts)
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
