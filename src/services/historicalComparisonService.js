import { getHistorical } from "./historicalService";

export async function compareHistoricalPeriods({ latitude, longitude, comparisonPeriods }) {
    const { periodoA, periodoB } = comparisonPeriods;
    const [historicoA, historicoB] = await Promise.all([
        getHistorical({
            latitude,
            longitude,
            ...periodoA
        }),
        getHistorical({
            latitude,
            longitude,
            ...periodoB
        })
    ]);
    return {
        historicoA,
        historicoB
    }
}