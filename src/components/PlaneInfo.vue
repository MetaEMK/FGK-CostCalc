<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field v-model="costStore.plane.registration" label="Kennzeichen"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="costStore.plane.model" label="Flugzeugtyp"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="costStore.plane.expectedFlightTime" label="Ewartete Flugzeit pro Jahr" type="number"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useCostStore } from '@/stores/cost.store';

const costStore = useCostStore()
</script>