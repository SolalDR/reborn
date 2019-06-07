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
          value: 1,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 0.75,
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
