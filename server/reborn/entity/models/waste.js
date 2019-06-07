export default {
  slug: 'waste',
  category: null,
  role: null,
  name: 'Waste',
  displayName: 'Déchets',
  states: {
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: -1,
        },
      ],
    },
  },
};
