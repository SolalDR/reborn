export default {
  slug: 'playground',
  category: 'satisfaction',
  name: 'Playground',
  displayName: 'Aire de jeu',
  role: 'city',
  size: [1, 1],
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -1200,
          checkConstraint: true,
        },
        {
          name: 'satisfaction',
          value: 5,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -240,
          checkConstraint: true,
        },
      ],
      leaveModifiers: [
        {
          name: 'satisfaction',
          value: -2.5,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 0.25,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -0.25,
        },
      ],
    },
  },
};
