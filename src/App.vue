<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="150" height="150">

    <TableComponent :table="table"/>
  </div>

</template>

<script setup lang="ts">

import TableComponent from './components/TableComponent.vue' // NOSONAR
import stach from '@/stach-sdk'
import stachRowOrganizedPackage from '../db.json'

type Table = stach.factset.protobuf.stach.v2.RowOrganizedPackage.ITable
const table: Table = stachRowOrganizedPackage.data.tables.main as unknown as Table

console.log(table)

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
.header {
  font-weight: bold;
}
</style>
