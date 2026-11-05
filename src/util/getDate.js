export function getCurrentDate() {

    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes = String(hoje.getMonth() + 1).padStart(2, "0");

    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

};

export function getDateDaysAgo(days) {

    const data = new Date();

    data.setDate(data.getDate() - days);

    const ano = data.getFullYear();

    const mes = String(data.getMonth() + 1).padStart(2, "0");

    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

};

export function getCurrentYear() {
    return new Date().getFullYear();
};

export function getCurrentMonth() {
    return new Date().getMonth();
};

export function getAvailableYears(quantity = 5) {
    const currentYear = new Date().getFullYear();

    return Array.from({ length: quantity }, (_, index) => currentYear - index);
};

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

export function getAvailableMonths(year) {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (year === currentYear) {
        return MONTHS.slice(0, currentMonth -1);
    }

    return MONTHS;
};

export function createHistoricalPeriod(periodo) {

    const { year, monthA, monthB } = periodo;

    const periodoA = {
        start_date: formatDate(new Date(year, monthA - 1, 1)),
        end_date: formatDate(new Date(year, monthA, 0))
    };

    const periodoB = {
        start_date: formatDate(new Date(year, monthB - 1, 1)),
        end_date: formatDate(new Date(year, monthB, 0))
    };

    return {
        periodoA,
        periodoB
    };
}

function formatDate(date) {
    return date.toISOString().split("T")[0];
}