export default {
  slug: 'coal_factory',
  category: 'energy',
  name: 'Coal Factory',
  displayName: 'Usine à charbon',
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -10000,
          checkConstraint: true,
        },
        {
          name: 'purity',
          value: -10,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'energy',
          value: 10,
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
          value: 2,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -2,
        },
      ],
    },
  },
};
