export function mapperHistoricalResults(result) {
    const MONTHS = [
        { value: 1, label: "Janeiro" },
        { value: 2, label: "Fevereiro" },
        { value: 3, label: "Março" },
        { value: 4, label: "Abril" },
        { value: 5, label: "Maio" },
        { value: 6, label: "Junho" },
        { value: 7, label: "Julho" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Setembro" },
        { value: 10, label: "Outubro" },
        { value: 11, label: "Novembro" },
        { value: 12, label: "Dezembro" },
    ];
     const mesResultA = Number(
        result.historicoA.historico.periodo.inicio.substring(5, 7)
    );

    const mesResultB = Number(
        result.historicoB.historico.periodo.inicio.substring(5, 7)
    );

    const chuvaAcumuladaPeriodoA = result.historicoA.historico.resumo.chuvaAcumulada;
    const diasComChuvaPeriodoA = result.historicoA.historico.resumo.diasComChuva;
    const diasSecosPeriodoA = result.historicoA.historico.resumo.diasSecos;
    const etoMedioPeriodoA = result.historicoA.historico.resumo.etoMedio;
    const maioChuvaPeriodoA = result.historicoA.historico.resumo.maiorChuva;
    const tempeMediaPeriodoA = result.historicoA.historico.resumo.temperaturaMedia

    const chuvaAcumuladaPeriodoB = result.historicoB.historico.resumo.chuvaAcumulada;
    const diasComChuvaPeriodoB = result.historicoB.historico.resumo.diasComChuva;
    const diasSecosPeriodoB = result.historicoB.historico.resumo.diasSecos;
    const etoMedioPeriodoB = result.historicoB.historico.resumo.etoMedio;
    const maioChuvaPeriodoB = result.historicoB.historico.resumo.temperaturaMedia;
     const tempeMediaPeriodoB = result.historicoB.historico.resumo.temperaturaMedia


    return {
        periodoA:{
            mesA:MONTHS.find(mes => mes.value === mesResultA),
            chuvaAcumuladaPeriodoA,
            diasComChuvaPeriodoA,
            diasSecosPeriodoA,
            etoMedioPeriodoA,
            maioChuvaPeriodoA,
            tempeMediaPeriodoA
        },
        periodoB:{
            mesB: MONTHS.find(mes => mes.value === mesResultB),
            chuvaAcumuladaPeriodoB,
            diasComChuvaPeriodoB,
            diasSecosPeriodoB,
            etoMedioPeriodoB,
            maioChuvaPeriodoB,
            tempeMediaPeriodoB
        }
    };
}