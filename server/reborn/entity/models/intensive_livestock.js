export default {
  slug: 'intensive_livestock',
  category: 'alimentation',
  name: 'Élevage intensif',
  displayName: 'Élevage intensif',
  role: 'city',
  size: [3, 2],
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
          value: 8,
        },
        {
          name: 'purity',
          value: -6,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -1200,
          checkConstraint: true,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 1.5,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -1.5,
        },
      ],
    },
  },
};
