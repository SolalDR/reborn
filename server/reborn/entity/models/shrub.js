export default {
  slug: 'shrub',
  category: 'tree',
  color: '#00FF00',
  name: 'Shrub',
  displayName: 'Arbuste',
  role: 'nature',
  states: {
    creation: {
      duration: 200,
      enterModifiers: [
        {
          name: 'purity',
          value: 0.3,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 0.28,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 175,
        },
      ],
    },
  },
};
