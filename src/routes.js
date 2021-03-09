import ContactsPage from "./Pages/ContactsPage.vue"
import AddContact from "./Pages/AddContact.vue"

export default [
    {
        path:"/",
        component:ContactsPage,
    },
    {
        path:"/add",
        component:AddContact
    },
    {
        path:"/contacts/:id", 
        component:AddContact,
        name:"contact"
    }
]