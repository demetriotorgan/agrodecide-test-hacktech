export function calcularUmidadeMediaSemanal(hourly){
    const umidades = hourly.relative_humidity_2m;

    if(!umidades || umidades.length === 0){
        return 0;
    }

    const soma = umidades.reduce((acc, umidade)=> acc + umidade,0);
    return Number((soma/umidades.length).toFixed(1));
}
