export default {
  slug: 'uranium_deposit',
  category: 'rock',
  color: '#00FF00',
  name: 'Uranium Deposit',
  displayName: "Gisement d'uranium",
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
          value: 2.8,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 3000,
        },
      ],
    },
  },
};
