<template>
  <div>
    <form id="search">
    Search <input id="query" v-model="searchQuery">
    </form>
    <table class="stach-table centered">
      <caption><strong>My Tabular Data</strong></caption>
      <tr v-for="(row, rowIndex) in filteredTable()"
      :key="rowIndex"
        v-bind:class="{ header : isHeader(row) }">
        <td v-for="(value, colIndex) in row.cells"
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
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue'
import stach from '../stach-sdk/stach'
import {
  isHeader,
  rowspan,
  colspan,
  alignment,
  groupLevel
} from './features/features'

type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow
type IRow = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[] | null | undefined
type cell = stach.google.protobuf.IListValue | null | undefined
type RowType = stach.factset.protobuf.stach.v2.RowOrganizedPackage.Row.RowType;

export default defineComponent({
  props: {
    table: Array as PropType<IRow>
  },

  setup (props) {
    const searchQuery = ref('')

    const filteredTable = (): IRow => {
      return props.table?.filter(row => filteredRows(row))
    }

    const filteredRows = (row: Row): boolean => {
      const filterKey = searchQuery.value.toLowerCase()
      if (Array(row.cells).some((cell: cell) =>
        String(cell).toLowerCase().indexOf(filterKey) > -1) ||
      isHeader(row)) {
        return true
      } else {
        return false
      }
    }

    return {
      isHeader,
      rowspan,
      colspan,
      groupLevel,
      alignment,
      filteredTable,
      filteredRows,
      searchQuery
    }
  }
})
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
#search {
  text-align: center;
  margin-right: 22.5em;
}
</style>
