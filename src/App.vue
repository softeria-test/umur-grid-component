<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="150" height="150">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->

    <TableComponent></TableComponent>
  </div>

</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue';

import TableComponent from './components/TableComponent.vue';

// console.log(tableJson);
// console.log(isHeader(table.data.rows[0]));
// console.log(groupLevel(table.data.rows[7], 0));
// console.log(groupLevel(table.data.rows[8], 1));
// console.log(groupLevel(table.data.rows[0], 2));


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
}
.centered {
 margin-left: auto;
 margin-right: auto;
 margin-top: 20px;
}
</style>
