<template>
  <div>
    <h1>Kostenrechner: {{ costStore.plane?.model }}: {{ costStore.plane?.registration }}</h1>
  </div>

  <div>
    <p>
      HIER KOMMT DAS KOSTENPANEL HIN, WAS BESAGT WIE VIEL DIE MASCHINE PRO STUNDE KOSTET
    </p>
  </div>

  <v-divider></v-divider>
  
  <div class="costContainer">
    <cost-table title="PerHourCosts" :costs="costStore.perHourCosts"></cost-table>
    <cost-table title="PlaneParts" :costs="costStore.planeParts"></cost-table>
    <cost-table title="PerYearCosts" :costs="costStore.perYearCosts"></cost-table>
    <cost-table title="PerDepartureCosts" :costs="costStore.perDepartureCosts"></cost-table>
  </div>

</template>

<style scoped>

.costContainer {
  display: flex;
  padding-top: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  width: 100%;

  gap: 15px;
}



</style>

<script lang="ts" setup>
import { useCostStore } from '@/stores/cost.store';

const costStore = useCostStore()
onMounted(() => {
  costStore.plane = {
    registration: "D-MFGK",
    model: "Dynamic WT9"
  }

  costStore.seedStore()
})
</script>
