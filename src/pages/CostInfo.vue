<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>{{ !formData.id ? 'Create New Cost' : 'Edit Cost ' + formData.name }}</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="formData.name" label="Name" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="selectedType" :items="typeInfo" item-title="state" return-object label="Type"
                required />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="formData.description" label="Description" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="formData.costValue" type="number" label="Cost Value" required
                @input="validateNumberInput" inputmode="numeric" />
            </v-col>
          </v-row>
          <v-row>
            <v-container  v-if="selectedType.type === CostType.PLANE_PART_COST">
              <h3>Spezialfelder</h3>
              <v-col cols="12" md="6">
                <v-text-field v-model="formData.tbo" type="number" label="TBO in Stunden" required
                  inputmode="numeric" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="formData.maxYears" type="number" label="maximale Laufzeit in Jahren" required
                   inputmode="numeric" />
              </v-col>
            </v-container>
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
  DEBUG: {{ formData }}
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
import { Costs, CostType, PlaneParts } from '@/data/costs'; // Import your types
import { useCostStore } from '@/stores/cost.store';
import router from '@/router';

const costStore = useCostStore();
const props = defineProps<{ cost: Costs | null }>();

const typeInfo = [
  { state: "Pro Jahr", type: CostType.PER_YEAR_COST },
  { state: "Pro Flugstunde", type: CostType.PER_HOUR_COST },
  { state: "TODO PlanePart", type: CostType.PLANE_PART_COST }
];

const route = useRoute()
const selectedType = ref(typeInfo[0]);

const formData = ref<Costs|PlaneParts>({
  name: '',
  type: selectedType.value.type,
  description: '',
  costValue: 0
});

watch(selectedType, (newValue) => {
  formData.value.type = newValue.type;
});

onMounted(() => {
  let c: Costs | undefined
  const id = route.params.id

  if (id) {
    c = costStore.getCostById(id)
  } else if (props.cost?.id) {
    c = costStore.getCostById(props.cost.id)
  }

  if (c) {
    Object.assign(formData.value, c)
    typeInfo.forEach(t => {
      if (t.type === c.type) {
        selectedType.value = t
      }
    })
  }
})

const handleSubmit = () => {
  if (!formData.value.id) {
    costStore.createCost(formData.value);
  } else {
    costStore.updateCost(formData.value.id, formData.value)
    console.log('Updating cost:', formData.value);
  }
  router.back()
};

const validateNumberInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
  formData.value.costValue = parseInt(input.value, 10) || 0;
};
</script>
