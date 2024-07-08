<template>
    <div>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Beschreibung</th>
                    <th class="text-right">Kostenwert</th>
                    <th class="text-right">TBO</th>
                    <th class="text-right">Max Jahre</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in props.costs" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.costValue }}</td>
                    <td>{{ item.tbo }}</td>
                    <td>{{ item.maxYears }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script lang="ts" setup>
import { PlaneParts } from '@/data/costs';
import { PropType } from 'vue';

const props = defineProps({
    costs: {
        type: Object as PropType<PlaneParts[]>,
    },
})
</script>
