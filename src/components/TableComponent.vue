<template>
    <table v-if="table" class="stach-table centered">
      <caption><strong>My Tabular Data</strong></caption>
      <tr v-for="(row, rowIndex) in table"
      :key="rowIndex"
        v-bind:class="{ header : isHeader(row) }">
        <td v-for="(value, colIndex) in filteredCells(row.cells)"
        :key="colIndex"
          v-bind:rowspan="rowspan(row, colIndex)"
          v-bind:colspan="colspan(row, colIndex)"
          v-bind:style="{
              textAlign: alignment(row, colIndex, 'horizontal'),
              verticalAlign: alignment(row, colIndex, 'vertical')
          }">
              <div v-bind:style="{'padding-left': groupLevel(row, parseInt(colIndex)) + 'em'}">{{value}}</div>
        </td>
      </tr>
    </table>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import stach from '../stach-sdk/stach'

type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow
type IRow = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[] | null | undefined
type cells = stach.google.protobuf.IListValue | null | undefined

@Component
export default class TableComponent extends Vue {
  @Prop() private table!: IRow;

  isHeader (row: Row): boolean {
    return row.rowType === 'Header' as unknown
  }

  rowspan (row: Row, colIndex: string): number {
    return row.headerCellDetails?.[colIndex].rowspan ?? 1
  }

  colspan (row: Row, colIndex: string): number {
    return row.headerCellDetails?.[colIndex].colspan ?? 1
  }

  alignment (row: Row, colIndex: string, type: string): string {
    if (type === 'vertical') {
      return 'baseline'
    } else {
      return this.isHeader(row) ? 'center' as const : 'left' as const
    }
  }

  filteredCells (cells: cells): cells {
    return cells
  }

  groupLevel (row: Row, colIndex: number): number {
    return colIndex === 0 ? row.cellDetails?.[0].groupLevel ?? 0 : 0
  }
}
</script>

<style lang="scss">
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
.header {
  font-weight: bold;
}
</style>
