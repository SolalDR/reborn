export default {
  slug: 'organic_farm',
  category: 'alimentation',
  name: 'Organic Farm',
  displayName: 'Ferme biologique',
  role: 'city',
  size: [3, 2],
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -3500,
          checkConstraint: true,
        },
        {
          name: 'satisfaction',
          value: 1.8,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'food',
          value: 2.5,
        },
        {
          name: 'purity',
          value: -1.5,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -700,
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
