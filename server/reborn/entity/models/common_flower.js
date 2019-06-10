export default {
  slug: 'common_flower',
  category: 'plant',
  color: '#00FF00',
  name: 'Common Flower',
  displayName: 'Fleur',
  role: 'nature',
  states: {
    creation: {
      duration: 200,
      enterModifiers: [
        {
          name: 'purity',
          value: 0.1,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 0.8,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 50,
        },
      ],
    },
  },
};
