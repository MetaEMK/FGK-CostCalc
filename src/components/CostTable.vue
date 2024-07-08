<template>
    <div class="costItem">
        <h3>{{ props.title }}</h3>
        <component style="padding-top: 15px;" :is="componentName" :costs="costs" />
    </div>
</template>

<style scoped>
.costItem {
  width: 30%;
  min-width: 350px;
}
</style>

<script lang="ts" setup>
import { CostType, Costs } from '@/data/costs';
import { PropType, computed } from 'vue';
import DefaultCostTable from '@/components/CostTables/DefaultCostTable.vue';
import PlanePartTable from '@/components/CostTables/PlanePartTable.vue';

const props = defineProps({
    costs: {
        type: Object as PropType<Costs[]>,
        required: false
    },
    title: {
        type: String,
        required: true
    }
});

const componentName = computed(() => {
    if (Array.isArray(props.costs) && props.costs.length > 0) {
        switch (props.costs[0].type) {
            case CostType.PLANE_PART_COST:
                return PlanePartTable
            default:
                return DefaultCostTable
        }
    }
})
</script>
