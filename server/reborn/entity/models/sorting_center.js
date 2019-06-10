export default {
  slug: 'sorting_center',
  category: 'recycling',
  color: '#00FF00',
  name: 'Sorting Center',
  displayName: 'Centre de tri',
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -5000,
          checkConstraint: true,
        },
      ],
    },

    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -1000,
          checkConstraint: true,
        },
      ],
    },

    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: -7.5,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: 7.5,
        },
      ],
    },
  },
};
