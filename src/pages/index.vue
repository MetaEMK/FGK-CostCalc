<template>
  <v-container class="my-5">
    <v-card>
      <v-card-title class="text-h5">
        Kostenrechner: {{ costStore.plane?.model }}: {{ costStore.plane?.registration }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-alert type="info" outlined>
              {{ costStore.calcPerYearCosts + costStore.calcPerHourCosts + costStore.calcPlanePartCosts }}
            </v-alert>
          </v-col>
          <v-col cols="12" class="text-center">
            <router-link to="/costinfo">
              <v-btn color="primary">Go to Info Page</v-btn>
            </router-link>
          </v-col>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <v-row class="costContainer" justify="center">
          <v-col cols="12" md="6" class="d-flex">
            <v-card class="ma-2 flex-grow-1" outlined>
              <v-card-title>Kosten: Pro Stunde</v-card-title>
              <cost-table :costs="costStore.perHourCosts"></cost-table>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="d-flex">
            <v-card class="ma-2 flex-grow-1" outlined>
              <v-card-title>Kosten: Pro TODO PlanePart</v-card-title>
              <cost-table :costs="costStore.planeParts"></cost-table>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="d-flex">
            <v-card class="ma-2 flex-grow-1" outlined>
              <v-card-title>Kosten: Pro Jahr</v-card-title>
              <cost-table :costs="costStore.perYearCosts"></cost-table>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useCostStore } from '@/stores/cost.store';

const costStore = useCostStore();

onMounted(() => {
  costStore.plane = {
    registration: "D-MFGK",
    model: "Dynamic WT9",
    expectedFlightTime: 120,
  };
});
</script>
