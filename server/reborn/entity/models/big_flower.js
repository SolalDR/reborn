export default {
  slug: 'big_flower',
  category: 'plant',
  color: '#00FF00',
  name: 'Big Flower',
  displayName: 'Grande Fleur',
  role: 'nature',
  states: {
    creation: {
      duration: 500,
      enterModifiers: [
        {
          name: 'purity',
          value: 0.5,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 0.4,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 150,
        },
      ],
    },
  },
};
