<template>
    <table v-if="table" class="stach-table centered">
      <caption><strong>My Tabular Data</strong></caption>
      <tr v-for="(row, rowIndex) in table.data.rows"
      :key="rowIndex"
        v-bind:class="{ header : isHeader(row as unknown as Row) }">
        <td v-for="(value, colIndex) in filteredCells(row.cells as string[])"
        :key="colIndex"
          v-bind:rowspan="rowspan(row as unknown as Row, colIndex)"
          v-bind:colspan="colspan(row as unknown as Row, colIndex)"
          v-bind:style="{
              textAlign: alignment(row as unknown as Row, colIndex, 'horizontal') as unknown,
              verticalAlign: alignment(row as unknown as Row, colIndex, 'vertical')
          }">
              <div v-bind:style="{'padding-left': groupLevel((row as unknown as Row), colIndex) + 'em'}">{{value}}</div>
        </td>
      </tr>
    </table>
</template>

<script setup lang="ts">

import tableJson from '../table.json'
import stach from '../stach-sdk/stach'

type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.Row

const table = tableJson.tables.main

function isHidden (): boolean {
  return false
}

function isHeader (row: Row): boolean {
  return row.rowType === 'Header' as unknown
}

function rowspan (row: Row, colIndex: number): number {
  return row.headerCellDetails?.[colIndex].rowspan ?? 1
}

function colspan (row: Row, colIndex: number): number {
  return row.headerCellDetails?.[colIndex].colspan ?? 1
}

function alignment (row: Row, colIndex: number, type: string): string {
  return type === 'vertical' ? 'baseline' : isHeader(row) ? 'center' as const : 'left' as const
}

function filteredCells (cells: string[]): string[] {
  return cells.filter(() => !isHidden())
}

function groupLevel (row: Row, colIndex: number): number {
  return colIndex === 0 ? row.cellDetails?.[0].groupLevel ?? 0 : 0
}

</script>
