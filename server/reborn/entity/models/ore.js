export default {
  slug: 'ore',
  category: 'rock',
  color: '#00FF00',
  name: 'Ore',
  displayName: "Minerai d'or",
  role: 'nature',
  states: {
    creation: {
      duration: 1500,
      enterModifiers: [
        {
          name: 'purity',
          value: 0.75,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 2.2,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 1500,
        },
      ],
    },
  },
};
