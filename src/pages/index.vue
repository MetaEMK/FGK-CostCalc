<template>
  <v-container>
    <v-card style="padding: 20px;">
      <h1>
        Kostenrechner: {{ costStore.plane?.model }}: {{ costStore.plane?.registration }}
      </h1>
      <v-card-text>
        <v-row>
          <plane-info></plane-info>
        </v-row>
        <v-row>
          <calc-cost-info></calc-cost-info>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <v-row class="costContainer" justify="center">
          <v-col :lg="lgValue" :md="mdValue" class="d-flex">
            <v-card  class="ma-2 flex-grow-1" outlined>
              <v-card-title>Kosten: Pro Stunde</v-card-title>
              <cost-table :costs="costStore.perHourCosts"></cost-table>
            </v-card>
          </v-col>
          <v-col :lg="lgValue" :md="mdValue" class="d-flex">
            <v-card class="ma-2 flex-grow-1" outlined>
              <v-card-title>Kosten: Pro TODO PlanePart</v-card-title>
              <cost-table :costs="costStore.planeParts"></cost-table>
            </v-card>
          </v-col>
          <v-col :lg="lgValue" :md="mdValue" class="d-flex">
            <v-card class="ma-2 flex-grow-1" outlined>
              <v-card-title>Kosten: Pro Jahr</v-card-title>
              <cost-table :costs="costStore.perYearCosts"></cost-table>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-right my-4">
          <router-link to="/costinfo">
            <v-btn icon color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </router-link>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.text-right {
  text-align: right;
}
</style>

<script lang="ts" setup>
import { useCostStore } from '@/stores/cost.store';

const mdValue = 8
const lgValue = 4

const costStore = useCostStore();
</script>
