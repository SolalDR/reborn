export default {
  slug: 'recycling_factory',
  category: 'recycling',
  color: '#00FF00',
  name: 'Recycling Factory',
  displayName: 'Centre de recyclage',
  role: 'city',
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
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: -10,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: 10,
        },
      ],
    },
  },
};
