<script setup>
import { useCounterStore } from '@/stores/invoiceStore.js'
import { ref } from 'vue'
// access the `store` variable anywhere in the component ✨
const store = useCounterStore()
// do not use same name with ref
const { addItem, deleteItem, guestData } = store
const item = ref({
  name: '',
  price: 0,
  qty: 0,
  amt: 0
})

const onAddItem = () => {
  const calculatedAmountItem = {
    name: item.value.name,
    price: item.value.price,
    qty: item.value.qty,
    amount: item.value.price * item.value.qty
  }
  addItem(calculatedAmountItem)
  item.value = {
    name: '',
    price: 0,
    qty: 0,
    amt: 0
  }
}

function onDeleteItem(itemIndex) {
  deleteItem(itemIndex)
}
</script>

<script setup></script>
<template>
  <h2 class="font-semibold uppercase text-lg">Enter client information</h2>
  <el-form label-width="auto" style="max-width: 600px" class="flex flex-col">
    <el-form-item label="Traveler name">
      <el-input v-model="guestData.name" />
    </el-form-item>

    <el-form-item label="Phone">
      <el-input v-model="guestData.phone" type="phone" />
    </el-form-item>

    <el-form-item label="Email">
      <el-input v-model="guestData.email" type="email" />
    </el-form-item>

    <el-form-item label="Travel date:">
      <el-date-picker
        v-model="guestData.date"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="Number of guests">
      <el-input-number v-model="guestData.numberOfGuests" :min="1" :max="100" />
    </el-form-item>

    <el-form-item label="Hotel pick up">
      <el-input v-model="guestData.hotel" type="text" />
    </el-form-item>
    <el-form-item label="Hotel pick up">
      <el-input v-model="guestData.note" :rows="2" type="textarea" placeholder="Note..." />
    </el-form-item>

    <el-form-item label="Discount">
      <div class="flex flex-row flex-nowrap items-center w-full">
        <el-switch
          v-model="guestData.discountType"
          class="mr-2"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #409eff"
          active-text="%"
          inactive-text="$"
        /><el-input
          v-model="guestData.discount"
          type="text"
          class="flex-1"
          placeholder="Enter (%) or fixed amount ($)"
        />
      </div>
    </el-form-item>
  </el-form>
  <el-divider />
  <el-form label-width="auto" style="max-width: 600px" class="flex flex-col">
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
      v-for="(item, itemIndex) in guestData.items"
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
