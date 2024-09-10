<template>
    <div class="container">
        <v-tooltip location="start" text="Importieren">
            <template v-slot:activator="{ props }">
                <v-btn @click="importData" color="secondary" icon v-bind="props">
                    <v-icon left>mdi-import</v-icon>
                </v-btn>
            </template>
        </v-tooltip>
        <v-tooltip location="end" text="Exportieren">
            <template v-slot:activator="{ props }">
                <v-btn @click="exportData" color="primary" icon v-bind="props">
                    <v-icon left>mdi-export</v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    gap: 10px;
}
</style>

<script lang="ts" setup>
import { Plane } from '@/data/plane';
import { Costs } from '@/data/costs';
import { useCostStore } from '@/stores/cost.store';
import { ref } from 'vue';

const costStore = useCostStore();
const impData = ref<ExportData>();

interface ExportData {
  plane: Plane,
  items: Costs[],
}

const exportData = () => {
    const expData: ExportData = {
        plane: costStore.plane,
        items: costStore.allCosts
    };
    const blob = new Blob([JSON.stringify(expData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'test.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const importData = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target?.result as string);
                    impData.value = jsonData as ExportData;
                    costStore.plane = impData.value.plane
                    costStore.allCosts = impData.value.items
                } catch (error) {
                    console.error('Fehler beim Lesen der JSON-Datei', error);
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
};
</script>
