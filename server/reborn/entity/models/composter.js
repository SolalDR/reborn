export default {
  slug: 'composter',
  category: 'recycling',
  color: '#00FF00',
  name: 'Composter',
  displayName: 'Composteur',
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -500,
          checkConstraint: true,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -100,
          checkConstraint: true,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: -1.5,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: 1.5,
        },
      ],
    },
  },
};
