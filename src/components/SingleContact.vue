<template>
  <tr>

    <td>{{contact.id}}</td>
    <td>{{contact.name}}</td>
    <td>{{contact.surname}}</td>
    <td>{{contact.fatherName}}</td>
    <td>{{contact.age}}</td>
    <td>
      <tr class="actions">
        <td class="view-action">
          <font-awesome-icon icon="info-circle" @click="$emit('showModalInfo', contact)"/>
        </td>
        <td class="edit-action">
          <router-link v-bind:to="{name:'contact', params:{id:contact.id, singleContact:contact}}">
            <font-awesome-icon icon="edit" />
          </router-link>
        </td>
        <td class="delete-action" @click="deleteHandler">
            <font-awesome-icon icon="trash-alt" />
        </td>
      </tr>
    </td>
  </tr>
</template>

<script>

export default {
  name: '',
  props: {
    contact:{
      type:Object
    }
  },
  components:{
    // 'modal-info':ModalInfo
  },
  methods:{

    deleteHandler(){
      this.$bvModal.msgBoxConfirm("Do you confirm?")
      .then((res)=>{
        if (res){
        this.$http.delete(`https://contact-managment-vue-default-rtdb.firebaseio.com/contacts/${this.contact.id}.json`)
        .then(()=>this.$emit("deleteContact", this.contact.id))
        }
      })
    },
  }
}
</script>

<style scoped>
.container{
  background-color: white;
  border-radius: 10px;
  padding: 5px 8px;
  margin: 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.contact-detail{
  padding: 5px;
}
h3{
  text-align: left;
}
.actions{
  display:flex;
  justify-content: space-evenly;
}
td{
  padding: 5px;
}
svg {
  color:darkslategrey;
  cursor:pointer
}
.view-action svg :hover {
  color: blue;
}
.edit-action svg :hover {
  color: green;
}
.delete-action svg :hover {
  color: red;
}

</style>
