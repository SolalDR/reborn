export default {
  slug: 'nuclear_power_station',
  category: 'energy',
  name: 'Nuclear power station',
  displayName: 'Central nucléaire',
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -12000,
          checkConstraint: true,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'energy',
          value: 12,
        },
        {
          name: 'purity',
          value: -3,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -2400,
          checkConstraint: true,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 10,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -10,
        },
      ],
    },
  },
};
