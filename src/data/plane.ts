export interface Plane {
    registration: string,
    model: string,

    /**
     * expected flight hours per year
     */
    expectedFlightTime: number,
}