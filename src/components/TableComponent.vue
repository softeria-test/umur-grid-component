<template>
    <table v-if="table" class="stach-table centered">
      <caption><strong>My Tabular Data</strong></caption>
      <tr v-for="(row, rowIndex) in table.data.rows"
      :key="rowIndex"
        v-bind:class="{ header : isHeader(row as Row) }">
        <td v-for="(value, colIndex) in filteredCells(row.cells)"
        :key="colIndex"
          v-bind:rowspan="rowspan(row as Row, colIndex)"
          v-bind:colspan="colspan(row as Row, colIndex)"
          v-bind:style="{
              textAlign: alignment(row as Row, colIndex, 'horizontal'),
              verticalAlign: alignment(row as Row, colIndex, 'vertical')
          }">
              <div v-bind:style="{'padding-left': groupLevel(row as Row, colIndex) + 'em'}">{{value}}</div>
        </td>
      </tr>
    </table>
</template>

<script setup lang="ts">

import tableJson from '../table.json'

type CellDetails = {
  groupLevel: number
}

type HeaderCellDetails = {
  rowspan: number,
  colspan: number,
  columnIndex: number,
  source: string
}

type Row = {
  cells: (string | number | null)[],
  headerCellDetails?: (HeaderCellDetails | string)[],
  cellDetails?: CellDetails[],
  rowType?: string,
}

const table = tableJson.tables.main

function isHidden (): boolean {
  return false
}

function isHeader (row: Row): boolean {
  return row.rowType === 'Header'
}

// Checks whether the row has the headerCellDetails property or not.
// Then, repeats the same process for rowspan property.
function rowspan (row: Row, colIndex: number): number {
  if (Object.hasOwn(row, 'headerCellDetails') &&
  row.headerCellDetails !== undefined &&
  Object.hasOwn(row.headerCellDetails[colIndex] as object, 'rowspan')) {
    return (row.headerCellDetails[colIndex] as HeaderCellDetails).rowspan
  } else {
    return 1
  }
}

// Checks whether the row has the headerCellDetails property or not.
// Then, repeats the same process for colspan property.
function colspan (row: Row, colIndex: number): number {
  if (Object.hasOwn(row, 'headerCellDetails') &&
  row.headerCellDetails !== undefined &&
  Object.hasOwn(row.headerCellDetails[colIndex] as object, 'colspan')) {
    return (row.headerCellDetails[colIndex] as HeaderCellDetails).colspan
  } else {
    return 1
  }
}

function alignment (row: Row, colIndex: number, type: string): string {
  if (type === 'vertical') {
    return 'baseline'
  } else {
    if (isHeader(row)) {
      return 'center'
    }
    return 'left'
  }
}

function filteredCells (cells: Row['cells']): Row['cells'] {
  return cells.filter(() => !isHidden())
}

// If the row has cellDetails property and its colIndex is 0,
// returns the groupLevel property from the cellDetails property of the row.
function groupLevel (row: Row, colIndex: number): number {
  if (Object.hasOwn(row, 'cellDetails') &&
  colIndex === 0 &&
  row.cellDetails !== undefined) {
    return row.cellDetails[0].groupLevel
  } else {
    return 0
  }
}

</script>
