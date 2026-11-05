const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function formatarData(dataStr, index) {
  if (index === 0) return 'Hoje';

  const data = new Date(`${dataStr}T00:00:00`);

  const diaSemana = diasSemana[data.getDay()];
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');

  return `${diaSemana}, ${dia}/${mes}`;
}