const httpRequests={
    methods:{
        postRequest(obj){
            let date=new Date();
            let utcDate=date.toUTCString();
            let postRqst=this.$http.post('https://contact-managment-vue-default-rtdb.firebaseio.com/contacts.json',
            {...obj, created:utcDate});

            //return promise
            return postRqst
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