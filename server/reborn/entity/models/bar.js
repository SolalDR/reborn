export default {
  slug: 'bar',
  category: 'satisfaction',
  name: 'Bar',
  displayName: 'Bar',
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
          value: 6,
        },
      ],
    },

    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -300,
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
