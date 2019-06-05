export default [
  {
    slug: "money-low",
    test: (game) => game.metrics.get('money').value < 5000
  },
  {
    slug: "purity-low",
    test: (game) =>
      game.metrics.get('purity').value < 20
  },
  {
    slug: "end-game",
    test: (game) =>
      game.metrics.get('biodiversity').value === game.metrics.get('biodiversity').min
      || game.metrics.get('energy').value === game.metrics.get('energy').min
      || game.metrics.get('food').value === game.metrics.get('food').min
      || game.metrics.get('purity').value === game.metrics.get('purity').min
      || game.metrics.get('population').value === game.metrics.get('population').min
      || game.metrics.get('satisfaction').value === game.metrics.get('satisfaction').min
  },
  {
    slug: "satisfaction-low",
    test: (game) =>
      game.metrics.get('satisfaction').value < 25
  },
  {
    slug: "energy-low",
    test: (game) =>
      game.metrics.get('energy').value < 25
  },
  {
    slug: "rythm-fast",
    test: (game) =>
      game.metrics.get('satisfaction').value < 10
      || game.metrics.get('purity').value < 10
      || game.metrics.get('biodiversity').value < 10
      || game.metrics.get('food').value < 10
      || game.metrics.get('energy').value < 10
  },
  {
    slug: "rythm-medium",
    test: (game) =>
      game.metrics.get('satisfaction').value < 25
      || game.metrics.get('purity').value < 25
      || game.metrics.get('biodiversity').value < 25
      || game.metrics.get('food').value < 25
      || game.metrics.get('energy').value < 25
  }
];
