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

    function addPerHourCost(cost: PerHourCost) {
        cost.type = CostType.PER_HOUR_COST
        allCosts.value.push(cost)
    }

    function addPerYearCost(cost: PerYearCost) {
        cost.type = CostType.PER_YEAR_COST
        allCosts.value.push(cost)
    }

    function addPerDepartureCost(cost: PerDepartureCost) {
        cost.type = CostType.PER_DEPARTURE_COST
        allCosts.value.push(cost)
    }

    function addPlanePart(cost: PlaneParts) {
        cost.type = CostType.PLANE_PART_COST
        allCosts.value.push(cost)
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
            addPerHourCost(createDummyCost() as PerHourCost)
            addPerYearCost(createDummyCost() as PerYearCost)
            addPerDepartureCost(createDummyCost() as PerDepartureCost)
            addPlanePart(p)
        }
    }

    return { plane, planeParts, perHourCosts, perDepartureCosts, perYearCosts, seedStore }
})

function createDummyCost(): Costs {
    let c: Costs = {
        name: "DummyKostenPunkt",
        description: "Dieser Punkt ist nur ein dummy",
        costValue: 42,
        type: CostType.PER_DEPARTURE_COST
    }
    return c
}