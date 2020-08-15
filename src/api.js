const url = "https://api.coincap.io/v2";

function obtenerActivos() {
  return fetch(`${url}/assets?limit=`)
    .then(respuesta => respuesta.json())
    .then(resultado => resultado.data);
}

function obtenerActivo(idMoneda) {
  return fetch(`${url}/assets/${idMoneda}`)
    .then(respuesta => respuesta.json())
    .then(resultado => resultado.data);
}

function obtenerHistorialDeActivo(idMoneda) {
  const ahora = new Date();
  const final = ahora.getTime();
  ahora.setDate(ahora.getDate() - 1);
  const inicio = ahora.getTime();
  return fetch(
    `${url}/assets/${idMoneda}/history?interval=h1&start=${inicio}&end=${final}`
  )
    .then(respuesta => respuesta.json())
    .then(resultado => resultado.data);
}

function obtenerMercados(idMoneda) {
  return fetch(`${url}/assets/${idMoneda}/markets?limit=10`)
    .then(respuesta => respuesta.json())
    .then(resultado => resultado.data);
}

function obtenerCambio(idMoneda) {
  return fetch(`${url}/exchanges/${idMoneda}`)
    .then(respuesta => respuesta.json())
    .then(resultado => resultado.data);
}

export default {
  obtenerActivos,
  obtenerActivo,
  obtenerHistorialDeActivo,
  obtenerMercados,
  obtenerCambio
};
