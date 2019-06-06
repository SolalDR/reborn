export default {
  slug: 'composter',
  category: 'recycling',
  color: '#00FF00',
  name: 'Composter',
  displayName: 'Composteur',
  role: 'city',
  states: {
    creation: {
      duration: 200,
      enterModifiers: [
        {
          name: 'waste',
          value: -0.5,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'waste',
          value: 0.5,
        },
      ],
    },
  },
};
