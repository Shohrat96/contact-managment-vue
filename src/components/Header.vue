<template>
  <div class="container">
      <nav>
          <ul>
            <li><router-link to="/" exact>Contacts</router-link></li>
            <li><router-link to="/add" exact>Create</router-link></li>
          </ul>
      </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    
  }
}
</script>

<style scoped>
    ul{
        list-style-type: none;
        text-align: center;
        margin: 0;
    }
    nav{
        background-color: #444;
        padding: 14px 0;
        margin-bottom: 40px;
    }
    li{
         display: inline-block;
         margin: 0 10px;

     }
     a{
        text-decoration: none;
        color: white;
        padding: 6px 8px;
        border-radius: 10px;
     }
     a:hover{
        text-decoration: none;
        color: white;
     }
     a.router-link-exact-active{
         color: #444;
         background-color: white;
     }
    
</style>
