<template>
<div class="form-container">
  <form class="form">
    <div class="name">
      <label>Name</label>
      <input type="text" v-model="contact.name.value" @blur="onBlur('name', $event)"/>
      <div class="break"></div>
      <p class="fieldError" v-if="!contact.name.valid">Provide name correctly!</p>
    </div>
    <div class="surname">
      <label>Surname</label>
      <input type="text" v-model="contact.surname.value" @blur="onBlur('surname', $event)"/>
      <div class="break"></div>
      <p class="fieldError" v-if="!contact.surname.valid">Provide surname correctly!</p>
    </div>
    <div class="fatherName">
      <label>Father name</label>
      <input type="text" v-model="contact.fatherName.value" @blur="onBlur('fatherName', $event)"/>
      <div class="break"></div>
      <p class="fieldError" v-if="!contact.fatherName.valid">Provide father name correctly!</p>
    </div>
    <div class="email">
      <label>E-mail</label>
      <input type="email" v-model="contact.email.value" @blur="onBlur('email', $event)"/>
      <div class="break"></div>
      <p class="fieldError" v-if="!contact.email.valid">Provide email correctly!</p>
    </div>
    <div class="age">
      <label>Age</label>
      <input type="number" v-model="contact.age.value" @blur="onBlur('age', $event)"/>
      <div class="break"></div>
      <p class="fieldError" v-if="!contact.age.valid">Provide age correctly!</p>
    </div>
    <div class="submit"> 
      <input type="submit" @click="handleSubmit"/>
    </div>
  </form>
</div>
</template>

<script>
import HttpRequests from '../mixins/HttpRequests';

export default {
  data() {
    return {
      contact:{
        name:{
          value:"",
          valid:true
        },
        surname:{
          value:"",
          valid:true
        },
        fatherName:{
          value:"",
          valid:true
        },
        email:{
          value:"",
          valid:true
        },
        age:{
          value:"",
          valid:true
        },
      }
    };
  },
  mixins:[HttpRequests],

  props:{
    data:{
      type:Object
    }
  },
  created(){
    if (this.$props.data){
      //this.contact={...this.$props.data}
      console.log("data: ",this.$props.data)
      Object.keys(this.contact).forEach(key=>{
        this.contact[key].value=this.$props.data[key]
      })
      console.log("data: ",this.contact)
    }
  },
  methods: {
    validateNewContact(values){
      let fieldsInError=[];
      Object.keys(values).forEach(key=>{
        if (!values[key].value.trim()){
          this.contact[key].valid=false;
          fieldsInError.push(this.contact[key])
        }
      })
      return fieldsInError
    },
    validateContactUpdate(){
      let changedFields=[]
      Object.keys(this.contact).forEach(key=>{
        if (this.contact[key].value!==this.$props.data[key]){
          changedFields.push(key);
        }
      })
      return changedFields;
    },
    onBlur(field){
      if (this.contact[field].value.trim()){
        this.contact[field].valid=true
      }
    },
    handleSubmit(e){
      e.preventDefault();
      //const obj={...this.contact}
      
      //check if already existing contact
      if (this.$props.data&&Object.keys(this.$props.data).length>1){
        const updatedFields=this.validateContactUpdate();
        if (updatedFields.length){
          const newContact={};
          Object.keys(this.contact).forEach(key=>{
             newContact[key]=this.contact[key].value;
          })
          this.patchRequest(this.$props.data.id, newContact)
          .then(()=>{
            this.$toast.success("contact changed successfully")
            this.$router.push("/");
          })
        }else {
          this.$toast.error("no change made")
        }

      }
      //add new item using mixin method
      else {
        const fieldsInError=this.validateNewContact(this.contact);
        if (!fieldsInError.length){
          const newContact={};
           Object.keys(this.contact).forEach(key=>{
             newContact[key]=this.contact[key].value;
          })
          let result=this.postRequest(newContact)
          result.postRqst.then(()=>{
            this.$toast.success("contact added successfully")
            this.$router.push("/");
          })
        }
      }

    },
  },
};
</script>

<style scoped>

.form{
  width: 40%;
  margin: 0 auto;
}
.form div{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 15px 0;
}
.form>div>label{
  flex: 1;
  text-align: left;
  font-weight: bold;
}
.form>div>input{
  flex: 3;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.form input[type=submit]{
  max-width: 100px;
  background-color: #4CAF50;
  cursor: pointer;
  color: white;
}
form>div.submit{
  display: flex;
  justify-content: flex-end;
}
.form input[type=submit]:hover {
  background-color: #45a049;
}
.fieldError{
  color: red;
}
.break{
  flex-basis: 100%;
  height: 0;
  margin: 0 !important;
}
</style>