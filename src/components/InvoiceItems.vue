<script lang="ts" setup>
import { useCounterStore } from '@/stores/invoiceStore.js'
import { ref } from 'vue'
const store = useCounterStore()
const tableData = store.guestData.items
const payment = ref({
  total: tableData.reduce((acc, item) => acc + Number(item.amount.split(' ')[0]), 0)
})
console.log(tableData)
</script>
<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="Items" width="400" />
    <el-table-column prop="price" label="Price" />
    <el-table-column prop="qty" label="QTY" width="60" class="text-center" />
    <el-table-column prop="amount" label="AMT" />
  </el-table>
  <div class="flex flex-col items-end mt-4">
    <div class="text-base grid grid-cols-4 w-40">
      <span class="col-span-2 text-right mr-2">USD: </span>
      <span class="font-semibold col-span-2 text-right">{{ payment.total + ' $' }}</span>
    </div>
    <div class="text-base grid grid-cols-4 w-40">
      <span class="col-span-2 text-right mr-2">VND: </span>
      <span class="font-semibold col-span-2 text-right">{{
        (payment.total * 23000).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND'
        })
      }}</span>
    </div>
    <el-divider class="!w-40 !my-2" />
    <div class="flex flex-col items-end">
      <div class="text-base grid grid-cols-4 w-40">
        <span class="col-span-2 text-right mr-2 text-lg">TOTAL: </span>
        <span class="font-semibold col-span-2 text-right text-lg">{{ payment.total + ' $' }}</span>
      </div>
    </div>
  </div>
</template>
