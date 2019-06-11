export default {
  slug: 'garden',
  category: 'recycling',
  color: '#00FF00',
  name: 'Garden',
  displayName: 'Jardin',
  role: 'city',
  size: [1, 1],
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -500,
          checkConstraint: true,
        },
        {
          name: 'satisfaction',
          value: 5,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 1.5,
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
      leaveModifiers: [
        {
          name: 'satisfaction',
          value: -2.5,
        },
      ],
    },
  },
};
