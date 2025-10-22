const Z = [...Array(118).keys()].map(i => i + 1);
const massas = [
  1.008, 4.003, 6.94, 9.012, 10.81, 12.01, 14.01, 16.00, 19.00, 20.18,
  22.99, 24.31, 26.98, 28.09, 30.97, 32.07, 35.45, 39.95, 39.10, 40.08,
  44.96, 47.87, 50.94, 52.00, 54.94, 55.85, 58.93, 58.69, 63.55, 65.38,
  69.72, 72.63, 74.92, 78.97, 79.90, 83.80, 85.47, 87.62, 88.91, 91.22,
  92.91, 95.95, 98, 101.07, 102.91, 106.42, 107.87, 112.41, 114.82, 118.71,
  121.76, 127.60, 126.90, 131.29, 132.91, 137.33, 138.91, 140.12, 140.91, 144.24,
  145, 150.36, 151.96, 157.25, 158.93, 162.50, 164.93, 167.26, 168.93, 173.05,
  174.97, 178.49, 180.95, 183.84, 186.21, 190.23, 192.22, 195.08, 196.97, 200.59,
  204.38, 207.2, 208.98, 209, 210, 222, 223, 226, 227, 232.04,
  231.04, 238.03, 237, 244, 243, 247, 247, 251, 252, 257,
  258, 259, 260, 261, 262, 266, 264, 269, 270, 271,
  270, 276, 281, 281, 285, 285, 286, 289, 289, 293,
  294
];

const theta = Z.map(z => z * 0.05);
const r = Z.map(z => Math.log(z) * 3.5);
const x = theta.map((t, i) => r[i] * Math.cos(t));
const y = theta.map((t, i) => r[i] * Math.sin(t));
const cores = Z.map(z => '#FFD700');
const tamanhos = Z.map(z => 4 + (z / 118) * 8);

const trace = {
  x: x,
  y: y,
  mode: 'markers',
  marker: {
    size: tamanhos,
    color: cores,
    opacity: 0.9
  },
  text: Z.map((z, i) => `Z=${z}, Massa=${massas[i]}`),
  hoverinfo: 'text'
};

const oganesson = {
  x: [x[117]],
  y: [y[117]],
  mode: 'markers',
  marker: {
    size: 20,
    color: '#FFD700',
    line: { color: '#FF9800', width: 2 },
    symbol: 'star'
  },
  name: 'Oganessôn'
};

const layout = {
  title: 'Mapa Cósmico dos Elementos',
  paper_bgcolor: 'black',
  plot_bgcolor: 'black',
  xaxis: { visible: false },
  yaxis: { visible: false },
  showlegend: false,
  width: 800,
  height: 800
};

Plotly.newPlot('grafico', [trace, oganesson], layout);