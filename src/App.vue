<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <table class="centered">
      <tr>
        <th rowspan="3"></th>
        <th colspan="6">2017</th>
      </tr>
      <tr>
        <th colspan="2">Exposure</th>
        <th colspan="2">Total Risk</th>
        <th colspan="2">Contribution to Risk</th>
      </tr>
      <tr>
        <th>Fund</th>
        <th>Bench</th>
        <th>Fund</th>
        <th>Bench</th>
        <th>Fund</th>
        <th>Bench</th>
      </tr>
      <tr>
        <td>Max</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
      </tr>
      <tr>
        <td>Developed Markets</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
      </tr>
      <tr>
        <td>Middle East and Africa</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
        <td>88.3</td>
      </tr>
    </table>
  </div>
  
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import table from './table.json';

function isHidden(a: number, b: number): boolean {
  return false;
}

console.log(table);
console.log(table.tables.main.definition.columns[4])

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
}
</style>
