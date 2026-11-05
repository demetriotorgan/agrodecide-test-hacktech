import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudLightning
} from 'lucide-react';

export function obterIconeClima(dia) {

  const {
    codigoClima,
    chuva = 0,
    chanceChuva = 0
  } = dia;

  // ===== PRIORIDADE 1: CHUVA =====

  if (chuva >= 5) {

    if (
      [95, 96, 99].includes(codigoClima)
    ) {
      return CloudLightning;
    }

    return CloudRain;
  }

  if (chuva >= 1) {
    return CloudRain;
  }

  // ===== PRIORIDADE 2: CHANCE DE CHUVA =====

  if (
    chuva < 1 &&
    chanceChuva >= 70
  ) {
    return CloudRain;
  }

  if (
    chuva < 1 &&
    chanceChuva >= 40
  ) {
    return Cloud;
  }

  // ===== PRIORIDADE 3: WEATHER CODE =====

  if (codigoClima === 0) {
    return Sun;
  }

  if ([1, 2].includes(codigoClima)) {
    return CloudSun;
  }

  if (codigoClima === 3) {
    return Cloud;
  }

  if ([45, 48].includes(codigoClima)) {
    return CloudFog;
  }

  if ([71, 73, 75].includes(codigoClima)) {
    return CloudSnow;
  }

  return Cloud;
}