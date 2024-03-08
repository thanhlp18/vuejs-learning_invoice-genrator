<script setup>
import { useInvoiceStore } from '@/stores/invoiceStore'
import { storeToRefs } from 'pinia'
import QrcodeVue from 'qrcode.vue'

const store = useInvoiceStore()
const { getSelectedTour } = storeToRefs(store)
console.log(getSelectedTour)
</script>

<template>
  <div v-if="getSelectedTour" class="flex flex-col gap-4">
    <h2 class="font-semibold text-xl capitalize">Suggestion for you!</h2>
    <div v-for="suggestion in getSelectedTour" :key="suggestion.id" class="grid grid-cols-12 gap-4">
      <div class="col-span-5">
        <img :src="suggestion.image[0].url" />
      </div>
      <div class="col-span-5">
        <h2 class="font-bold text-[#f98125]">{{ suggestion.tourName }}</h2>
        <p class="text-base text-[#0d1a43]">{{ suggestion.description }}</p>
      </div>

      <div class="col-span-2">
        <p class="text-sm text-center mb-2">Check it out!</p>
        <qrcode-vue :value="suggestion.link" size="100" level="H" render-as="svg" />
      </div>
    </div>
  </div>
</template>
