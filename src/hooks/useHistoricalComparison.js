import { useEffect, useMemo, useState } from "react";
import { createHistoricalPeriod, getAvailableMonths, getAvailableYears, getCurrentMonth, getCurrentYear } from "../util/getDate";
import { compareHistoricalPeriods } from "../services/historicalComparisonService";
import { mapperHistoricalResults } from "../util/mapperHistoricalResults";

export function useHistoricalComparison() {
    const [periodo, setPeriodo] = useState({
        year: getCurrentYear(),
        monthA: getCurrentMonth(),
        monthB: getCurrentMonth()
    });
    const [historicoComparado, setHistoricoComparado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const anos = useMemo(
        () => getAvailableYears(),
        []
    );

    const meses = useMemo(
        () => getAvailableMonths(periodo.year),
        [periodo.year]
    );

    const mesesComparacao = useMemo(
        () => meses.filter(
            mes => mes.value !== periodo.monthA
        ),
        [meses, periodo.monthA]
    );

    useEffect(() => {

        if (periodo.monthA === periodo.monthB) {

            const primeiroDisponivel = meses.find(
                mes => mes.value !== periodo.monthA
            );

            if (primeiroDisponivel) {
                setPeriodo(prev => ({
                    ...prev,
                    monthB: primeiroDisponivel.value
                }));
            }
        }

    }, [periodo.monthA, meses]);

    const comparisonPeriods = useMemo(
        () => createHistoricalPeriod(periodo),
        [periodo]
    );

    async function compareHistorico({ latitude, longitude }) {
        try {
            setLoading(true);
            const result = await compareHistoricalPeriods({ latitude, longitude, comparisonPeriods });
            const historico = mapperHistoricalResults(result);
            setHistoricoComparado(historico);
            return historico;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        periodo,
        setPeriodo,
        anos,
        meses,
        mesesComparacao,
        comparisonPeriods,

        historicoComparado,
        loading,
        error,
        compareHistorico
    };
}