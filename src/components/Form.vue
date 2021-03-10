<template>
<div class="form-container">
  <form class="form">
    <div class="name">
      <label>Name</label>
      <input type="text" v-model="contact.name" />
    </div>
    <div class="surname">
      <label>Surname</label>
      <input type="text" v-model="contact.surname"/>
    </div>
    <div class="fatherName">
      <label>Father name</label>
      <input type="text" v-model="contact.fatherName"/>
    </div>
    <div class="email">
      <label>E-mail</label>
      <input type="email" v-model="contact.email"/>
    </div>
    <div class="age">
      <label>Age</label>
      <input type="number" v-model="contact.age"/>
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
    this.contact={...this.$props.data}
  },
  methods: {
    handleSubmit(e){
      e.preventDefault();
      const obj={...this.contact}
      
      //check if already existing contact
      if (Object.keys(this.$props.data).length>1){
        this.patchRequest(this.$props.data.id, obj)
        .then(()=>{
          Object.keys(this.contact).forEach(key=>this.contact[key]="");
        })
      }
      //add new item using mixin method
      else {
        let result=this.postRequest(obj)
        result.postRqst.then(()=>{
          Object.keys(this.contact).forEach(key=>this.contact[key]="");
        })
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
  align-items: center;
  margin: 15px 0;
}
.form>div>label{
  flex: 1;
  text-align: left;
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
</style>