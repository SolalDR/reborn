export default {
  slug: 'rock',
  category: 'rock',
  color: '#00FF00',
  name: 'Rock',
  displayName: 'Roche',
  role: 'nature',
  states: {
    creation: {
      duration: 750,
      enterModifiers: [
        {
          name: 'purity',
          value: 0.7,
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
          value: 500,
        },
      ],
    },
  },
};
