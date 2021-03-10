const httpRequests={
    methods:{
        postRequest(obj){
            let date=new Date();
            let utcDate=date.toUTCString();
            const newContact={
                ...obj,
                create:utcDate
            }
            let postRqst=this.$http.post('https://contact-managment-vue-default-rtdb.firebaseio.com/contacts.json',
            newContact);

            //return promise
            return {
                postRqst,
                newContact
            }
        },
        patchRequest(id, update){
            let date=new Date();
            let utcDate=date.toUTCString();
            // update existing contact
            let patchRqst=this.$http.patch('https://contact-managment-vue-default-rtdb.firebaseio.com/contacts/'+id+'.json',
            {...update, updated:utcDate});
            return patchRqst
        },
        getAllContactsRequest(){
            let getRqst=this.$http.get('https://contact-managment-vue-default-rtdb.firebaseio.com/contacts.json');
            return getRqst
        }
    }
}

export default httpRequests