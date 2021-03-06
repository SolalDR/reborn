export default {
  slug: 'allotment',
  category: 'satisfaction',
  color: '#FF0000',
  name: 'Allotment',
  displayName: 'Lotissement',
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'purity',
          value: -0.5,
        },
        {
          name: 'money',
          value: -1500,
          checkConstraint: true,
        },
        {
          name: 'satisfaction',
          value: 6,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: -2,
        },
        {
          name: 'energy',
          value: -0.8,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -300,
          checkConstraint: true,
        },
      ],
      leaveModifiers: [
        {
          name: 'satisfaction',
          value: -3,
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
