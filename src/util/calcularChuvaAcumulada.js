export function calcularChuvaAcumulada(precipitationSum = []) {
  return precipitationSum.reduce(
    (total, valor) => total + valor,
    0
  );
}