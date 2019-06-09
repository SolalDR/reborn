export default {
  slug: 'playground',
  category: 'satisfaction',
  name: 'Playground',
  displayName: 'Aire de jeu',
  role: 'city',
  size: [2, 2],
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -1500,
          checkConstraint: true,
        },
        {
          name: 'satisfaction',
          value: 15,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -50,
          checkConstraint: true,
        },
      ],
    },
  },
};
