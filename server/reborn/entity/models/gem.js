export default {
  slug: 'gem',
  category: 'rock',
  color: '#00FF00',
  name: 'Gem',
  displayName: 'Gemme',
  role: 'nature',
  states: {
    creation: {
      duration: 1500,
      enterModifiers: [
        {
          name: 'purity',
          value: 0.9,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 2.4,
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
