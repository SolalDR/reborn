export default {
  slug: 'house',
  category: 'satisfaction',
  color: '#FF0000',
  name: 'House',
  displayName: 'Logement',
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'purity',
          value: -0.3,
        },
        {
          name: 'money',
          value: -500,
          checkConstraint: true,
        },
        {
          name: 'satisfaction',
          value: 4,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: -0.5,
        },
        {
          name: 'energy',
          value: -0.8,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -100,
          checkConstraint: true,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 0.5,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -0.5,
        },
      ],
    },
  },
};
