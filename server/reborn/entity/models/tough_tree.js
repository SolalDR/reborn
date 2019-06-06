export default {
  slug: 'tough_tree',
  category: 'tree',
  color: '#00FF00',
  name: 'Tough Tree',
  displayName: 'Arbre solide',
  role: 'nature',
  states: {
    creation: {
      duration: 2000,
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
          value: 2,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 2000,
        },
      ],
    },
  },
};
