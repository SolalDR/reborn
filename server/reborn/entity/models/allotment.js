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
      enterModifiers: [
        {
          name: 'money',
          value: -100,
          checkConstraint: true,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 1,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -1,
        },
      ],
    },
  },
};
