<script setup>
import { useCounterStore } from '@/stores/invoiceStore.js'
import { ref } from 'vue'
// access the `store` variable anywhere in the component ✨
const store = useCounterStore()
// do not use same name with ref
const { name, phone, email, date, numberOfGuests, hotel, note, items } = store.guestData
const { addItem, deleteItem } = store
const item = ref({
  name: '',
  price: '',
  qty: '',
  amt: ''
})
const onAddItem = () => {
  const calculatedAmountItem = {
    name: item.value.name,
    price: item.value.price + ' USD',
    qty: item.value.qty,
    amount: item.value.price * item.value.qty + ' USD'
  }
  console.log(calculatedAmountItem)
  addItem(calculatedAmountItem)
}

function onDeleteItem(itemIndex) {
  deleteItem(itemIndex)
}
</script>

<script setup></script>
<template>
  <h2 class="font-semibold uppercase text-lg">Enter client information</h2>
  <el-form :model="form" label-width="auto" style="max-width: 600px" class="flex flex-col">
    <el-form-item label="Traveler name">
      <el-input v-model="name" />
    </el-form-item>

    <el-form-item label="Phone">
      <el-input v-model="phone" type="phone" />
    </el-form-item>

    <el-form-item label="Email">
      <el-input v-model="email" type="email" />
    </el-form-item>

    <el-form-item label="Travel date:">
      <el-date-picker v-model="date" type="date" placeholder="Pick a date" style="width: 100%" />
    </el-form-item>
    <el-form-item label="Number of guests">
      <el-input-number v-model="numberOfGuests" :min="1" :max="100" />
    </el-form-item>

    <el-form-item label="Hotel pick up">
      <el-input v-model="hotel" type="text" />
    </el-form-item>
    <el-form-item label="Hotel pick up">
      <el-input v-model="note" :rows="2" type="textarea" placeholder="Note..." />
    </el-form-item>
  </el-form>
  <el-divider />
  <el-form :model="form" label-width="auto" style="max-width: 600px" class="flex flex-col">
    <h2 class="font-semibold uppercase text-lg">Add items</h2>
    <el-form-item label="Item">
      <el-input
        v-model="item.name"
        type="text"
        placeholder="Cai Rang Floating market and cacao farm pick up in Sai Gon"
      />
    </el-form-item>
    <el-form-item label="Price (USD)">
      <el-input v-model="item.price" type="number" placeholder="15" />
    </el-form-item>
    <el-form-item label="Quantity">
      <el-input v-model="item.qty" type="number" placeholder="1" />
    </el-form-item>
    <el-button type="primary" class="ml-0 w-fit self-end" @click="onAddItem">Add item</el-button>
  </el-form>
  <el-divider />
  <div>
    <h2 class="font-semibold uppercase text-lg">Added items</h2>

    <div
      v-for="(item, itemIndex) in items"
      :key="itemIndex"
      class="flex flex-row w-full justify-between gap-1"
    >
      <span class="cursor-default">{{ item.name }}</span>
      <span @click="onDeleteItem(itemIndex)"
        ><el-icon><CloseBold class="text-red-600 cursor-pointer" /></el-icon
      ></span>
    </div>
  </div>
</template>
