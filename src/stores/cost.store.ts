import { CostType, Costs, PlaneParts } from "@/data/costs";
import { Plane } from "@/data/plane";
import { defineStore } from "pinia";

export const useCostStore = defineStore("cost", () => {
    const plane = ref<Plane>({
        model: "",
        registration: "",
        expectedFlightTime: 1
    })
    const allCosts = ref<Costs[]>([])

    let idIndex = 1

    const planeParts = computed(() => allCosts.value.filter(e => e.type === CostType.PLANE_PART_COST) as PlaneParts[])
    const perHourCosts = computed(() => allCosts.value.filter(e => e.type === CostType.PER_HOUR_COST))
    const perYearCosts = computed(() => allCosts.value.filter(e => e.type === CostType.PER_YEAR_COST))

    const calcPerYearCosts = computed(() => {
        let costs: number = 0

        perYearCosts.value.forEach(c => {
            costs += c.costValue
        })
        
        if (plane.value) {
            return costs/plane.value.expectedFlightTime
        }
    })

    const calcPerHourCosts = computed(() => {
        let costs: number = 0

        perHourCosts.value.forEach(c => {
            costs += c.costValue
        })

        return costs
    })

    const calcPlanePartCosts = computed(() => {
        let costs: number = 0

        if (plane.value) {
            planeParts.value.forEach(c => {
                const p = c as PlaneParts
                const usedHour = plane.value!.expectedFlightTime * p.maxYears

                if (usedHour > p.tbo) {
                    costs = costs + (p.costValue/p.tbo)
                } else {
                    costs = costs + (p.costValue/(plane.value!.expectedFlightTime * p.maxYears))
                }
            })

            return costs
        }
    })

    function createCost(cost: Costs) {
        cost.id = idIndex
        idIndex++

        console.log(cost)

        allCosts.value.push(cost)
    }

    function updateCost(id: number, cost: Costs) {
        let oldCostRef = getCostById(id)
        if (oldCostRef) {
            oldCostRef.id = id
            Object.assign(oldCostRef, cost)
        }
    }

    function removeCost(cost: Costs) {
        allCosts.value = allCosts.value.filter(el => el.id != cost.id)
    }

    function getCostById(id: number): Costs|undefined {
        return allCosts.value.find(el => el.id == id)
    }

    return {
        createCost,
        updateCost,
        removeCost,
        getCostById,
        allCosts,
        plane,
        planeParts,
        perHourCosts,
        perYearCosts,
        calcPerHourCosts,
        calcPerYearCosts,
        calcPlanePartCosts,
    }
})