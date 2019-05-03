[
  {
    slug: "notification-1",
    test: (game) => game.metrics.get('money').value < 4000
  },
  {
    slug: "notification-1",
    test: (game) =>
      game.metrics.get('biodiversity').value < 20
      && game.metrics.get('purity').value < 20
  }
]
