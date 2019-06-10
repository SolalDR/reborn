export default {
  slug: 'solar_panel',
  category: 'energy',
  name: 'Solar Panel',
  displayName: 'Panneau solaire',
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -2000,
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
          value: 2,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -400,
          checkConstraint: true,
        },
      ],
    },
  },
};
