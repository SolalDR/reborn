export default {
  slug: 'tree',
  category: 'tree',
  color: '#00FF00',
  name: 'Tree',
  displayName: 'Arbre',
  role: 'nature',
  states: {
    creation: {
      duration: 1000,
      enterModifiers: [
        {
          name: 'purity',
          value: 1,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 1,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 1000,
        },
      ],
    },
  },
};
