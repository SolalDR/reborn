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
          value: 15,
        },
        {
          name: 'purity',
          value: -15,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: -3000,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 4,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -4,
        },
      ],
    },
  },
};
