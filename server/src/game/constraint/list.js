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
  }
];
