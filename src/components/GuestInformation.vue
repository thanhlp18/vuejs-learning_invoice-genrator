<script setup>
import { useCounterStore } from '@/stores/invoiceStore.js'
const store = useCounterStore()
const guestData = store.guestData
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold">Invoice To</h1>
    <div class="grid grid-cols-2">
      <div class="flex flex-row flex-nowrap">
        <span class="mr-2">Traveler name:</span>
        <p>{{ guestData.name }}</p>
      </div>
      <div class="flex flex-row flex-nowrap">
        <span class="mr-2">No.guests:</span>
        <p>{{ guestData.numberOfGuests }}</p>
      </div>
      <div class="flex flex-row flex-nowrap">
        <span class="mr-2">Phone:</span>
        <p>{{ guestData.phone }}</p>
      </div>
      <div class="flex flex-row flex-nowrap">
        <span class="mr-2">Email:</span>
        <p>{{ guestData.email }}</p>
      </div>
      <div class="flex flex-row flex-nowrap">
        <span class="mr-2">Travel date:</span>
        <p>
          {{
            guestData.date.toLocaleDateString('en-GB', {
              weekday: 'short',
              year: 'numeric',
              month: '2-digit',
              day: 'numeric'
            })
          }}
        </p>
      </div>
      <div class="flex flex-row flex-nowrap">
        <span class="mr-2">hotel pick up:</span>
        <p>{{ guestData.hotel }}</p>
      </div>
    </div>
  </div>
</template>
