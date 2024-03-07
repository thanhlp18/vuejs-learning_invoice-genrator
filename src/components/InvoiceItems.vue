<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useCounterStore } from '@/stores/invoiceStore.js'
const store = useCounterStore()
const { guestData } = store
const { paymentTotal } = storeToRefs(store)
const tableData = guestData.items
</script>
<template>
  <el-table border :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="Items" width="400" />
    <el-table-column prop="price" label="Price"
      ><template #default="scope">
        <div class="flex flex-row justify-between">
          <span>$</span>
          <span>{{ scope.row.price }}</span>
        </div>
      </template></el-table-column
    >
    <el-table-column prop="qty" label="QTY" width="60" class="text-center" />
    <el-table-column prop="amount" label="AMT"
      ><template #default="scope">
        <div class="flex flex-row justify-between">
          <span>$</span>
          <span>{{ scope.row.amount }}</span>
        </div>
      </template></el-table-column
    >
  </el-table>

  <table class="ml-auto mt-2">
    <tr>
      <td>USD:</td>
      <td class="text-right font-semibold">{{ paymentTotal + ' $' }}</td>
    </tr>
    <tr class="border-b">
      <td>VND:</td>
      <td class="text-right font-semibold">
        {{
          (paymentTotal * 23000).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })
        }}
      </td>
    </tr>

    <tr class="w-full">
      <td>TOTAL:</td>
      <td class="text-right font-semibold" colspan="2">{{ paymentTotal + ' $' }}</td>
    </tr>
  </table>
</template>
