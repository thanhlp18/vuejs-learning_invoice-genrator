import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('invoice', () => {
  const guestData = ref({
    name: '',
    email: '',
    date: new Date(),
    numberOfGuests: 0,
    hotel: '',
    note: '',
    items: []
  })

  // Actions
  function addItem(item) {
    console.log(item)
    guestData.value.items.push(item)
    console.log(guestData.value.items)
  }

  function deleteItem(index) {
    guestData.value.items.splice(index, 1)
  }

  // Getters
  const paymentTotal = computed(() => {
    return guestData.value.items.reduce((acc, item) => acc + item.price, 0)
  })

  return { guestData, addItem, deleteItem, paymentTotal }
})
