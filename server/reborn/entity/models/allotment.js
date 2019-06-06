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
          value: -500,
          checkConstraint: true,
        },
        {
          name: 'satisfaction',
          value: 10,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: -0.5,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: -100,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 0.01,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -0.01,
        },
      ],
    },
  },
};
