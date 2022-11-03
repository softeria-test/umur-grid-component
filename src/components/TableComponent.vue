<template>
    <table v-if="table" class="stach-table centered">
      <tr v-for="(row, rowIndex) in table.data.rows"
      :key="rowIndex"
        v-bind:class="{ header : isHeader(row) }">
        <td v-for="(value, colIndex) in filteredCells(row.cells)"
        :key="colIndex"
          v-bind:rowspan="rowspan(row, colIndex)"
          v-bind:colspan="colspan(row, colIndex)"
          v-bind:style="{
              textAlign: 'left',
              verticalAlign: alignment(row, colIndex, 'vertical')
          }">
              <div v-bind:style="{'padding-left': groupLevel(row, colIndex) + 'em'}">
                <b v-if="isHeader(row)">{{value}}</b>
                <div v-if="!isHeader(row)">{{value}}</div>
              </div>
        </td>
      </tr>
    </table>
</template>

<script setup lang="ts">

import tableJson from '../table.json';

const table = tableJson.tables.main;

// console.log(table.definition.columns[1].format?.halign);

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

function filteredCells(cells: any): any {
  return cells.filter((cell: any) => !isHidden(cell, 0))
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