import numeral from "numeral";

const filtroDolar = function(valor) {
  if (!valor) return "$ 0";
  return numeral(valor).format("$ 0.00a");
};

const filtroPorcentaje = function(valor) {
  if (!valor) return "0%";
  return `${Number(valor).toFixed(2)}%`;
};

export { filtroDolar, filtroPorcentaje };
