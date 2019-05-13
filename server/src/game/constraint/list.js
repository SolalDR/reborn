export default [
  {
    slug: "money-low",
    test: (game) => game.metrics.get('money').value < 5000
  },
  {
    slug: "environment-low",
    test: (game) =>
      game.metrics.get('biodiversity').value < 20
      && game.metrics.get('purity').value < 20
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
];
