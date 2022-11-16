<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="150" height="150">

    <TableComponent :table="table"/>
  </div>

</template>

<script setup lang="ts">

import { ref } from 'vue'
import TableComponent from './components/TableComponent.vue' // NOSONAR
import stach from '@/stach-sdk'
type IRow = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[] | null | undefined;

const table = ref<IRow>()

fetch('http://localhost:3000/data')
  .then((response) => response.json())
  .then((data) => {
    const pkg = stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(data)
    table.value = pkg.tables.main.data?.rows
  })

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
</style>
