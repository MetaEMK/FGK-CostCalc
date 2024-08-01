<template>
    <div>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-right">
                        €
                    </th>
                    <th class="text-right">
                        Aktionen
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in props.costs" :key="item.name">
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-right">{{ item.costValue }}</td>
                    <td class="text-right">
                        <v-btn variant="plain" density="compact" icon="mdi-delete" @click="askForDelete(item)"></v-btn>
                        <router-link :to="'/CostInfo/' + item.id">
                            <v-btn variant="plain" density="compact" icon="mdi-information"></v-btn>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>

    <v-dialog v-model="deleteDialog" width="500">
        <v-card>
            <v-card-title class="headline" primary-title>
                <span>Item löschen?</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <p class="text-subtitle-1">Willst du den Kostenpunkt: <strong>{{ deleteItem?.name }}</strong> wirklich
                    löschen?</p>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn color="grey" @click="deleteDialog = false; deleteItem = undefined">Nein</v-btn>
                <v-btn color="red" dark @click="deleteConfirmed()">Ja</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.buttonContainer {
    display: flex;
    align-items: center;
    gap: 3px;
}
</style>

<script lang="ts" setup>
import { Costs } from '@/data/costs';
import { useCostStore } from '@/stores/cost.store';
import { PropType } from 'vue';

const costStore = useCostStore()
const deleteDialog = ref(false)
const deleteItem = ref<Costs>()

const props = defineProps({
    costs: {
        type: Object as PropType<Costs[]>,
    },
})

function askForDelete(cost: Costs) {
    deleteItem.value = cost
    deleteDialog.value = true
}

function deleteConfirmed() {
    if (deleteItem.value) {
        costStore.removeCost(deleteItem.value)
    }

    deleteItem.value = undefined
    deleteDialog.value = false
}
</script>