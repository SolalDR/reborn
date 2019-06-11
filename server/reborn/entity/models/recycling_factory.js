export default {
  slug: 'recycling_factory',
  category: 'recycling',
  color: '#00FF00',
  name: 'Recycling Factory',
  displayName: 'Centre de recyclage',
  role: 'city',
  size: [2, 2],
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -3000,
          checkConstraint: true,
        },
      ],
    },

    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -600,
          checkConstraint: true,
        },
      ],
    },

    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: -5,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: 5,
        },
      ],
    },
  },
};
