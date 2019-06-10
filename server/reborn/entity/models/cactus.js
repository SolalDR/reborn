export default {
  slug: 'cactus',
  category: 'plant',
  color: '#00FF00',
  name: 'Cactus',
  displayName: 'Cactus',
  role: 'nature',
  states: {
    creation: {
      duration: 200,
      enterModifiers: [
        {
          name: 'purity',
          value: 0.25,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 0.24,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 120,
        },
      ],
    },
  },
};
