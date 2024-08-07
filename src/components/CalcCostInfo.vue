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

const costStore = useCostStore();

const perHourPrice = computed(() => {
    let costs: number = 0;
    if (costStore.calcPerHourCosts)
        costs = costs + costStore.calcPerHourCosts

    if (costStore.calcPerYearCosts)
        costs = costs + costStore.calcPerYearCosts

    if (costStore.calcPlanePartCosts)
        costs = costs + costStore.calcPlanePartCosts

    return costs;
});

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};
</script>
