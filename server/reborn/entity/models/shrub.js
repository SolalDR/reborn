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
          value: 1,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 0.3,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 75,
        },
      ],
    },
  },
};
