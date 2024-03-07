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
    discountType: true, // true for percentage, false for fixed amount
    discount: '',
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
    return guestData.value.items.reduce((acc, item) => acc + item.price * item.qty, 0)
  })

  const paymentTotalWithDiscount = computed(() => {
    const total = paymentTotal.value
    if (total === 0) return 0
    if (!guestData.value.discountType && guestData.value.discount > total) return 0
    const discountPrice = guestData.value.discountType
      ? total - (total * guestData.value.discount) / 100
      : total - guestData.value.discount
    return Number(discountPrice)
  })

  return { guestData, addItem, deleteItem, paymentTotal, paymentTotalWithDiscount }
})
