import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('invoice', () => {
  const guestData = ref({
    name: '',
    email: '',
    date: new Date(),
    numberOfGuests: '',
    hotel: '',
    note: '',
    items: [
      {
        id: '0',
        name: 'cb172b82-9e82-4cc8-b7ac-715aca42df4c',
        qty: 1,
        price: '15 USD',
        amount: '15 USD'
      },
      {
        id: '1',
        name: 'f6c9c0a3-c148-4016-b147-4c7fd89f2851',
        qty: 1,
        price: '15 USD',
        amount: '15 USD'
      },
      {
        id: '2',
        name: 'ad6bfd77-85fe-42d4-9fac-66f0a95142f5',
        qty: 1,
        price: '15 USD',
        amount: '15 USD'
      },
      {
        id: '3',
        name: '90666569-f1cb-40a8-abd4-e114eef7abfc',
        qty: 1,
        price: '15 USD',
        amount: '15 USD'
      }
    ]
  })

  //   Actions
  function addItem(item) {
    guestData.value.items.push(item)
  }

  function deleteItem(index) {
    guestData.value.items.splice(index, 1)
  }
  return { guestData, addItem, deleteItem }
})
