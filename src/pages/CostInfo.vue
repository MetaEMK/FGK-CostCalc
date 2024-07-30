<template>
  <v-container class="my-5">
    <v-card>
      <v-card-title>
        <h1>{{ isNew ? 'Create New Cost' : 'Edit Cost ' + props.cost?.name }}</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field 
                v-model="formData.name" 
                label="Name" 
                required 
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select 
                v-model="selectedType" 
                :items="typeInfo" 
                item-title="state" 
                return-object 
                label="Type" 
                required 
              />
            </v-col>
            <v-col cols="12">
              <v-textarea 
                v-model="formData.description" 
                label="Description" 
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
                v-model="formData.costValue" 
                type="number" 
                label="Cost Value" 
                required 
                @input="validateNumberInput" 
                inputmode="numeric" 
              />
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn color="primary" type="submit">Save</v-btn>
            <router-link to="/">
              <v-btn color="secondary">Zurück</v-btn>
            </router-link>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
}

.v-card {
  padding: 20px;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Costs, CostType } from '@/data/costs'; // Import your types
import { useCostStore } from '@/stores/cost.store';

const costStore = useCostStore();
const props = defineProps<{ cost: Costs | null }>();

const typeInfo = [
  { state: "Pro Jahr", type: CostType.PER_YEAR_COST },
  { state: "Pro Flugstunde", type: CostType.PER_HOUR_COST },
  { state: "Pro Start", type: CostType.PER_DEPARTURE_COST },
  { state: "TODO PlanePart", type: CostType.PLANE_PART_COST }
];

const isNew = ref(!props.cost);
const selectedType = ref(typeInfo[0]);

const formData = ref<Costs>(props.cost || {
  name: '',
  type: selectedType.value.type,
  description: '',
  costValue: 0
});

watch(selectedType, (newValue) => {
  formData.value.type = newValue.type;
});

const handleSubmit = () => {
  const newCost: Costs = {
    id: formData.value.id,
    name: formData.value.name,
    type: formData.value.type,
    description: formData.value.description,
    costValue: formData.value.costValue,
  };

  if (isNew.value) {
    costStore.createCost(newCost);
    console.log('Creating new cost:', newCost);
  } else {
    console.log('Updating cost:', formData.value);
  }
};

const validateNumberInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
  formData.value.costValue = parseInt(input.value, 10) || 0;
};
</script>
