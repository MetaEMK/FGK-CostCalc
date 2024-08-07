<template>
    <v-container v-if="perHourPrice">
        <h2>Kostenzusammensetzung: {{ formatCurrency(perHourPrice) }} € pro Stunde</h2>
        <v-row>
            <v-col cols="12">
                <v-list lines="one">
                    <v-list-item v-if="costStore.calcPerHourCosts > 0" title="Stundenkosten: "
                        :subtitle="formatCurrency(costStore.calcPerHourCosts) + ' €'">
                    </v-list-item>
                    <v-list-item v-if="costStore.calcPerYearCosts! > 0" title="Jahreskosten (anteilig):"
                        :subtitle="formatCurrency(costStore.calcPerYearCosts!) + ' €'">
                    </v-list-item>
                    <v-list-item v-if="costStore.calcPlanePartCosts! > 0" title="Flugzeugteile-Kosten"
                        :subtitle="formatCurrency(costStore.calcPlanePartCosts!) + ' €'">
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCostStore } from '@/stores/cost.store';
import { formatCurrency } from '@/composables/concurrency.formatter';

const costStore = useCostStore();

const perHourPrice = computed(() => {
    let costs: number = 0;
    if (costStore.calcPerHourCosts > 0) {
        costs = costs + Number(costStore.calcPerHourCosts)
    }
    console.log(costs)

    if (costStore.calcPerYearCosts > 0) {
        costs = costs + Number(costStore.calcPerYearCosts)
    }

    console.log(costs)
    if (costStore.calcPlanePartCosts > 0) {
        costs = costs + Number(costStore.calcPlanePartCosts)
    }

    console.log(costs)
    return costs;
});

</script>
