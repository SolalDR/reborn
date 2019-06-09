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
          value: -250,
          checkConstraint: true,
        },
      ],
    },

    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: -20,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: 20,
        },
      ],
    },
  },
};
