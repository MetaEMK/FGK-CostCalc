export interface Costs {
    id?: number,
    name: string,
    type: CostType,
    description?: string,
    costValue: number,
}

export interface PlaneParts extends Costs {
    type: CostType.PLANE_PART_COST
    tbo: number
    maxYears: number
}

export interface PerYearCost extends Costs {
    type: CostType.PER_YEAR_COST
}

export interface PerHourCost extends Costs {
    type: CostType.PER_HOUR_COST
}

export enum CostType {
    PER_YEAR_COST = "per_year_cost",
    PER_HOUR_COST = "per_hour_cost",
    PLANE_PART_COST = "plane_part_cost",
}