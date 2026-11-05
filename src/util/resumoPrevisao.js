export function chuvaAcumulada(previsaoDias = []) {
  return previsaoDias.reduce(
    (total, dia) => total + dia.chuva,
    0
  );
}

export function diasComChuva(previsaoDias = []) {
  return previsaoDias.filter(
    dia => dia.chuva > 0
  ).length;
}

export function diasSecos(previsaoDias = []) {
  return previsaoDias.filter(
    dia => dia.chuva === 0
  ).length;
}

export function mediaChanceChuva(previsaoDias = []) {

  if (previsaoDias.length === 0) {
    return 0;
  }

  const soma = previsaoDias.reduce(
    (total, dia) => total + dia.chanceChuva,
    0
  );

  return Math.round(
    soma / previsaoDias.length
  );
}