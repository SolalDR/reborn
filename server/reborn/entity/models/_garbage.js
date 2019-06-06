export default {
  slug: 'garbage',
  category: null,
  role: null,
  name: 'Garbage',
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
