export default {
  slug: 'garden',
  category: 'recycling',
  color: '#00FF00',
  name: 'Garden',
  displayName: 'Jardin',
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
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 0.5,
        },
      ],
    },
  },
};
