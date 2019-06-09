export default {
  slug: 'farm',
  category: 'alimentation',
  name: 'Farm',
  displayName: 'Ferme',
  role: 'city',
  size: [2, 2],
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -6000,
          checkConstraint: true,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'food',
          value: 10,
        },
        {
          name: 'purity',
          value: -1,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -2000,
          checkConstraint: true,
        },
      ],
    },
  },
};
