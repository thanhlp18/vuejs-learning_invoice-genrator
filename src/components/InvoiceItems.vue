<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useInvoiceStore } from '@/stores/invoiceStore.js'
const store = useInvoiceStore()
const { guestData } = store
const { paymentTotal, paymentTotalWithDiscount } = storeToRefs(store)
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

  <div class="mt-2 flex flex-row flex-nowrap justify-between">
    <div class="">
      <p class="font-medium">Note:</p>
      <div class="line-clamp-4 h-fit mr-4">{{ guestData.note }}</div>
    </div>
    <table class="">
      <tr>
        <td class="pr-4">USD:</td>
        <td class="text-right font-semibold">{{ Number(paymentTotal).toFixed(2) + ' $' }}</td>
      </tr>
      <tr class="border-b">
        <td class="pr-4">VND:</td>
        <td class="text-right font-semibold">
          {{
            (Number(paymentTotal).toFixed(0) * 23000).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })
          }}
        </td>
      </tr>
      <tr class="border-b">
        <td class="pr-4">DISCOUNT:</td>
        <td class="text-right font-semibold">
          {{ guestData.discount }} {{ guestData.discountType ? '%' : '$' }}
        </td>
      </tr>

      <tr class="w-full">
        <td class="pr-4 font-semibold text-lg">TOTAL:</td>
        <td class="text-right font-semibold text-lg" colspan="2">
          {{ paymentTotalWithDiscount + ' $' }}
        </td>
      </tr>
    </table>
  </div>
</template>
