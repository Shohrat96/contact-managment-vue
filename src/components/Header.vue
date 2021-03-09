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
     .router-link-active{
         background-color: #eee;
         color: #444;
     }
     a{
         text-decoration: none;
         padding: 6px 8px;
         color: #fff;
         border-radius: 10px;
     }
     a :hover{
         color: black !important;
         text-decoration: none !important;
     }
</style>
