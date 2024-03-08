import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', () => {
  const guestData = ref({
    name: '',
    email: '',
    date: new Date(),
    numberOfGuests: 0,
    hotel: '',
    note: '',
    discountType: true, // true for percentage, false for fixed amount
    discount: '',
    items: [],
    selectedSuggestTour: []
  })

  const suggestTours = ref([])

  // Actions
  function addItem(item) {
    guestData.value.items.push(item)
  }

  function deleteItem(index) {
    guestData.value.items.splice(index, 1)
    if (guestData.value.items.length === 0) guestData.value.discount = ''
  }

  function setSuggestTour(tours) {
    suggestTours.value.push(tours)
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
  const getSuggestTour = computed(() => suggestTours.value)

  const getSelectedTour = computed(() =>
    guestData.value.selectedSuggestTour.map((tour) =>
      suggestTours.value.find((item) => item.id === tour)
    )
  )

  return {
    guestData,
    suggestTours,
    addItem,
    deleteItem,
    paymentTotal,
    paymentTotalWithDiscount,
    setSuggestTour,
    getSuggestTour,
    getSelectedTour
  }
})
