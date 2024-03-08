<script setup>
import Form from '../components/Form.vue'
import InvoiceGenerator from '../components/InvoiceGenerator.vue'
import Airtable from 'airtable'
import { useInvoiceStore } from '@/stores/invoiceStore.js'
import domtoimage from 'dom-to-image'

function printInvoice() {
  const prtHtml = document.getElementById('my-invoice').innerHTML

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
    <link rel="stylesheet" crossorigin href="https://vuejs-learning-invoice-genrator.onrender.com/assets/index-Z9CRwAF2.css">
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

function exportInvoiceToImage() {
  domtoimage
    .toJpeg(document.getElementById('my-invoice-image'), { quality: 1 })
    .then(function (dataUrl) {
      var link = document.createElement('a')
      link.download = 'my-image-name.jpeg'
      link.href = dataUrl
      link.header = 'image/jpeg'
      link.click()
    })
}

const store = useInvoiceStore()
const { setSuggestTour } = store
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY
})
var base = Airtable.base('app2YDrtPfgKLrRIF')
base('Tour suggest')
  .select({
    // Selecting the first 3 records in All Projects:
    maxRecords: 3,
    view: 'All tour view'
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(async function (record) {
        await console.log('Retrieved', {
          id: record.id,
          ...record.fields
        })
        setSuggestTour({
          id: record.id,
          ...record.fields
        })
      })

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage()
    },
    function done(err) {
      if (err) {
        console.error(err)
        return
      }
    }
  )
</script>
<template>
  <div class="h-full w-full flex justify-center items-center bg-[#efe1c7]">
    <div class="max-w-[1280px] shadow-lg p-8 bg-gray-50">
      <h1 class="h1 font-bold uppercase text-center text-2xl my-2">
        Generate invoice for client system
      </h1>
      <el-container class="relative">
        <el-aside width="400px">
          <Form />
        </el-aside>
        <div class="my-2 absolute right-5 -top-4">
          <el-button class="flex flex-row" type="primary" @click="printInvoice">
            <span class="mr-2">Print</span> <el-icon><Printer /> </el-icon>
          </el-button>
          <el-button class="flex flex-row" type="secondary" @click="exportInvoiceToImage">
            <span class="mr-2">Export to image</span> <el-icon><Printer /> </el-icon>
          </el-button>
        </div>
        <el-main id="my-invoice" class="mt-2">
          <InvoiceGenerator id="my-invoice-image" />
        </el-main>
      </el-container>
    </div>
  </div>
</template>
