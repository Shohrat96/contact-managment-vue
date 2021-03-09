<template>
  <div class="container">
    <h1>{{editMode?'Edit Contact':'Add New Contact'}}</h1>
    <custom-form :data="contact"></custom-form>
  </div>
</template>

<script>
import Form from '../components/Form'
export default {
  name: 'AddContact',
  data(){
    return {
      id:this.$route.params.id,
      contact:{
        type:Object
      },
      editMode:false
    }
  },
  components:{
      'custom-form':Form
  },
  props: {
    
  },
  created(){
    if (this.$route.params.singleContact){
      this.editMode=true
      this.contact=this.$route.params.singleContact;
    }
  }
}
</script>

<style scoped>
.container{
  text-align: center;
}
</style>
