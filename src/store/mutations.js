const mutations={
    setContacts(state,contacts){
        state.contacts=contacts
    },
    deleteContact(state,id){
        state.contacts=state.contacts.filter(contact=>contact.id!==id);
    }
}

export default mutations