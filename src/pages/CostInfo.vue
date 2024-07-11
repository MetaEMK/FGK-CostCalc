<template>
  <h1>Update or Create</h1>
  <div>Testin</div>
  <div>
    <h2>{{ isNew ? 'Create New Cost' : 'Edit Cost' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input v-model="formData.name" id="name" required />
      </div>
      <div>
        <label for="type">Type:</label>
        <select v-model="formData.type" id="type" required>
          <option :value="CostType.PER_YEAR_COST">Per Year</option>
          <option :value="CostType.PER_HOUR_COST">Per Hour</option>
          <option :value="CostType.PLANE_PART_COST">Plane Part</option>
          <option :value="CostType.PER_DEPARTURE_COST">Per Departure</option>
        </select>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="formData.description" id="description"></textarea>
      </div>
      <div>
        <label for="costValue">Cost Value:</label>
        <input type="number" v-model="formData.costValue" id="costValue" required />
      </div>
      <button type="submit">Save</button>
    </form>
    <router-link to="/">
      <v-btn color="secondary">Zurück</v-btn>
    </router-link>
  </div>
</template>

<style scoped>
/* Add your styles hier */
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { Costs, CostType } from '@/data/costs'; // Import your types
import { useCostStore } from '@/stores/cost.store';

const costStore = useCostStore();
const props = defineProps<{ cost: Costs | null }>();

const isNew = ref(!props.cost);

const formData = ref<Costs>(props.cost || {
  name: '',
  type: CostType.PER_YEAR_COST,
  description: '',
  costValue: 0
});

const handleSubmit = () => {
  if (isNew.value) {
    // Ensure formData has all required fields for Costs
    const newCost: Costs = {
      id: formData.value.id,
      name: formData.value.name,
      type: formData.value.type,
      description: formData.value.description,
      costValue: formData.value.costValue,
    };
    costStore.createCost(newCost);
    console.log('Creating new cost:', newCost);
  } else {
    // Update existing cost
    console.log('Updating cost:', formData.value);
  }
};
</script>
