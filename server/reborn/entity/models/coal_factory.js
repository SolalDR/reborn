export default {
  slug: 'coal_factory',
  category: 'energy',
  name: 'Coal Factory',
  displayName: 'Usine à charbon',
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
          value: -8,
        },
      ],
    },

    mounted: {
      recurModifiers: [
        {
          name: 'energy',
          value: 8,
        },
        {
          name: 'purity',
          value: -9,
        },
      ],
    },

    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -2000,
          checkConstraint: true,
        },
      ],
    },

    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 1.5,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -1.5,
        },
      ],
    },
  },
};
