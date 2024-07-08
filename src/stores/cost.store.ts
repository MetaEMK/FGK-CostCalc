import { CostType, Costs, PerDepartureCost, PerHourCost, PerYearCost, PlaneParts } from "@/data/costs";
import { Plane } from "@/data/plane";
import { defineStore } from "pinia";

export const useCostStore = defineStore("cost", () => {
    const plane = ref<Plane>()
    const allCosts = ref<Costs[]>([])

    const planeParts = computed(() => allCosts.value.filter(e => e.type === CostType.PLANE_PART_COST))
    const perHourCosts = computed(() => allCosts.value.filter(e => e.type === CostType.PER_HOUR_COST))
    const perDepartureCosts = computed(() => allCosts.value.filter(e => e.type === CostType.PER_DEPARTURE_COST))
    const perYearCosts = computed(() => allCosts.value.filter(e => e.type === CostType.PER_YEAR_COST))

    function checkIfCostNameIsUnique(name: string, type: CostType): boolean {
        const costs = allCosts.value.filter(el => el.name === name && el.type === type)
        return costs.length === 0
    }

    function addPerHourCost(cost: PerHourCost) {
        cost.type = CostType.PER_HOUR_COST
        if (checkIfCostNameIsUnique(cost.name, cost.type))
            allCosts.value.push(cost)
    }

    function addPerYearCost(cost: PerYearCost) {
        cost.type = CostType.PER_YEAR_COST
        if (checkIfCostNameIsUnique(cost.name, cost.type))
            allCosts.value.push(cost)
    }

    function addPerDepartureCost(cost: PerDepartureCost) {
        cost.type = CostType.PER_DEPARTURE_COST
        if (checkIfCostNameIsUnique(cost.name, cost.type))
            allCosts.value.push(cost)
    }

    function addPlanePart(cost: PlaneParts) {
        cost.type = CostType.PLANE_PART_COST
        if (checkIfCostNameIsUnique(cost.name, cost.type))
            allCosts.value.push(cost)
    }

    function removeCost(cost: Costs) {
        allCosts.value = allCosts.value.filter(el => (el.name != cost.name && el.type === cost.type) || el.type !== cost.type)
    }

    function seedStore() {
        let p: PlaneParts = {
            name: "DummyKostenPunkt",
            description: "Dieser Punkt ist nur ein dummy",
            costValue: 42,
            type: CostType.PLANE_PART_COST,
            tbo: 42,
            maxYears: 42
        }

        for (let i = 0; i < 5; i++) {
            addPerHourCost(createDummyCost(i) as PerHourCost)
            addPerYearCost(createDummyCost(i) as PerYearCost)
            addPerDepartureCost(createDummyCost(i) as PerDepartureCost)
            addPlanePart(p)
        }
    }

    return { plane, planeParts, perHourCosts, perDepartureCosts, perYearCosts, seedStore, removeCost }
})

function createDummyCost(i: Number): Costs {
    let c: Costs = {
        name: "DummyKostenPunkt" + i,
        description: "Dieser Punkt ist nur ein dummy",
        costValue: 42,
        type: CostType.PER_DEPARTURE_COST
    }
    return c
}
