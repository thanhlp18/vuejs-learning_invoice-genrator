<script setup>
import Form from '../components/Form.vue'
import InvoiceGenerator from '../components/InvoiceGenerator.vue'

function printInvoice() {
  const prtHtml = document.getElementById('printMe').innerHTML

  let stylesHtml = ''
  for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
    stylesHtml += node.outerHTML
  }

  const WinPrint = window.open(
    '',
    '',
    'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
  )

  WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
    ${stylesHtml}
  </head>
  <body>
    ${prtHtml}
  </body>
</html>`)

  WinPrint.document.close()
  WinPrint.focus()
  WinPrint.print()
  WinPrint.close()
}
</script>
<template>
  <div class="mx-auto max-w-[1280px] mt-5 mb-5">
    <h1 class="h1 font-bold uppercase text-center text-2xl my-2">
      Generate invoice for client system
    </h1>
    <el-container class="relative">
      <el-aside width="400px"><Form /></el-aside
      ><el-button
        class="flex flex-row my-2 absolute right-20 -top-8"
        type="primary"
        @click="printInvoice"
      >
        <span class="mr-2">Print</span> <el-icon><Printer /> </el-icon>
      </el-button>
      <el-main id="printMe">
        <InvoiceGenerator />
      </el-main>
    </el-container>
  </div>
</template>
