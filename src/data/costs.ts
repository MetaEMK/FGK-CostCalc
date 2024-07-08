export interface Costs {
    name: string,
    type: CostType,
    description?: string,
    costValue: Number,
}

export interface PlaneParts extends Costs {
    type: CostType.PLANE_PART_COST
    tbo: Number
    maxYears: Number
}

export interface PerYearCost extends Costs {
    type: CostType.PER_YEAR_COST
}

export interface PerHourCost extends Costs {
    type: CostType.PER_HOUR_COST
}

export interface PerDepartureCost extends Costs {
    type: CostType.PER_DEPARTURE_COST
}

export enum CostType {
    PER_YEAR_COST = "per_year_cost",
    PER_HOUR_COST = "per_hour_cost",
    PLANE_PART_COST = "plane_part_cost",
    PER_DEPARTURE_COST = "per_departure_cost"
}