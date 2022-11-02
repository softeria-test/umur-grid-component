<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->

    <table v-if="table" class="stach-table centered" v-bind:style="style">
      <tr v-for="(row, rowIndex) in table.data.rows"
      :key="row"
        v-bind:class="{ header : isHeader(row) }">
        <td v-for="(value, colIndex) in row.cells"
        :key="row"
          v-if="!isHidden(row, colIndex)"
          v-bind:rowspan="rowspan(row, colIndex)"
          v-bind:colspan="colspan(row, colIndex)"
          v-bind:style="{
              textAlign: alignment(row, colIndex, 'horizontal'),
              verticalAlign: alignment(row, colIndex, 'vertical')
          }">
              <div v-bind:style="{'padding-left': groupLevel(row, colIndex) + 'em'}">
                <b v-if="isHeader(row)">{{value}}</b>
                <div v-if="!isHeader(row)">{{value}}</div>
              </div>
        </td>
      </tr>
    </table>
  </div>
  
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import tableJson from './table.json';

const table = tableJson.tables.main;

console.log(tableJson);
console.log(isHeader(table.data.rows[0]));
console.log(groupLevel(table.data.rows[7], 0));
console.log(groupLevel(table.data.rows[8], 1));
// console.log(groupLevel(table.data.rows[0], 2));

function isHidden(a: number, b: number): boolean {
  return false;
}

function isHeader(row: any): boolean {
  return row.rowType === 'Header';
}

// Checks whether the row has the headerCellDetails property or not.
// Then, repeats the same process for rowspan property.
function rowspan(row: any, colIndex: number): number {
  if(row.hasOwnProperty('headerCellDetails') 
  && row.headerCellDetails[colIndex].hasOwnProperty('rowspan')){
    return row.headerCellDetails[colIndex].rowspan;
  }
  else {
    return 1;
  }
}

// Checks whether the row has the headerCellDetails property or not.
// Then, repeats the same process for colspan property.
function colspan(row: any, colIndex: number): number {
  if(row.hasOwnProperty('headerCellDetails') 
  && row.headerCellDetails[colIndex].hasOwnProperty('colspan')){
    return row.headerCellDetails[colIndex].colspan;
  }
  else {
    return 1;
  }
}

function alignment(row: any, colIndex: number, type: string): string {
  if(type === "vertical"){
    return "baseline";
  }
  else{
    return "left";
  }
}

// If the row has cellDetails property and its colIndex is 0,
// returns the groupLevel property from the cellDetails property of the row.
function groupLevel(row: any, colIndex: number): number {
  if(row.hasOwnProperty('cellDetails') && colIndex == 0){
    return row.cellDetails[0].groupLevel;
  }
  else {
    return 0;
  }
}

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
