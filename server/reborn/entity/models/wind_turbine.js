export default {
  slug: 'wind_turbine',
  category: 'energy',
  name: 'Éolienne',
  role: 'city',
  displayName: 'Éolienne',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -2500,
          checkConstraint: true,
        },
        {
          name: 'purity',
          value: -3,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'energy',
          value: 2.4,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -500,
          checkConstraint: true,
        },
      ],
    },
  },
};
