<template>
    <b-modal ref="my-modal" hide-footer button-size="sm" title="Contact Details">
      <div class="d-block">
        <div class="modal-field">
          <span class="field-title">ID</span>
          <span>{{modalObj.contact.id}}</span>
        </div>
        <div class="modal-field">
          <span class="field-title">Name</span>
          <span>{{modalObj.contact.name}}</span>
        </div>
        <div class="modal-field">
          <span class="field-title">Surname</span>
          <span>{{modalObj.contact.surname}}</span>
        </div>
        <div class="modal-field">
          <span class="field-title">Father name</span>
          <span>{{modalObj.contact.fatherName}}</span>
        </div>
        <div class="modal-field">
          <span class="field-title">Email</span>
          <span>{{modalObj.contact.email}}</span>
        </div>
        <div class="modal-field">
          <span class="field-title">Age</span>
          <span>{{modalObj.contact.age}}</span>
        </div>
        <div class="modal-field">
          <span class="field-title">Created</span>
          <span>{{modalObj.contact.create}}</span>
        </div>
        <div v-if="modalObj.contact.updated" class="modal-field modal-field-last">
          <span class="field-title">Updated</span>
          <span>{{modalObj.contact.updated}}</span>
        </div>
      </div>
      <b-button block variant="outline-info" @click="hideModal">OK</b-button>
    </b-modal>
</template>

<script>

export default {
  name: 'ModalInfo',
  components: {

  },
  props:{
    infoModal:{
        type:Object
    }
  },
  data(){
    return {
        modalObj:{}
    }
  },
  methods:{
    showModal() {
        this.$refs['my-modal'].show()
      },
    hideModal() {
        this.$refs['my-modal'].hide();
        this.modalObj.show=false
      },
  },
  created(){
      this.modalObj=this.$props.infoModal;
  },
  watch:{
      modalObj:{
          deep:true,
          handler(){
              this.showModal()
          }
      }
  }
}
</script>

<style scoped>
.modal-field{
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.modal-field-last{
    margin-bottom: 15px;
}
.field-title{
  font-weight: bold;
}
</style>
