<template>
  <v-container>
    <v-card style="padding: 20px;">
      <h1>{{ !formData.id ? 'Create New Cost' : 'Edit Cost ' + formData.name }}</h1>
      <v-form style="padding-top: 10px;" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.name" label="Name" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="selectedType" :items="typeInfo" item-title="state" return-object label="Type" required />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="formData.description" label="Description" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.costValue" type="number" label="Cost Value" required inputmode="numeric" />
          </v-col>
        </v-row>
        <v-row v-if="selectedType.type === CostType.PLANE_PART_COST">
          <h2 style="padding-left: 10px;">Spezialfelder:</h2>
        </v-row>
        <v-row v-if="selectedType.type === CostType.PLANE_PART_COST">
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.tbo" type="number" label="TBO in Stunden" required inputmode="numeric" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.maxYears" type="number" label="maximale Laufzeit in Jahren" required inputmode="numeric" />
          </v-col>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <div class="button-container">
          <v-btn color="primary" type="submit" class="mr-2" elevation="2">
            <v-icon left>mdi-content-save</v-icon> Save
          </v-btn>
          <v-btn color="error" @click="deleteItem()" v-if="formData.id" class="mr-2" elevation="2">
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
          <router-link to="/">
            <v-btn color="secondary" elevation="2">
              <v-icon left>mdi-arrow-left</v-icon> Zurück
            </v-btn>
          </router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 20px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.v-btn {
  margin-left: 8px;
}

.v-divider {
  margin: 24px 0;
}
</style>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Costs, CostType, PlaneParts } from '@/data/costs'; // Import your types
import { useCostStore } from '@/stores/cost.store';
import { useRoute, useRouter } from 'vue-router';

const costStore = useCostStore();
const props = defineProps<{ cost: Costs | null }>();

const typeInfo = [
  { state: "Pro Jahr", type: CostType.PER_YEAR_COST },
  { state: "Pro Flugstunde", type: CostType.PER_HOUR_COST },
  { state: "TODO PlanePart", type: CostType.PLANE_PART_COST }
];

const route = useRoute();
const router = useRouter();
const selectedType = ref(typeInfo[0]);

const formData = ref<Costs | PlaneParts>({
  name: '',
  type: selectedType.value.type,
  description: '',
  costValue: 0
});

watch(selectedType, (newValue) => {
  formData.value.type = newValue.type;
});

onMounted(() => {
  let c: Costs | undefined;
  const id = route.params.id;

  if (id) {
    c = costStore.getCostById(id);
  } else if (props.cost?.id) {
    c = costStore.getCostById(props.cost.id);
  }

  if (c) {
    Object.assign(formData.value, c);
    typeInfo.forEach(t => {
      if (t.type === c.type) {
        selectedType.value = t;
      }
    });
  }
});

const handleSubmit = () => {
  if (!formData.value.id) {
    costStore.createCost(formData.value);
  } else {
    costStore.updateCost(formData.value.id, formData.value);
    console.log('Updating cost:', formData.value);
  }
  router.back();
};

function deleteItem() {
  if (formData.value.id)
    costStore.removeCost(formData.value);
}
</script>
