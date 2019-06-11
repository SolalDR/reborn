const minGaugeValue = 40;

export default [
  {
    slug: 'purity-low',
    test: game => game.metrics.get('purity').value < minGaugeValue,
  },
  {
    slug: 'biodiversity-low',
    test: game => game.metrics.get('biodiversity').value < minGaugeValue,
  },
  {
    slug: 'food-low',
    test: game => game.metrics.get('food').value < minGaugeValue,
  },
  {
    slug: 'energy-low',
    test: game => game.metrics.get('energy').value < minGaugeValue,
  },
  {
    slug: 'satisfaction-low',
    test: game => game.metrics.get('satisfaction').value < minGaugeValue,
  },
  {
    slug: 'end-game',
    test: game => game.metrics.get('biodiversity').value === game.metrics.get('biodiversity').min
      || game.metrics.get('energy').value === game.metrics.get('energy').min
      || game.metrics.get('food').value === game.metrics.get('food').min
      || game.metrics.get('purity').value === game.metrics.get('purity').min
      || game.metrics.get('satisfaction').value === game.metrics.get('satisfaction').min,
  },
  {
    slug: 'rythm-fast',
    test: game => game.metrics.get('satisfaction').value < 10
      || game.metrics.get('purity').value < 10
      || game.metrics.get('biodiversity').value < 10
      || game.metrics.get('food').value < 10
      || game.metrics.get('energy').value < 10,
  },
  {
    slug: 'rythm-medium',
    value: false,
    test: game => game.metrics.get('satisfaction').value < 35
      || game.metrics.get('purity').value < 35
      || game.metrics.get('biodiversity').value < 35
      || game.metrics.get('food').value < 35
      || game.metrics.get('energy').value < 35,
  },
];
