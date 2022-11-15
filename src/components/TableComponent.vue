<template>
    <table v-if="table" class="stach-table centered">
      <caption><strong>My Tabular Data</strong></caption>
      <tr v-for="(row, rowIndex) in table.rows"
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
import { ref } from 'vue'
import stach from '../stach-sdk/stach'

type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow
type Table = stach.factset.protobuf.stach.v2.RowOrganizedPackage.ITable
// const table = ref<stach.factset.protobuf.stach.v2.RowOrganizedPackage.ITableData | null | undefined>()
type cells = stach.google.protobuf.IListValue | null | undefined

// fetch('http://localhost:3000/data')
//   .then((response) => response.json())
//   .then((data) => {
//     const pkg = stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(data)
//     table.value = pkg.tables.main.data
//   })

@Component
export default class TableComponent extends Vue {
  @Prop() private table!: Table;

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
